import { fetchPostRequest } from "./Service";
interface Provider {
  [key: string]: any; // Adjust this to your actual provider object structure
}

// Add the following type declarations to fix the ImportMeta error
interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_API_PORT: string;
  // add other env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

class PractitionerService {
  searchPractitioner(provider: Provider) {
    const hostname = import.meta.env.VITE_API_HOST;
    const port = import.meta.env.VITE_API_PORT;
    const PRACTITIONER_API_BASE_URL = `${hostname}:${port}/api/v1/searchprac`;
    console.log("Server API URL is", PRACTITIONER_API_BASE_URL);
    return fetchPostRequest(PRACTITIONER_API_BASE_URL, provider);
  }
}

export default new PractitionerService();
