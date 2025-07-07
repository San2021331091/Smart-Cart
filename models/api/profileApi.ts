import { DefaultApiService } from '../services/DefaultApiService';
import { EXPO_FASTIFY_BASE_URL } from '@env';

export class ProfileService extends DefaultApiService {
  constructor() {
    super(EXPO_FASTIFY_BASE_URL);
  }

  public async fetchProfile(token: string): Promise<any> {
    return this.get<any>('/profile', token);
  }
}
