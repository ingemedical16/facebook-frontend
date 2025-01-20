import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { UploadApiResponse } from "cloudinary";
import { ResponseActionPayload } from "../../../types/types";

type UserData = { token: string; formData: FormData };

// Function to handle the upload request
const uploadFilesToCloudAPI = async (
  userData: UserData
): Promise<ResponseActionPayload<{ files: UploadApiResponse[] }>> => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      "/uploads/uploadFilesToCloud",
      userData.formData, // FormData should not be spread; it must be passed directly
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
          "content-type": "multipart/form-data",
        },
      }
    );
  
    return {...response.data, status:response.status};
  } catch (error) {
    console.error("Error uploading files to cloud:", error);
    throw new Error(
      (error as any)?.response?.data?.message || "An unexpected error occurred while uploading files."
    );
  }
};

export default uploadFilesToCloudAPI;
