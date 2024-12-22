// Validate image format
export const isValidImageType = (type: string): boolean => {
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    return validTypes.includes(type);
  };
  
  // Validate image size (maxSize in MB)
  export const isValidImageSize = (size: number, maxSize = 5): boolean => {
    return size <= maxSize * 1024 * 1024;
  };
  
  // Convert file to Base64 string
  export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  