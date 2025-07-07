import { DefaultApiService } from '../services/DefaultApiService';
import { EXPO_FIBER_BASE_URL } from '@env';
import { NotificationInfo } from '../notificationInfo/Notificationinfo';

export class NotificationService extends DefaultApiService {
  constructor() {
    super(EXPO_FIBER_BASE_URL); // Using FIBER base URL
  }

  public async fetchNotifications(): Promise<NotificationInfo[]> {
    return this.get<NotificationInfo[]>('/notifications');
  }
}

