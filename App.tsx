import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { CropSelector } from './components/CropSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { Spinner } from './components/Spinner';
import { CROP_OPTIONS } from './constants';
import { diagnoseCrop } from './services/diagnosisService';
import type { DiagnosisResult, Crop } from './types';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [cropType, setCropType] = useState<Crop>(CROP_OPTIONS[0].value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hectares, setHectares] = useState<string>('');
  const [totalCompensation, setTotalCompensation] = useState<number | null>(null);
  const [showHeatmap, setShowHeatmap] = useState<boolean>(false);

  const resetCalculation = () => {
    setHectares('');
    setTotalCompensation(null);
    setShowHeatmap(false);
  };

  const handleImageChange = useCallback((file: File | null) => {
    setImageFile(file);
    setResult(null);
    setError(null);
    resetCalculation();
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, []);

  const handleDiagnose = useCallback(async () => {
    if (!imageFile) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    resetCalculation();

    try {
      const diagnosis = await diagnoseCrop(imageFile, cropType);
      setResult(diagnosis);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during diagnosis.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, cropType]);

  const handleCropChange = useCallback((crop: Crop) => {
    setCropType(crop);
    setResult(null);
    resetCalculation();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-brand-green">Crop Health Inspector</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-6">
              <ImageUploader onImageChange={handleImageChange} imagePreview={imagePreview} showHeatmap={showHeatmap} heatmapCenter={result?.heatmapCenter} />
              <CropSelector selectedCrop={cropType} onCropChange={handleCropChange} />
              <button
                onClick={handleDiagnose}
                disabled={!imageFile || isLoading}
                className="w-full flex items-center justify-center bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed text-lg"
              >
                {isLoading ? (
                  <>
                    <Spinner />
                    Analyzing...
                  </>
                ) : (
                  'Diagnose Crop'
                )}
              </button>
            </div>
            <div className="flex flex-col justify-center items-center p-4 bg-gray-900 rounded-lg min-h-[300px]">
              {isLoading && (
                <div className="w-full animate-pulse">
                  <div className="h-8 bg-gray-700 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-6"></div>
                  <div className="h-20 bg-gray-700 rounded w-full"></div>
                </div>
              )}
              {error && <div className="text-red-400 text-center">{error}</div>}
              {result && (
                <ResultDisplay
                  result={result}
                  hectares={hectares}
                  onHectareChange={setHectares}
                  totalCompensation={totalCompensation}
                  onCalculateTotal={() => {
                    const area = parseFloat(hectares);
                    if (!isNaN(area) && area > 0) {
                      setTotalCompensation(result.compensation * area);
                    }
                  }}
                  showHeatmap={showHeatmap}
                  onToggleHeatmap={() => setShowHeatmap(prev => !prev)}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by Custom ML & Advanced AI</p>
      </footer>
    </div>
  );
};

export default App;