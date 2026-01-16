import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { singleProductScreenColor } from '../colors/Colors';
import { RootStackParamList } from '../navigation_types/NavigationTypes';
import { getUser } from '../supabase/SupabaseClient';
import useAddToCart from '../view-models/hooks/useAddToCart';
import useProductById from '../view-models/hooks/useProductById';
import useProducts from '../view-models/hooks/useProducts';
import ProductList from '../components/ProductList';
import ProgressBar from '../components/ProgressBar';
import Review from '../components/Reviews';
import SharedHeader from '../components/SharedHeader';
import CXGenieWidget from '../components/CXGenieWidget';
const { width, height} = Dimensions.get('window');
const size = width * 0.4;

const SingleProduct: React.FC = (): React.JSX.Element => {
  const route = useRoute<RouteProp<RootStackParamList, 'SingleProduct'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { id } = route.params;

  const { product, loading, error } = useProductById(id);
  const { products } = useProducts(`similar/${id}`);
  const [chatVisible, setChatVisible] = useState<boolean>(false);
  const { addToCart, loading: cartLoading, error: cartError, success } = useAddToCart();

  const handleAddToCart = async () => {
    const { data: { user }, error } = await getUser();

    if (error || !user) {
      return Alert.alert('Please login to add to cart');
    }

    if (!product || !product.id || !product.images?.length) {
      Alert.alert('Product data incomplete');
      return;
    }

    const uid = user?.id;

    await addToCart({
      user_uid: uid,
      product_id: parseInt(product?.id as string),
      img_url: product?.images[0] as string,
      quantity: 1,
      price: parseFloat(product?.price as string),
    });

    if (success) {
      Alert.alert('✅ Added to cart');
    } else if (cartError) {
      Alert.alert('❌ ' + cartError);
    }
  };



  if (loading) {
    return (
      <SafeAreaView className="bg-[#033c4f] flex-1 justify-center items-center">
        <ProgressBar />
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <View className="flex-1 justify-center items-center px-4">
        <Text className="text-green-700 text-lg text-center">
          {error ?? 'Product not found.'}
        </Text>
      </View>
    );
  }

  const images = product?.images?.length ? product.images : [product.thumbnail];

  return (
    <LinearGradient
      colors={singleProductScreenColor}
      className="flex-1 relative">
      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-6 left-4 z-10 bg-white rounded-full p-2 shadow-lg"
        style={{ elevation: 5 }}>
        <Icon name="arrow-back" size={22} color="#0000FF" />
      </TouchableOpacity>

      <ScrollView
        className="px-4 pt-20"
        contentContainerStyle={{ paddingBottom: 180 }}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView>
          <SharedHeader />
        </SafeAreaView>

        <View className="mb-4">
          {images.length === 1 ? (
            <Image
              source={{ uri: images[0] }}
              style={{
                width: width - 40,
                height: width * 0.9,
                borderRadius: 20,
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />
          ) : (
            <FlatList
              data={images}
              horizontal
              pagingEnabled
              keyExtractor={(_item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Image
                  source={{ uri: item }}
                  style={{
                    width: width - 40,
                    height: width * 0.8,
                    borderRadius: 20,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    marginRight: 10,
                  }}
                />
              )}
              contentContainerStyle={{
                alignItems: 'center',
                paddingVertical: 10,
              }}
            />
          )}
        </View>

        <Text className="text-white text-4xl font-bold">{product?.title}</Text>
        <Text className="text-white text-xl mt-2 font-semibold opacity-90">
          by {product?.brand ?? 'Unknown'}
        </Text>

        <View className="mt-3">
          <Text className="bg-white/20 text-white px-3 py-1 rounded-full self-start text-xl font-extrabold">
            {product?.category}
          </Text>
        </View>

        <View className="mt-4 flex-row items-center justify-between">
          <Text className="text-white text-2xl font-medium">
            Rating: ⭐ {product?.rating}
          </Text>
          <Text className="text-white text-2xl font-bold">
            Price: ${product?.price}
          </Text>
        </View>

        <Text className="text-white mt-5 leading-7 text-[16px] font-semibold">
          {product?.description}
        </Text>

        <View className="mt-4">
          <Text className="text-white text-lg font-bold">
            SKU: {product?.sku}
          </Text>
          <Text className="text-white text-lg font-bold">
            Stock: {product?.stock}
          </Text>
          <Text className="text-white text-lg font-bold">
            Discount: {product?.discountpercentage}%
          </Text>
        </View>

        <View className="mt-4">
          <Text className="text-white text-lg font-semibold">
            Availability: {product?.availabilitystatus}
          </Text>
          <Text className="text-white text-lg font-semibold">
            Min Order: {product?.minimumorderquantity} unit(s)
          </Text>
        </View>

        <View className="mt-4">
          <View className="flex flex-row items-center">
            <Text className="text-white text-lg font-semibold">
              Dimensions (L×W×H): {product?.dimensions?.depth}×
              {product?.dimensions?.width}×{product?.dimensions?.height} cm
            </Text>
            <Text className="text-sm text-white relative" style={{ top: -6 }}>
              3
            </Text>
          </View>
          <Text className="text-white text-lg font-semibold">
            Weight: {product?.weight} kg
          </Text>
        </View>

        <View className="mt-4">
          <Text className="text-white text-lg font-extrabold">
            Barcode: {product?.meta?.barcode}
          </Text>
          <Text className="text-white text-lg font-extrabold">QR Code:</Text>
          <Image
            source={{ uri: product?.meta?.qrCode }}
            style={{
              width: size,
              height: size,
              borderRadius: 8,
              resizeMode: 'contain',
            }}
          />
        </View>

        <TouchableOpacity
          className="mt-8 bg-blue-700 py-4 rounded-xl"
          onPress={handleAddToCart}
          disabled={cartLoading}>
          <Text className="text-center text-xl font-bold text-white">
            {cartLoading ? 'Adding...' : 'Add to Cart'}
          </Text>
        </TouchableOpacity>

        <SafeAreaView className="mt-4">
          <Review productId={parseInt(id)} />
        </SafeAreaView>



        <View className="mt-8">
          <ProductList
            title="See Similar Products"
            products={products}
            loading={loading}
            error={error}
            gradientColors={['#116466', '#1c1c1c']}
          />
        </View>

  
      </ScrollView>
         {/* Floating Chat Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20,
          backgroundColor: '#0E3073',
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
        onPress={() => setChatVisible(true)}
      >
        <Icon name="chatbubble-ellipses" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Modal for Chat Widget */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={chatVisible}
        onRequestClose={() => setChatVisible(false)}
      >
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: width - 40,
              height: height * 0.7,
              backgroundColor: '#fff',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            {/* Close Button */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                zIndex: 10,
              }}
              onPress={() => setChatVisible(false)}
            >
              <Icon name="close-circle" size={28} color="#007AFF" />
            </TouchableOpacity>

            {/* WebView Chat Widget */}
            <CXGenieWidget />
          </View>
        </SafeAreaView>
      </Modal>
    </LinearGradient>
  );
};

export default SingleProduct;
