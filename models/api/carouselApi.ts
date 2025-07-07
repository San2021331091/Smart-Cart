import { DefaultApiService } from '../services/DefaultApiService'; // or DefaultApiServiceImpl if that's the actual file
import { EXPO_SLIM_BASE_URL } from '@env';
import { CarouselItem } from '../carousel/CarouselItem';

export class CarouselService extends DefaultApiService {
  constructor() {
    super(EXPO_SLIM_BASE_URL);
  }

  public async fetchImages(): Promise<CarouselItem[]> {
    return this.get<CarouselItem[]>('/imagecarousel');
  }

  public async fetchCarouselImages(): Promise<CarouselItem[]> {
    return await this.fetchImages();
  }
}