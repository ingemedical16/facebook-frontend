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

  export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous"); // Avoid cross-origin issues
      image.src = url;
    });
  
  export function getRadianAngle(degreeValue: number): number {
    return (degreeValue * Math.PI) / 180;
  }
  
  /**
   * Returns the new bounding area of a rotated rectangle.
   */
  export function rotateSize(
    width: number,
    height: number,
    rotation: number
  ): { width: number; height: number } {
    const rotRad = getRadianAngle(rotation);
  
    return {
      width:
        Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
      height:
        Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
  }
  