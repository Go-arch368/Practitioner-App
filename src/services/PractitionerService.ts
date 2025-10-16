import { fetchPostRequest } from "./Service";



class PractitionerService {
  searchPractitioner<T extends object>(provider: T) {
    const hostname = process.env.NEXT_PUBLIC_API_HOST;
    const port = process.env.NEXT_PUBLIC_API_PORT;
    const PRACTITIONER_API_BASE_URL = `${hostname}:${port}/api/v1/searchprac`;

    console.log("Server API URL is", PRACTITIONER_API_BASE_URL);

    return fetchPostRequest(PRACTITIONER_API_BASE_URL, provider);
  }
}

export default new PractitionerService();
