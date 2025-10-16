import AllProvider from "@/components/model/AllProvider";
import { fetchPostRequest } from "./Service";
import axios, { AxiosResponse } from "axios";

// Define your service class
class AllProviderService {
  // Make this method generic: TReq = request type, TRes = response type
  searchAllProviders<TRes = AllProvider[], TReq = object>(providerRequest: TReq): Promise<AxiosResponse<TRes>> {
    const hostname = process.env.NEXT_PUBLIC_API_HOST;
    const port = process.env.NEXT_PUBLIC_API_PORT;
    const PROVIDER_API_BASE_URL = `${hostname}:${port}/api/v1/searchallprov`;
    console.log("Server API URL is " + PROVIDER_API_BASE_URL);

    // Return a typed promise
    return fetchPostRequest<TRes, TReq>(PROVIDER_API_BASE_URL, providerRequest);
  }
}

export default new AllProviderService();
