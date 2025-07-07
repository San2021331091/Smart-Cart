import {Product} from '../product/Product.ts';

export interface Message {
  id: number;
  text: string;
  isUser: boolean;
  products?: Product[] | null;
}