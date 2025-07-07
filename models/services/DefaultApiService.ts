import { BaseApiService } from './BaseApiService.ts';

export class DefaultApiService extends BaseApiService {
  public override async get<T>(url: string, token?: string): Promise<T> {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const response = await this.api.get<T>(url, { headers });
    return response.data;
  }

  public override async post<T>(url: string, body: any, token?: string): Promise<T> {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const response = await this.api.post<T>(url, body, { headers });
    return response.data;
  }

  public override async put<T>(url: string, body: any, token?: string): Promise<T> {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const response = await this.api.put<T>(url, body, { headers });
    return response.data;
  }

  public override async delete<T>(url: string, token?: string): Promise<T> {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const response = await this.api.delete<T>(url, { headers });
    return response.data;
  }
}
