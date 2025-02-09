import { axiosInstance } from "../../../api/axios";
import { AxiosResponse } from "axios";
import { DefaultUser } from "../../../types/Post";
import { ResponseActionPayload } from "../../../types/types";

type UserData = { token: string; searchTerm: string };
interface ResponseData {
  searchResult: DefaultUser[];
}


// Async function to search for users
const searchUsers = async (userData: UserData): Promise<ResponseActionPayload<ResponseData>> => {
  try {
    const response: AxiosResponse<ResponseActionPayload<ResponseData>> = await axiosInstance.post(
      `/users/search/${userData.searchTerm}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      }
    );
    return { ...response.data, status: response.status };
  } catch (error: any) {
    return {
      message: error.response?.data.message?? "Unknown error",
      code: error.response?.status.toString(),
      status: error.response?.status,
    };
  }
};

export default searchUsers;
