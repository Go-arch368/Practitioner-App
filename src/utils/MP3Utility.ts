  import Config from "../components/model/Config";

  // Generic type for full form data, adjust as needed for actual provider shape
  export interface FullFormData {
    [key: string]: unknown;
  }

  // Retrieve a param's value from a config list
  export const retrieveConfig = (configList: Config[], param: string): string => {
    const match = configList.find((config: Config) => config.paramType === param);
    return match ? match.paramValue : "";
  };

  export const setLimitOnFormData = (limitConfig:string, fullFormData:FullFormData) =>{
      const updatedFormData = {
          ...fullFormData,
          ...(limitConfig?{["limit"]:limitConfig}:{})
      }
      return updatedFormData;
  }
