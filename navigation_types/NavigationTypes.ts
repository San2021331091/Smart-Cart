
export type RootStackParamList = {
  Login: { };
  Signup: { };
  ForgotPassword: { };
  AuthLoading: { };
  Main: { };
  Cart: { };
  AIChat: { };
  Profile: { };
  SingleProduct: { id: string };
  Confirmation: {
    subtotal: number;
    itemCount: number;
  };
  Address: { };
  Delivery: { };
  Payment: {
    paymentMethod: 'visa' | 'mastercard';
  };
  PlaceOrder: { };
  Gift:{};
  Search: { };
  Notification: { };
  YourOrders: { };
};

export type BottomTabParamList = {
  Home: undefined;
  Products: undefined;
  Profile: undefined;
  Cart: undefined;
  AIChat: undefined;
};