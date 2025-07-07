import { DefaultApiService } from '../services/DefaultApiService';
import { EXPO_FLASK_BASE_URL } from '@env';

export class AIService extends DefaultApiService {
  constructor() {
    super(EXPO_FLASK_BASE_URL); // Use Flask backend
  }

  public async ask(query: string): Promise<{ answer: string; products: any }> {
    try {
      const response = await this.post<{ answer: string; products: any }>(
        '/ask',
        { query }
      );

      return {
        answer: response.answer || "Sorry, I don't have a response.",
        products: response.products || null,
      };
    } catch (error) {
      console.error('❌ AI request failed:', error);
      throw error;
    }
  }
}
