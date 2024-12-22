import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { ResponseActionPayload } from "../../../types/types";
import { Reaction, ReactionsData } from "../../../types/Reaction";

type UserData = Reaction & { token: string };

const handlePostReactionsByPostIdAPI = async (
  userData: UserData
): Promise<ResponseActionPayload<ReactionsData>> => {
  try {
    const response: AxiosResponse<ResponseActionPayload<ReactionsData>> =
      await axiosInstance.put(
        "/reactions/put-reaction",
        {
          postId: userData.postRef,
          reaction: userData.reaction,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
    return { ...response.data, status: response.status };
  } catch (error) {
    console.error("Error uploading files to cloud:", error);
    throw new Error(
      (error as any)?.response?.data?.message ||
        "An unexpected error occurred while uploading files."
    );
  }
};

export default handlePostReactionsByPostIdAPI;
