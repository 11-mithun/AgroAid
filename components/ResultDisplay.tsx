import React from 'react';
import type { DiagnosisResult } from '../types';

interface ResultDisplayProps {
  result: DiagnosisResult;
  hectares: string;
  onHectareChange: (value: string) => void;
  totalCompensation: number | null;
  onCalculateTotal: () => void;
  showHeatmap: boolean;
  onToggleHeatmap: () => void;
}

const SourceBadge: React.FC<{ source: 'Custom Model' | 'Gemini Vision' }> = ({ source }) => {
  const isGemini = source === 'Gemini Vision';
  const bgColor = isGemini ? 'bg-purple-600' : 'bg-blue-600';
  const textColor = 'text-white';
  const text = isGemini ? 'Advanced AI Analysis' : source;
  
  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
      {text}
    </span>
  );
};

// Formatter for Indian Rupees
const inrFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
});

const SeverityIndicator: React.FC<{ severity: 'Low' | 'Medium' | 'High' }> = ({ severity }) => {
    const severityStyles = {
        Low: { text: 'text-green-400', bg: 'bg-green-900/50' },
        Medium: { text: 'text-yellow-400', bg: 'bg-yellow-900/50' },
        High: { text: 'text-red-400', bg: 'bg-red-900/50' },
    };
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded ${severityStyles[severity].text} ${severityStyles[severity].bg}`}>
            {severity} Severity
        </span>
    );
};


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, hectares, onHectareChange, totalCompensation, onCalculateTotal, showHeatmap, onToggleHeatmap }) => {
  return (
    <div className="w-full p-6 bg-gray-800 border border-gray-700 rounded-lg text-left animate-fade-in">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-brand-green capitalize">{result.disease}</h3>
        <SourceBadge source={result.source} />
      </div>
      
      <div className="flex items-center space-x-2 mb-3">
        {result.confidence && (
            <p className="text-sm text-gray-400">
            Conf: <span className="font-semibold text-gray-200">{(result.confidence * 100).toFixed(1)}%</span>
            </p>
        )}
        <SeverityIndicator severity={result.severity} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
        <div>
            <h4 className="font-semibold text-gray-300">Damage Source</h4>
            <p className="text-gray-400">{result.damageType}</p>
        </div>
        <div>
            <h4 className="font-semibold text-gray-300">Affected Stage</h4>
            <p className="text-gray-400">{result.cropStage}</p>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        <div>
          <h4 className="font-semibold text-gray-300 mb-1">Description</h4>
          <p className="text-gray-400 text-sm">{result.description}</p>
        </div>
        <div>
          <h4 className="font-semibold text-gray-300 mb-1">Recommended Remedy</h4>
          <p className="text-gray-400 text-sm">{result.remedy}</p>
        </div>
      </div>
      
      <div className="p-3 bg-gray-900 rounded-lg border border-gray-700 mb-4">
          <h4 className="font-semibold text-gray-300 text-sm mb-2">Analysis Tools</h4>
          <button
            onClick={onToggleHeatmap}
            disabled={!result.heatmapCenter}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 text-sm disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {showHeatmap ? 'Hide Damage Heatmap' : 'Show Damage Heatmap'}
          </button>
          <p className="text-xs text-gray-500 mt-1 text-center">Visually highlights damaged regions on the image.</p>
      </div>

      <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
        <h4 className="font-bold text-lg text-center text-white mb-2">Claim Estimation</h4>
        <p className="text-xs text-gray-400 text-center mb-3">
            This estimation is based on the <strong className="text-gray-300">Pradhan Mantri Fasal Bima Yojana (PMFBY)</strong>, the primary government-backed crop insurance scheme operational in Tamil Nadu. The rate reflects the typical sum insured for this crop, adjusted for the diagnosed severity of damage, providing a realistic projection of potential financial aid.
        </p>
        <p className="text-md text-gray-300 text-center mb-4">
            Est. Compensation Rate: <span className="font-bold text-white">{inrFormatter.format(result.compensation)} / Hectare</span>
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-2">
            <input 
                type="number"
                placeholder="Enter Hectares"
                value={hectares}
                onChange={(e) => onHectareChange(e.target.value)}
                className="w-full sm:w-1/2 bg-gray-700 border border-gray-600 text-white text-md rounded-lg focus:ring-brand-green focus:border-brand-green p-2.5"
                min="0"
            />
            <button 
                onClick={onCalculateTotal}
                disabled={!hectares || parseFloat(hectares) <= 0}
                className="w-full sm:w-1/2 bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2.5 px-4 rounded-lg transition-colors duration-300 disabled:bg-gray-600"
            >
                Calculate Claim
            </button>
        </div>
        {totalCompensation !== null && (
            <div className="mt-4 text-center p-3 bg-brand-green/10 border border-brand-green rounded-lg">
                <p className="text-sm text-gray-300">Total Estimated Claim for {hectares} Hectare(s):</p>
                <p className="text-2xl font-bold text-white">{inrFormatter.format(totalCompensation)}</p>
            </div>
        )}
      </div>
    </div>
  );
};