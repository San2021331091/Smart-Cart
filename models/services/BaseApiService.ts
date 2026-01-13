import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// ---------------------------
// ISP + DIP

export interface IReadableHttpClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<{ data: T }>;
}

export interface IWritableHttpClient {
  post<T>(url: string, body: any, config?: AxiosRequestConfig): Promise<{ data: T }>;
  put<T>(url: string, body: any, config?: AxiosRequestConfig): Promise<{ data: T }>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<{ data: T }>;
}

// ---------------------------
// Abstract Base API Service
// SRP: only responsible for holding HTTP client
// DIP: depends on abstractions, not Axios directly
export abstract class BaseApiService {
  protected readonly apiRead: IReadableHttpClient;
  protected readonly apiWrite: IWritableHttpClient;

  protected constructor(baseURL: string) {
    const axiosInstance: AxiosInstance = axios.create({ baseURL });

    this.apiRead = {
      get: (url, config) => axiosInstance.get(url, config),
    };

    this.apiWrite = {
      post: (url, body, config) => axiosInstance.post(url, body, config),
      put: (url, body, config) => axiosInstance.put(url, body, config),
      delete: (url, config) => axiosInstance.delete(url, config),
    };
  }

  public abstract get<T>(url: string, token?: string): Promise<T>;
  public abstract post<T>(url: string, body: any, token?: string): Promise<T>;
  public abstract put<T>(url: string, body: any, token?: string): Promise<T>;
  public abstract delete<T>(url: string, token?: string): Promise<T>;
}
