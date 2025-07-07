import { DefaultApiService } from '../services/DefaultApiService';
import { EXPO_SLIM_BASE_URL } from '@env';
import { Category } from '../category/Category';

export class CategoryService extends DefaultApiService {
  constructor() {
    super(EXPO_SLIM_BASE_URL);
  }

  public async fetchAll(): Promise<Category[]> {
    return this.get<Category[]>('/categories');
  }
  public async getAllCategories(): Promise<Category[]> {
    return await this.fetchAll();
  }
}

