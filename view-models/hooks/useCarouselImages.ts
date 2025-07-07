import { useEffect, useState } from "react";
import { CarouselService } from "../../models/api/carouselApi.ts";
import {CarouselItem} from '../../models/carousel/CarouselItem.ts';

export const useCarouselImages = () => {
  const [images, setImages] = useState<CarouselItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const carousel = new CarouselService();

  useEffect(() => {
    const loadImages = async () => {
      try {
        const data = await carousel.fetchCarouselImages();
        setImages(data);
      } catch (err) {
        setError("Failed to fetch carousel images");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadImages().then();
  }, []);

  return { images, loading, error };
};
