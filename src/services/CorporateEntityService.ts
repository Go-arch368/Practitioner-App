import { fetchPostRequest } from "./Service";

// Define your corporate entity interface


class CorporateEntityService {
  searchCorporateEntity<T extends object>(corporateEntity: T) {
    // Use Next.js compatible env variables (set in .env.local, must start with NEXT_PUBLIC_ for client use)
    const hostname = process.env.NEXT_PUBLIC_API_HOST;
    const port = process.env.NEXT_PUBLIC_API_PORT;
    const CE_API_BASE_URL = `${hostname}:${port}/api/v1/searchcorps`;

    console.log("Server API URL is " + CE_API_BASE_URL);
    return fetchPostRequest(CE_API_BASE_URL, corporateEntity);
  }
}

export default new CorporateEntityService();
