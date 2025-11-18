
import React from 'react';
import { Crop } from './types';

export const CROP_OPTIONS: { value: Crop; label: string }[] = [
  { value: Crop.Tomato, label: 'Tomato' },
  { value: Crop.Potato, label: 'Potato' },
  { value: Crop.Corn, label: 'Corn (Maize)' },
  { value: Crop.Wheat, label: 'Wheat' },
  { value: Crop.Rice, label: 'Rice' },
  { value: Crop.Soybean, label: 'Soybean' },
  { value: Crop.Cotton, label: 'Cotton' },
  { value: Crop.Grapes, label: 'Grapes' },
  { value: Crop.Apple, label: 'Apple' },
  { value: Crop.BellPepper, label: 'Bell Pepper' },
];

export const MOCK_DISEASES: { [key in Crop]?: string[] } = {
  [Crop.Tomato]: ['Early blight', 'Late blight', 'Leaf Mold', 'Septoria leaf spot'],
  [Crop.Potato]: ['Early blight', 'Late blight', 'Black Scurf', 'Common Scab'],
  [Crop.Corn]: ['Gray leaf spot', 'Northern corn leaf blight', 'Common rust'],
};

export const CONFIDENCE_THRESHOLD = 0.6;

export const LeafIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-brand-green" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        <path d="M15.999 5.25a1 1 0 00-1-1h-2.25a.75.75 0 000 1.5h1.036a8.038 8.038 0 01-5.786 5.786V11.5a.75.75 0 00-1.5 0v2.25a1 1 0 001 1h2.25a.75.75 0 000-1.5h-1.036a8.038 8.038 0 015.786-5.786V9.5a.75.75 0 001.5 0V6.25a1 1 0 00-.75-.999zM4.001 14.75a1 1 0 001 1h2.25a.75.75 0 000-1.5H6.214a8.038 8.038 0 015.786-5.786V8.5a.75.75 0 001.5 0V6.25a1 1 0 00-1-1h-2.25a.75.75 0 000 1.5h1.036a8.038 8.038 0 01-5.786 5.786V10.5a.75.75 0 00-1.5 0v2.25a1 1 0 00.75 1z" />
    </svg>
);
