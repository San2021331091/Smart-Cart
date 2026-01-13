import { EXPO_FIBER_BASE_URL } from '@env';
import { DefaultApiService } from '../services/DefaultApiService';
import { MainCategoryView } from '../category/MainCategoryView';

export class MainCategoryService extends DefaultApiService {
  constructor() {
    super(EXPO_FIBER_BASE_URL);
  }

  public async fetchAll(): Promise<MainCategoryView[]> {
    return this.get<MainCategoryView[]>('/maincategories');
  }

  public async getAllMainCategories(): Promise<MainCategoryView[]> {
    return this.fetchAll();
  }
}
