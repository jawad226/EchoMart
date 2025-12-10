export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  category: string;
  buttonText: string;
}