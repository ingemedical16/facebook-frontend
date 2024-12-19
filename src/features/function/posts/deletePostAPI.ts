import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";

type UserData = { token: string; id: string };

// Function to handle the upload request
const deletePostAPI = async (
  userData: UserData
): Promise<AxiosResponse<ResponseActionPayload>> => {
  try {
    const response: AxiosResponse = await axiosInstance.delete(
        `/posts/deletePost/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      return response.data;
  } catch (error) {
    console.error("Error toggling save post:", error);
    throw new Error(
      (error as any)?.response?.data?.message || "An unexpected error occurred."
    );
  }
};

export default deletePostAPI;
