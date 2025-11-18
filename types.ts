export enum Crop {
  Tomato = 'Tomato',
  Potato = 'Potato',
  Corn = 'Corn',
  Wheat = 'Wheat',
  Rice = 'Rice',
  Soybean = 'Soybean',
  Cotton = 'Cotton',
  Grapes = 'Grapes',
  Apple = 'Apple',
  BellPepper = 'Bell Pepper',
}

export interface DiagnosisResult {
  disease: string;
  confidence?: number;
  description: string;
  remedy: string;
  compensation: number; // This is now per hectare in INR
  source: 'Custom Model' | 'Gemini Vision';
  damageType: string;
  cropStage: string;
  severity: 'Low' | 'Medium' | 'High';
  heatmapCenter?: { x: number; y: number };
}