import axios, {AxiosInstance} from 'axios';

export abstract class BaseApiService {
  protected readonly api: AxiosInstance;

  protected constructor(baseURL: string) {
    this.api = axios.create({ baseURL });
  }

  public abstract get<T>(url: string,token?:string): Promise<T>;
  public abstract post<T>(url: string, body: any, token?: string): Promise<T>;
  public abstract put<T>(url: string, body: any, token?: string): Promise<T>;
  public abstract delete<T>(url: string, token?: string): Promise<T>;
}
