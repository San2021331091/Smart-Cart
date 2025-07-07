export interface OrderItem {
  id: number;
  userUid: string;
  productId: number;
  imgUrl: string;
  quantity: number;
  price: number;
  orderedAt: string;
  status: string;
}

export interface OrderItemCreate {
  productId: number;
  quantity: number;
  price: number;
  imgUrl?: string;
}

export interface OrderPayload {
  items: OrderItemCreate[];
  total: number;
}

export interface OrderedItemsProps {
  uid: string;
}