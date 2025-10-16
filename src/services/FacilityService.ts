import { AxiosResponse } from "axios";
import { fetchPostRequest } from "./Service";

class FacilityService {
  searchFacility<TResponse, TRequest extends object>(
    facilityRequest: TRequest
  ): Promise<AxiosResponse<TResponse>> {
    const hostname = process.env.NEXT_PUBLIC_API_HOST;
    const port = process.env.NEXT_PUBLIC_API_PORT;
    const FACILITY_API_BASE_URL = `${hostname}:${port}/api/v1/searchFacility`;
    console.log("Server API URL is " + FACILITY_API_BASE_URL);
    return fetchPostRequest(FACILITY_API_BASE_URL, facilityRequest);
  }
}

export default new FacilityService();
