import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
const default_base_url = "http://localhost:8000/api";
function configureAxiosGlobalSettings(baseURL: string): void {
  axios.defaults.baseURL = baseURL;
}

export function initializeAxios(baseURL = default_base_url): AxiosInstance {
  configureAxiosGlobalSettings(baseURL);

  const configuration: AxiosRequestConfig = {
    headers: {},
  };

  configuration.baseURL = baseURL;

  return axios.create(configuration);
}
