import { AxiosResponse } from "axios";
import { axiosInstance } from "../../../api/axios";
import { ResponseActionPayload, SearchApiResponse } from "../../../types/types";

type UserData = {
    token: string;
    path: string;
    sort: "asc" | "desc";
    max: number;
  };

const searchImagesInCloudAPI = async (
  userData: UserData
): Promise<ResponseActionPayload<SearchApiResponse>> => {
  try {
    const response: AxiosResponse = await axiosInstance.post(
      "/uploads/uploadFilesToCloud",
      {
        path: userData.path,
        sort: userData.sort,
        max: userData.max,
      }, // FormData should not be spread; it must be passed directly
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
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
}

export default searchImagesInCloudAPI;