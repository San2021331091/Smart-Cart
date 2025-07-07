export interface CardInfo{
  cardType: 'visa' | 'mastercard';
  cardNumber: string;
  expiry: string;
  cvv: string;
  email?: string;
  username?: string;
}