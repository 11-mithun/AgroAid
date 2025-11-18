
// A utility function to convert a File object to a base64 string
async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // result is a data URL like "data:image/jpeg;base64,LzlqLzRBQ...". We only want the base64 part.
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
}

// A utility function to convert a File object into a GoogleGenerativeAI.Part object.
export async function fileToGenerativePart(file: File) {
  const base64EncodedData = await fileToBase64(file);
  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
}
