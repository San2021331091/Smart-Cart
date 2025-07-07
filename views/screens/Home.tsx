import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CategoryList from '../components/CategoryList.tsx';
import ImageCarousel from '../components/ImageCarousel.tsx';
import TrendingProducts from '../components/TrendingProducts.tsx';
import TodaySales from '../components/TodaySales.tsx';
import ProductFiltering from '../components/ProductFiltering.tsx';
import {homeScreenColor} from '../../colors/Colors.ts';
import SharedHeader from '../components/SharedHeader.tsx';

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

        {/* Category List */}
        <CategoryList />

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
