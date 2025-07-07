import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
} from 'react-native';
import Carousel from "react-native-reanimated-carousel";
import { useCarouselImages } from "../../view-models/hooks/useCarouselImages.ts";
import ProgressBar from './ProgressBar.tsx';

const { width } = Dimensions.get("window");

const ImageCarousel: React.FC = (): React.JSX.Element => {
  const { images, loading, error } = useCarouselImages();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startAutoPlay, setStartAutoPlay] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStartAutoPlay(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ProgressBar />;
  }

  if (error) {
    return <View className='mt-5'><Text className='text-red-600 text-4xl font-bold italic'>{error}</Text></View>;
  }

  if (!images || images.length === 0) {
    return <View className='mt-5'><Text className='text-gray-600'>No images available</Text></View>;
  }

  return (
    <View className="mt-9" style={styles.container}>
      <Carousel
        loop
        width={width}
        height={(width - 32) * 9 / 16}
        autoPlay={startAutoPlay}
        autoPlayInterval={3000}
        scrollAnimationDuration={1000}
        data={images}
        onSnapToItem={(index) => setCurrentIndex(index)}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.image_url }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        )}
      />

      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
              { opacity: index === currentIndex ? 1 : 0.3 } // Adjust opacity here
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    width: width - 32,
    aspectRatio: 16 / 9,
    borderRadius: 16,
    overflow: "hidden",
    marginHorizontal: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 12,
    height: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#fff",
  },
  inactiveDot: {
    backgroundColor: "#899499",
  },
});

export default ImageCarousel;