# AgroAid Inspector

An advanced crop disease detection tool for farmers in Tamil Nadu. It uses a primary custom model and falls back to Google's Gemini API for comprehensive analysis. Users can select a crop, upload an image, get an instant diagnosis, and calculate an estimated insurance claim amount based on their land area.

## Features

- **Crop Disease Detection**: Upload an image of a plant to identify diseases, pests, or nutrient deficiencies.
- **Multiple Crop Support**: Supports a variety of crops common in the region, including Tomato, Potato, Corn, and more.
- **Dual-Analysis System**: Utilizes a simulated high-speed custom model for common issues and falls back to the powerful Gemini Vision model for more nuanced analysis, ensuring both speed and accuracy.
- **Detailed Diagnosis**: Provides a comprehensive report including:
    - Disease/Issue Name
    - Confidence Score (from the custom model)
    - Damage Type & Severity
    - Affected Crop Stage
    - Clear Description and Recommended Remedy
- **Damage Heatmap**: Visually highlights the most affected area on the uploaded image.
- **Insurance Claim Estimation**: Calculates an estimated claim amount based on the official Pradhan Mantri Fasal Bima Yojana (PMFBY) scheme, tailored for Tamil Nadu.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **AI/ML**: Google Gemini API (`gemini-2.5-flash`)
- **Environment**: Runs directly in the browser using ES Modules and Import Maps (no build step required for core functionality).

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended) and npm.
- A Google Gemini API Key. You can get one from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation & Setup

1.  **Clone the repository or download the files.**

2.  **Install dependencies:**
    Open your terminal in the project directory and run:
    ```bash
    npm install
    ```
    This will install `serve`, a simple local server.

3.  **Configure your API Key:**
    -   Create a new file named `env.js` in the root of the project.
    -   Copy the content from `env.example.js` into your new `env.js` file.
    -   Replace `'YOUR_API_KEY_HERE'` with your actual Google Gemini API key.

    ```javascript
    // env.js
    window.process = {
      env: {
        API_KEY: 'YOUR_API_KEY_HERE' // Paste your key here
      }
    };
    ```

4.  **Security Note (Optional but Recommended):**
    To prevent accidentally committing your secret API key, create a `.gitignore` file in the root directory and add the following lines:
    ```
    # Environment variables
    env.js

    # Dependencies
    node_modules
    ```

### Running the Application

1.  **Start the local server:**
    ```bash
    npm start
    ```

2.  **View the application:**
    The terminal will show a local address (usually `http://localhost:3000`). Open this URL in your web browser to use AgroAid Inspector.

## How It Works

The application simulates a real-world agricultural tech tool. When a user uploads an image:

1.  A "custom model" is simulated. It generates a random confidence score.
2.  If the confidence is high (>= 60%), it returns a mock diagnosis for a common disease associated with the selected crop. This represents a fast, on-device model.
3.  If the confidence is low, the app concludes that the issue is complex and falls back to the **Gemini Vision API**.
4.  The image and a detailed prompt are sent to Gemini, which performs a deep analysis and returns structured JSON data about the disease, severity, remedy, and the location of the damage for the heatmap.
5.  The results, including a tailored insurance compensation estimate, are displayed to the user.
