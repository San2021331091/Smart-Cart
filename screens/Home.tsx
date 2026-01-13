import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { homeScreenColor } from '../colors/Colors.ts';
import ImageCarousel from '../components/ImageCarousel.tsx';
import ProductFiltering from '../components/ProductFiltering.tsx';
import SharedHeader from '../components/SharedHeader.tsx';
import TodaySales from '../components/TodaySales.tsx';
import TrendingProducts from '../components/TrendingProducts.tsx';
import MainCategories from '../components/MainCategories.tsx';

const Home: React.FC = (): React.JSX.Element => {
  return (
    <SafeAreaView className="flex-1 p-5" style={{ position: 'relative' }}>
      <LinearGradient
        colors={homeScreenColor}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* SearchBar + Notification */}

        <SharedHeader/>

        {/* Main Category List */}
        <MainCategories/>

        {/* Carousel */}
        <ImageCarousel />

        {/* Trending Products */}
        <TrendingProducts />

        {/* Products of Today Sales */}
        <TodaySales/>

        {/*Products Filtering */}
        <ProductFiltering/>

      </ScrollView>
    </SafeAreaView>
  );
};


export default Home;
