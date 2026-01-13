import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { productScreenColor } from '../colors/Colors';
import { RootStackParamList } from '../navigation_types/NavigationTypes';
import useProducts from '../view-models/hooks/useProducts';
import ProgressBar from '../components/ProgressBar';
import SharedHeader from '../components/SharedHeader';

const Products = () => {
  const { products, loading, error } = useProducts('products');
  const navigation =  useNavigation<NativeStackNavigationProp<RootStackParamList>>();


  if (loading) {
    return (
    <View className="flex-1 justify-center items-center bg-[#046a48]">
      <ProgressBar/>
    </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-green-950">
        <Text className="text-white">{error}</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={productScreenColor}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}>

        <SafeAreaView className='mt-9'>
          <SharedHeader />
        </SafeAreaView>
        <Text className="text-2xl font-bold text-center m-4 text-white">All Products</Text>
        <View className="flex flex-wrap flex-row justify-between">
          {products.map((product) => (
            <LinearGradient
              key={product?.id}
              colors={['#34e89e', '#0f3443']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: '48%',
                marginBottom: 16,
                padding: 12,
                borderRadius: 16,
                overflow: 'hidden',
              }}
            >
              {/* TouchableOpacity wrapping the Image */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={():void => navigation.navigate('SingleProduct', { id: product?.id })}
                style={{ borderRadius: 12, overflow: 'hidden' }}

              >
                <Image
                  source={{ uri: product?.thumbnail }}
                  resizeMode="contain"
                  className="w-full h-48 rounded-lg mb-2"
                />
              </TouchableOpacity>

              <Text
                className="text-white font-semibold text-2xl"
                numberOfLines={2}
              >
                {product?.title}
              </Text>

              <Text className="text-white text-xl mt-1">
                ${product?.price ? parseFloat(product.price).toFixed(2) : '0.00'} ‧
                ⭐ {product?.rating ?? 'N/A'}
              </Text>
            </LinearGradient>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default Products;
