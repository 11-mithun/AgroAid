
import React, { useCallback, useRef } from 'react';

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
  imagePreview: string | null;
  showHeatmap?: boolean;
  heatmapCenter?: { x: number; y: number };
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, imagePreview, showHeatmap, heatmapCenter }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onImageChange(file);
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0] || null;
    onImageChange(file);
  }, [onImageChange]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    onImageChange(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full h-64 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center text-gray-400 relative bg-gray-900"
      >
        <div 
            className="w-full h-full absolute top-0 left-0 cursor-pointer hover:border-brand-green transition-colors border-2 border-transparent rounded-lg"
            onClick={openFileDialog}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
        </div>
        {imagePreview ? (
            <div className="relative w-full h-full">
                <img src={imagePreview} alt="Crop preview" className="object-cover h-full w-full rounded-lg" />
                {showHeatmap && heatmapCenter && (
                    <div 
                        className="absolute inset-0 w-full h-full rounded-lg mix-blend-screen pointer-events-none"
                        style={{
                            background: `radial-gradient(circle at ${heatmapCenter.x}% ${heatmapCenter.y}%, rgba(255, 0, 0, 0.6) 0%, rgba(255, 150, 0, 0.4) 40%, rgba(0,0,0,0) 70%)`
                        }}
                    ></div>
                )}
            </div>
        ) : (
          <div className="text-center pointer-events-none">
            <p>Drag & drop an image here</p>
            <p className="text-sm">or click to select a file</p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
      </div>
      {imagePreview && (
        <button onClick={clearImage} className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Remove Image
        </button>
      )}
    </div>
  );
};