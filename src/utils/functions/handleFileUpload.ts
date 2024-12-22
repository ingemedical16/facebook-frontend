import { fileToBase64, isValidImageSize, isValidImageType } from "./imageHelpersFunction";


export const handleFileUpload = async (
  event: React.ChangeEvent<HTMLInputElement>,
  onError: (message: string) => void,
  onSuccess: (base64Image: string) => void,
  options?: { maxSizeMB?: number }
): Promise<void> => {
  const files = event.target.files ? Array.from(event.target.files) : [];
  const maxSizeMB = options?.maxSizeMB || 5;

  for (const file of files) {
    if (!isValidImageType(file.type)) {
      onError(
        `${file.name} format is unsupported! Only Jpeg, Png, Webp, and Gif are allowed.`
      );
      continue;
    }

    if (!isValidImageSize(file.size, maxSizeMB)) {
      onError(`${file.name} size is too large. Maximum ${maxSizeMB}MB allowed.`);
      continue;
    }

    try {
      const base64Image = await fileToBase64(file);
      onSuccess(base64Image);
    } catch {
      onError(`Error processing file ${file.name}.`);
    }
  }
};
