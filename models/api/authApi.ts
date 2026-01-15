import { DefaultApiService } from '../services/DefaultApiService';
import { EXPO_FASTIFY_BASE_URL } from '@env';
import { UserInfo } from '../user/UserInfo';

export class AuthService extends DefaultApiService {
  constructor() {
    super(EXPO_FASTIFY_BASE_URL);
  }

  public async login(user: UserInfo, token: string) {
    return this.post('/login', user, token);
  }

  public async loginToBackend(user: UserInfo, accessToken: string) {
    return await this.login(user, accessToken);
  }
}
