import { BaseApiService } from './BaseApiService';
import { AxiosRequestConfig } from 'axios';

// ---------------------------
// Auth strategy — SRP + OCP + ISP
export interface IAuthStrategy {
  getHeaders(token?: string): Record<string, string>;
}

// Concrete auth strategy: Bearer token
class BearerAuthStrategy implements IAuthStrategy {
  getHeaders(token?: string): Record<string, string> {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

// ---------------------------
// Concrete API Service — LSP + DIP + SRP
export class DefaultApiService extends BaseApiService {
  private readonly authStrategy: IAuthStrategy;

  constructor(baseURL: string) {
    super(baseURL);
    this.authStrategy = new BearerAuthStrategy();
  }

  private getConfig(token?: string): AxiosRequestConfig {
    return { headers: this.authStrategy.getHeaders(token) };
  }

  public override async get<T>(url: string, token?: string): Promise<T> {
    const response = await this.apiRead.get<T>(url, this.getConfig(token));
    return response.data;
  }

  public override async post<T>(url: string, body: any, token?: string): Promise<T> {
    const response = await this.apiWrite.post<T>(url, body, this.getConfig(token));
    return response.data;
  }

  public override async put<T>(url: string, body: any, token?: string): Promise<T> {
    const response = await this.apiWrite.put<T>(url, body, this.getConfig(token));
    return response.data;
  }

  public override async delete<T>(url: string, token?: string): Promise<T> {
    const response = await this.apiWrite.delete<T>(url, this.getConfig(token));
    return response.data;
  }
}
