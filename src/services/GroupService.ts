import { AxiosResponse } from "axios";
import { fetchPostRequest } from "./Service";



class GroupService {
  searchGroup<TResponse,TRequest extends object>(groupRequest: TRequest):Promise<AxiosResponse<TResponse>> {
    const hostname = process.env.NEXT_PUBLIC_API_HOST;
    const port = process.env.NEXT_PUBLIC_API_PORT;
    const GROUPS_API_BASE_URL = `${hostname}:${port}/api/v1/searchgrps`;

    console.log("Server API URL is " + GROUPS_API_BASE_URL);

    return fetchPostRequest(GROUPS_API_BASE_URL, groupRequest);
  }
}

export default new GroupService();
