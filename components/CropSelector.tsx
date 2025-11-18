
import React from 'react';
import type { Crop } from '../types';
import { CROP_OPTIONS } from '../constants';

interface CropSelectorProps {
  selectedCrop: Crop;
  onCropChange: (crop: Crop) => void;
}

export const CropSelector: React.FC<CropSelectorProps> = ({ selectedCrop, onCropChange }) => {
  return (
    <div>
      <label htmlFor="crop-selector" className="block text-sm font-medium text-gray-300 mb-2">
        Select Crop Type
      </label>
      <select
        id="crop-selector"
        value={selectedCrop}
        onChange={(e) => onCropChange(e.target.value as Crop)}
        className="w-full bg-gray-700 border border-gray-600 text-white text-md rounded-lg focus:ring-brand-green focus:border-brand-green p-2.5"
      >
        {CROP_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
