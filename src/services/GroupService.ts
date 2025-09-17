import { fetchPostRequest } from "./Service";

interface Group{
    [key:string] :any
}

class GroupService {
    searchGroup(groupRequest:Group){
        const hostname = import.meta.env.VITE_API_HOST;
        const port = import.meta.env.VITE_API_PORT;
        const GROUPS_API_BASE_URL = `${hostname}:${port}/api/v1/searchgrps`
        console.log("Server API URL is "+ GROUPS_API_BASE_URL);
        return fetchPostRequest(GROUPS_API_BASE_URL,groupRequest)
        
    }
}

export default new GroupService()