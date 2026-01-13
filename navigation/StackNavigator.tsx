import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Address from '../screens/Address';
import AIChat from '../screens/AIChat';
import AuthLoading from '../screens/AuthLoading';
import Cart from '../screens/Cart';
import Confirmation from '../screens/Confirmation';
import Delivery from '../screens/Delivery';
import Gift from '../screens/Gift';
import Home from '../screens/Home';
import Login from '../screens/Login';
import Notification from '../screens/Notification';
import Payment from '../screens/Payment';
import PlaceOrder from '../screens/PlaceOrder';
import Products from '../screens/Products';
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import Search from '../screens/Search';
import SingleProduct from '../screens/SingleProduct';
// Navigation types and colors
import { bottomTabColor } from '../colors/Colors';
import { BottomTabParamList, RootStackParamList } from '../navigation_types/NavigationTypes';

import YourOrders from '../screens/YourOrders';
import { useCart } from '../view-models/hooks/useCart';


const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

// ✅ BottomTabs with animated badge
const BottomTabs: React.FC<{ activeTab?: string }> = ():React.JSX.Element => {
  const { cartItems } = useCart();
  const badgeScale = useSharedValue(1);

  useEffect(() => {
    if (cartItems.length > 0) {
      badgeScale.value = 1.5;
      badgeScale.value = withSpring(1, { damping: 4, stiffness: 150 });
    }
  }, [cartItems.length]);

  const animatedBadgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
  }));

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          const iconMap: Record<string, [string, string]> = {
            Home: ['home-outline', 'home'],
            Products: ['pricetag-outline', 'pricetag'],
            Profile: ['person-outline', 'person'],
            Cart: ['cart-outline', 'cart'],
            AIChat: ['chatbubble-ellipses-outline', 'chatbubble-ellipses'],
          };

          const [outlineIcon, filledIcon] = iconMap[route.name] || ['help-circle-outline', 'help-circle'];
          const iconName = focused ? filledIcon : outlineIcon;

          const icon = <Ionicons name={iconName} size={28} color={color} />;

          if (route.name === 'Cart') {
            return (
              <View style={{ width: 28, height: 28 }}>
                {icon}
                <Animated.View style={[styles.badgeContainer, animatedBadgeStyle]}>
                  <Text style={styles.badgeText}>
                    {cartItems.length > 99 ? '99+' : cartItems.length}
                  </Text>
                </Animated.View>
              </View>
            );
          }

          return icon;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ddd',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: '600',
        },
        tabBarStyle: {
          height: 75,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 8,
          backgroundColor: 'transparent',
          position: 'absolute',
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={bottomTabColor}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFillObject}
          />
        ),
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Products" component={Products} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="AIChat" component={AIChat} />
    </Tab.Navigator>
  );
};

const StackNavigator: React.FC = (): React.JSX.Element => {
  const [activeTab, setActiveTab] = useState<string>('Home');

  const handleStateChange = (state: NavigationState | undefined) => {
    if (!state) return;

    const currentRoute = state.routes[state.index];
    if (currentRoute.name === 'Main' && 'state' in currentRoute && currentRoute.state) {
      const tabState = currentRoute.state as NavigationState;
      const currentTabName = tabState.routes[tabState.index].name;
      setActiveTab(currentTabName);
    }
  };

  return (
    <NavigationContainer onStateChange={handleStateChange}>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="AuthLoading">
        <Stack.Screen name="AuthLoading" component={AuthLoading} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Register} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="YourOrders" component={YourOrders} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="SingleProduct" component={SingleProduct} />
        <Stack.Screen name="Confirmation" component={Confirmation} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="Delivery" component={Delivery} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="PlaceOrder" component={PlaceOrder} />
        <Stack.Screen name="Gift" component={Gift} />
        <Stack.Screen name="Main">
          {(): React.JSX.Element => <BottomTabs activeTab={activeTab} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 5,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1.8,
    zIndex: 10,
  },
  badgeText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default StackNavigator;
