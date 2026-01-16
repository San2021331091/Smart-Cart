import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { homeScreenColor } from '../colors/Colors';
import ImageCarousel from '../components/ImageCarousel';
import ProductFiltering from '../components/ProductFiltering';
import SharedHeader from '../components/SharedHeader';
import TodaySales from '../components/TodaySales';
import TrendingProducts from '../components/TrendingProducts';
import MainCategories from '../components/MainCategories';

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
