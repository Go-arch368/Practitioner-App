import { fetchPostRequest } from "./Service";

interface Facility{
    [key:string] :any
}

class FacilityService {
    searchFacility(facility:Facility){
        const hostname = import.meta.env.VITE_API_HOST;
        const port = import.meta.env.VITE_API_PORT;
        const FACILITY_API_BASE_URL = `${hostname}:${port}/api/v1/searchfacs`
        console.log("Server API URL is "+ FACILITY_API_BASE_URL);
        return fetchPostRequest(FACILITY_API_BASE_URL,facility)
        
    }
}

export default new FacilityService()