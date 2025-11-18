// Create a file named 'env.js' in the root directory and copy this content into it.
// Replace 'YOUR_API_KEY_HERE' with your actual Google Gemini API key.
// This file is loaded by index.html to provide the API key to the application.
// IMPORTANT: Do not commit your env.js file to version control.

window.process = {
  env: {
    API_KEY: 'YOUR_API_KEY_HERE'
  }
};
