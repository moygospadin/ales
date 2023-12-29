import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { ComponentUnloadState } from "../../hooks/use-component-unload-state";
import { HttpRejectInfo } from "./http-reject-info"; // data can be any

export interface HttpRequestOptions {
  isStandardErrorHandlingDisabled?: boolean;
  axiosConfig?: AxiosRequestConfig;
}

type ResolvePromise<T> = (value: T | PromiseLike<T>) => void;
type RejectPromise = (reason?: HttpRejectInfo) => void;
type AxiosCall<T> = () => Promise<AxiosResponse<T>>;

export interface HttpClient {
  get<T>(url: string, options?: HttpRequestOptions): Promise<T>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<T>(url: string, data?: any, options?: HttpRequestOptions): Promise<T>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put<T>(url: string, data?: any, options?: HttpRequestOptions): Promise<T>;

  delete<T>(url: string, options?: HttpRequestOptions): Promise<T>;
}

export class AxiosHttpClient implements HttpClient {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly componentUnloadState: ComponentUnloadState
  ) {}

  get<T>(url: string, options?: HttpRequestOptions): Promise<T> {
    return this.tryPerformRequest(
      () => this.axios.get(url, options?.axiosConfig),
      options
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post<T>(url: string, data?: any, options?: HttpRequestOptions): Promise<T> {
    return this.tryPerformRequest<T>(
      () => this.axios.post(url, data, options?.axiosConfig),
      options
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put<T>(url: string, data?: any, options?: HttpRequestOptions): Promise<T> {
    return this.tryPerformRequest(
      () => this.axios.put(url, data, options?.axiosConfig),
      options
    );
  }

  delete<T>(url: string, options?: HttpRequestOptions): Promise<T> {
    return this.tryPerformRequest(
      () => this.axios.delete(url, options?.axiosConfig),
      options
    );
  }

  private tryPerformRequest<T>(
    axiosCall: AxiosCall<T>,
    options: HttpRequestOptions | undefined
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      axiosCall()
        .then((response) => {
          console.log("response", response);

          this.handleResponse(response, resolve);
        })
        .catch((error: AxiosError) => {
          console.log("error", error);

          this.handleError(
            error,
            !!options?.isStandardErrorHandlingDisabled,
            reject
          );
        })
        .finally();
    });
  }

  private handleResponse<T>(
    response: AxiosResponse<T>,
    resolve: ResolvePromise<T>
  ): void {
    resolve(response?.data);
  }

  private handleError(
    error: AxiosError,
    isStandardErrorHandlingDisabled: boolean,
    reject: RejectPromise
  ): void {
    if (isStandardErrorHandlingDisabled)
      reject(HttpRejectInfo.notHandled(error));

    if (
      this.tryHandleErrorResponse(error, reject) ||
      this.tryHandleMissingResponse(error, reject)
    ) {
      return;
    }

    this.handleErroneousRequest(error, reject);
  }

  private tryHandleErrorResponse(
    error: AxiosError,
    reject: RejectPromise
  ): boolean {
    const response = error.response;
    if (!response) return false;

    // TODO: notify errors

    if (response.status === 500) {
      reject(HttpRejectInfo.handled500InternalServerError(error));
    } else if (response.status === 404) {
      reject(HttpRejectInfo.handled404NotFound(error));
    } else {
      reject(HttpRejectInfo.notHandled(error));
    }

    return true;
  }

  private tryHandleMissingResponse(
    error: AxiosError,
    reject: RejectPromise
  ): boolean {
    const request = error.request;
    if (!request) {
      return false;
    }

    reject(HttpRejectInfo.handledServerNotReachable(error));
    return true;
  }

  private handleErroneousRequest(
    error: AxiosError,
    reject: RejectPromise
  ): void {
    console.error(typeof error.toJSON === "function" ? error.toJSON() : error);

    // TODO: notify errors

    reject(HttpRejectInfo.handledErroneousRequest(error));
  }
}
