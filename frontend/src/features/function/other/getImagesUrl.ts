
import { UploadApiResponse } from 'cloudinary';

const getImagesUrl = ({ files }: { files?: UploadApiResponse[] }) => {
    if (!files) return [];
  return files.map((file) => file.secure_url);
};

export default getImagesUrl;