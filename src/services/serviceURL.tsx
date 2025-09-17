const API_HOST = import.meta.env.VITE_API_HOST;
const API_PORT = import.meta.env.VITE_API_PORT;

const ServiceURLs = {
    GET_REF_DATA :`${API_HOST}:${API_PORT}/api/v1/publish/uicodeslist`,
    GET_CONFIG_DATA:`${API_HOST}:${API_PORT}/api/v1/publish/getconfigs`
}

export default ServiceURLs
