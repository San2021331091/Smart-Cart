import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Product, ProductListProps } from '../../models/product/Product.ts';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation_types/NavigationTypes.ts';
import ProgressBar from './ProgressBar.tsx';

const ProductList: React.FC<ProductListProps> = ({
                                                   title,
                                                   products,
                                                   loading,
                                                   error,
                                                   gradientColors,
                                                 }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderItem = ({ item }: { item: Product }): React.JSX.Element => (
    <TouchableOpacity
      className="rounded-xl shadow-md w-64 overflow-hidden"
      onPress={():void => navigation.navigate('SingleProduct', { id: item?.id })}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="p-3 rounded-xl"
      >
        <Image
          source={{ uri: item?.thumbnail }}
          className="h-48 w-full rounded-md"
          resizeMode="cover"
        />
        <Text className="text-2xl font-bold text-white mt-2" numberOfLines={1}>
          {item?.title}
        </Text>
        <Text className="text-xl text-white">${item?.price}</Text>
        <Text className="text-lg font-bold text-white">⭐ {item?.rating}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ProgressBar/>
    );
  }

  if (error) {
    return (
      <View className="mt-5 px-4">
        <Text className="text-red-500 text-center">{error}</Text>
      </View>
    );
  }

  return (
    <View className="mt-9 px-4">
      <Text className="text-2xl font-bold mb-5 text-white">{title}</Text>
      <FlatList
        data={products || []}
        renderItem={renderItem}
        keyExtractor={(item: Product, index: number): string =>
          item?.id ? item?.id.toString() : index.toString()
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      />
    </View>
  );
};

export default ProductList;
