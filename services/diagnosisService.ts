import { GoogleGenAI, Type } from "@google/genai";
import { Crop, type DiagnosisResult } from '../types';
import { MOCK_DISEASES, CONFIDENCE_THRESHOLD } from '../constants';
import { fileToGenerativePart } from '../utils/fileUtils';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function getRandomItem<T,>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Realistic (but illustrative) sum insured per hectare in INR for Tamil Nadu schemes
const SUM_INSURED_PER_HECTARE: { [key in Crop]: number } = {
  [Crop.Rice]: 80000,
  [Crop.Corn]: 65000,
  [Crop.Wheat]: 60000,
  [Crop.Tomato]: 90000,
  [Crop.Potato]: 85000,
  [Crop.Soybean]: 55000,
  [Crop.Cotton]: 75000,
  [Crop.Grapes]: 250000,
  [Crop.Apple]: 200000,
  [Crop.BellPepper]: 95000,
};

function calculateCompensation(crop: Crop, severity: 'Low' | 'Medium' | 'High', disease: string): number {
  const sumInsured = SUM_INSURED_PER_HECTARE[crop];
  
  if (disease.toLowerCase().includes('healthy')) return 0;

  const severityMultipliers = {
    Low: 0.20,    // 20% loss
    Medium: 0.45, // 45% loss
    High: 0.70,   // 70% loss
  };
  
  const severityMultiplier = severityMultipliers[severity] || 0.20;
  
  // Final compensation is a percentage of the sum insured
  return sumInsured * severityMultiplier;
}

async function getGeminiDiagnosis(imageFile: File, cropType: Crop): Promise<Omit<DiagnosisResult, 'compensation' | 'source' | 'confidence'>> {
  const imagePart = await fileToGenerativePart(imageFile);

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [
      imagePart,
      { text: `You are an expert agricultural pathologist for Tamil Nadu, India. Analyze this image of a ${cropType} plant. Your response MUST be a JSON object. Identify the primary issue (disease, pest, nutrient deficiency, or environmental stress). Also, provide the approximate center of the most affected area as a coordinate object with 'x' and 'y' properties, where each is a number from 0 to 100 representing the percentage from the left and top edges of the image, respectively.` }
    ]},
    config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                disease: {
                    type: Type.STRING,
                    description: "The common name of the issue (e.g., 'Early Blight', 'Aphid Infestation', 'Nitrogen Deficiency'). If healthy, say 'Healthy'."
                },
                damageType: {
                    type: Type.STRING,
                    description: "Categorize the source of damage. Choose one: Fungal, Bacterial, Viral, Pest, Nutrient Deficiency, Environmental Stress, Water-related."
                },
                severity: {
                    type: Type.STRING,
                    description: "Estimate the severity of the damage. Choose one: Low, Medium, or High."
                },
                cropStage: {
                    type: Type.STRING,
                    description: "The typical crop stage this issue appears (e.g., 'Seedling', 'Vegetative', 'Flowering', 'Fruiting')."
                },
                description: {
                    type: Type.STRING,
                    description: "A brief, one-sentence description of the findings."
                },
                remedy: {
                    type: Type.STRING,
                    description: "A very concise, two-line (max) suggestion for treatment common in India."
                },
                heatmapCenter: {
                    type: Type.OBJECT,
                    description: "An object with x and y coordinates (0-100) for the center of the damage.",
                    properties: {
                        x: { type: Type.NUMBER },
                        y: { type: Type.NUMBER }
                    },
                    required: ["x", "y"]
                }
            },
            required: ["disease", "damageType", "severity", "cropStage", "description", "remedy", "heatmapCenter"]
        }
    }
  });

  const text = response.text;
  try {
    const parsed = JSON.parse(text);
    return {
      disease: parsed.disease || "Unknown Issue",
      damageType: parsed.damageType || "Not specified",
      severity: parsed.severity || "Medium",
      cropStage: parsed.cropStage || "Not specified",
      description: parsed.description || "No description provided.",
      remedy: parsed.remedy || "Consult a local agricultural expert.",
      heatmapCenter: parsed.heatmapCenter || { x: 50, y: 50 },
    };
  } catch (e) {
    console.error("Failed to parse Gemini JSON response:", text);
    throw new Error("Could not interpret the analysis from the AI.");
  }
}

export const diagnoseCrop = async (imageFile: File, cropType: Crop): Promise<DiagnosisResult> => {
  // 1. Simulate the custom model run to decide if we should use it or fallback.
  const originalConfidence = 0.4 + Math.pow(Math.random(), 0.5) * 0.6;
  const knownDiseasesForCrop = MOCK_DISEASES[cropType] || MOCK_DISEASES[Crop.Tomato]!;
  
  // 2. Check confidence against the threshold
  if (originalConfidence >= CONFIDENCE_THRESHOLD) {
    // High confidence: Use the custom model's "prediction".
    // Generate a new, higher confidence score for display, ensuring it's at least 90%.
    const displayedConfidence = 0.9 + Math.random() * 0.099; // Range: 0.900 to 0.999

    const disease = getRandomItem(knownDiseasesForCrop);
    const severity = getRandomItem<'Low' | 'Medium' | 'High'>(['Low', 'Medium', 'High']);
    return {
      disease,
      confidence: displayedConfidence,
      damageType: "Fungal Disease",
      cropStage: "Vegetative to Fruiting",
      severity: severity,
      description: `Signs of ${disease} detected. This is a common issue for ${cropType} in humid conditions.`,
      remedy: `Apply a suitable fungicide like Mancozeb and ensure proper plant spacing for better air circulation.`,
      compensation: calculateCompensation(cropType, severity, disease),
      source: 'Custom Model',
      heatmapCenter: { x: 30 + Math.random() * 40, y: 30 + Math.random() * 40 }, // Simulated center
    };
  } else {
    // 3. Low confidence: Fallback to Gemini Vision API
    const geminiResult = await getGeminiDiagnosis(imageFile, cropType);
    
    return {
      ...geminiResult,
      compensation: calculateCompensation(cropType, geminiResult.severity, geminiResult.disease),
      source: 'Gemini Vision',
    };
  }
};