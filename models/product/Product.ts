export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  discountpercentage: string;
  rating: string;
  stock: string;
  tags: string[];
  brand: string;
  sku: string;
  weight: string;
  dimensions: {
    depth: number;
    width: number;
    height: number;
  };
  availabilitystatus: string;
  minimumorderquantity: string;
  meta: {
    qrCode: string;
    barcode: string;
    createdAt: string;
    updatedAt: string;
    [key: string]: any;
  };
  images: string[];
  thumbnail: string;

}

export interface ProductListProps {
  title: string;
  products: Product[];
  loading: boolean;
  error: string | null;
  gradientColors: string[];
}

