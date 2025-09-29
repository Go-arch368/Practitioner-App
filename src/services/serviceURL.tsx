const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const API_PORT = process.env.NEXT_PUBLIC_API_PORT;

const ServiceURLs = {
    GET_REF_DATA :`${API_HOST}:${API_PORT}/api/v1/publish/uicodeslist`,
    GET_CONFIG_DATA:`${API_HOST}:${API_PORT}/api/v1/publish/getconfigs`
}

export default ServiceURLs
