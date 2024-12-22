import { Flip, PixelCrop } from "../../types/types";
import { createImage, getRadianAngle, rotateSize } from "./imageHelpersFunction";


/**
 * Crops and rotates an image from the given source URL.
 * @param imageSrc - Source URL of the image.
 * @param pixelCrop - The cropping area in pixels.
 * @param rotation - Rotation angle in degrees.
 * @param flip - Whether to flip the image horizontally and/or vertically.
 * @returns A promise resolving to the cropped image as a blob URL.
 */
export default async function getCroppedImg(
    imageSrc: string,
    pixelCrop: PixelCrop,
    rotation: number = 0,
    flip: Flip = { horizontal: false, vertical: false }
  ): Promise<string | null> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    if (!ctx) {
      return null;
    }
  
    const rotRad = getRadianAngle(rotation);
  
    // Calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
      image.width,
      image.height,
      rotation
    );
  
    // Set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;
  
    // Translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);
  
    // Draw rotated image
    ctx.drawImage(image, 0, 0);
  
    // Extract the cropped image using pixelCrop values
    const data = ctx.getImageData(
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height
    );
  
    // Set canvas size to the final desired crop size
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
  
    // Paste generated rotated image at the top-left corner
    ctx.putImageData(data, 0, 0);
  
    // Return the cropped image as a Blob URL
    return new Promise((resolve, reject) => {
      canvas.toBlob((file) => {
        if (file) {
          resolve(URL.createObjectURL(file));
        } else {
          reject(new Error("Failed to create blob from canvas"));
        }
      }, "image/jpeg");
    });
  }