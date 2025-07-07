import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

// Screens
import Login from '../views/screens/Login';
import Register from '../views/screens/Register';
import AuthLoading from '../views/screens/AuthLoading';
import Home from '../views/screens/Home';
import Products from '../views/screens/Products';
import Profile from '../views/screens/Profile';
import Cart from '../views/screens/Cart';
import AIChat from '../views/screens/AIChat';
import SingleProduct from '../views/screens/SingleProduct';
import Confirmation from '../views/screens/Confirmation';
import Address from '../views/screens/Address';
import Delivery from '../views/screens/Delivery';
import Payment from '../views/screens/Payment';
import PlaceOrder from '../views/screens/PlaceOrder';
import Gift from '../views/screens/Gift';
import Search from '../views/screens/Search';
import Notification from '../views/screens/Notification';
// Navigation types and colors
import { BottomTabParamList, RootStackParamList } from '../navigation_types/NavigationTypes';
import { bottomTabColor } from '../colors/Colors';

import {useCart} from '../view-models/hooks/useCart';
import YourOrders from '../views/screens/YourOrders';


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
