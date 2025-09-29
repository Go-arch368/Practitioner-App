import { fetchPostRequest } from "./Service";

// Define your provider interface
interface Provider {
  [key: string]: any; // Adjust properties according to your actual provider object
}

class AllProviderService {
  searchAllProviders(providerRequest: Provider) {
    
    const hostname = process.env.NEXT_PUBLIC_API_HOST;
    const port = process.env.NEXT_PUBLIC_API_PORT;
    const PROVIDER_API_BASE_URL = `${hostname}:${port}/api/v1/searchallprov`;
    console.log("Server API URL is " + PROVIDER_API_BASE_URL);
    return fetchPostRequest(PROVIDER_API_BASE_URL, providerRequest);
  }
}

export default new AllProviderService();
