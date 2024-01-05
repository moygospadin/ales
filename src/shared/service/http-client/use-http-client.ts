import { AxiosInstance } from "axios";
import { useEffect, useMemo } from "react";
import { LOCAL_STORAGE } from "../../const";

import { AxiosHttpClient, HttpClient } from "./http-client";
import { initializeAxios } from "./initialize-axios";
const axios = initializeAxios();
export function useAxios(): AxiosInstance {
  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        const access_token = localStorage.getItem(LOCAL_STORAGE.access_token);
        if (access_token && config.headers) {
          config.headers.Authorization = `Bearer ${access_token}`;
        }

        return config;
      },
      function (error) {
        console.log("error", error);

        // Do something with request error
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      (value) => value,
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.request.clear();
      axios.interceptors.response.clear();
    };
  }, []);

  return axios;
}

export function useHttpClient(): HttpClient {
  const axios = useAxios();

  const httpClient = useMemo<AxiosHttpClient>(() => {
    return new AxiosHttpClient(axios);
  }, []);

  return httpClient;
}
