import { AxiosInstance } from "axios";
import { useEffect, useMemo } from "react";
import { LOCAL_STORAGE } from "../../const";
import { useComponentUnloadState } from "../../hooks/use-component-unload-state";

import { AxiosHttpClient, HttpClient } from "./http-client";
import { initializeAxios } from "./initialize-axios";

export function useAxios(baseURL?: string): AxiosInstance {
  const axios = initializeAxios(baseURL);

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
        // Do something with request error
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      (value) => value,
      (error) => {
        return error;
      }
    );
    return () => {
      axios.interceptors.request.clear();
      axios.interceptors.response.clear();
    };
  }, []);

  return axios;
}

export function useHttpClient(baseURL?: string): HttpClient {
  const axios = useAxios(baseURL);

  const componentUnloadState = useComponentUnloadState();

  const httpClient = useMemo<AxiosHttpClient>(() => {
    return new AxiosHttpClient(axios, componentUnloadState);
  }, [baseURL]);

  return httpClient;
}
