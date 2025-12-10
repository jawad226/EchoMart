"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export interface Order {
  id: string;
  customer: string;
  product: string;
  status: 'Paid' | 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  amount: string;
  date: string;
  quantity: number;
  email?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  image?: string;
  brand?: string;
  rating?: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: string;
  joinDate: string;
  status: 'Active' | 'Inactive';
}

interface DashboardContextType {
  // Stats
  totalSales: string;
  orders: number;
  customers: number;
  products: number;
  
  // Data
  ordersData: Order[];
  productsData: Product[];
  customersData: Customer[];
  
  // Actions
  addOrder: (order: Order) => void;
  updateOrder: (id: string, order: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, customer: Partial<Customer>) => void;
  deleteCustomer: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Initial Data
const initialOrders: Order[] = [
  { id: '#3221', customer: 'Ali', product: 'Earbuds', status: 'Paid', amount: 'Rs 2,500', date: '2025-12-09', quantity: 1, email: 'ali@example.com' },
  { id: '#3220', customer: 'Sara', product: 'Phone Case', status: 'Pending', amount: 'Rs 700', date: '2025-12-08', quantity: 2, email: 'sara@example.com' },
  { id: '#3219', customer: 'Usman', product: 'Headphones', status: 'Shipped', amount: 'Rs 5,200', date: '2025-12-07', quantity: 1, email: 'usman@example.com' },
  { id: '#3218', customer: 'Fatima', product: 'Adaptor', status: 'Delivered', amount: 'Rs 1,200', date: '2025-12-06', quantity: 3, email: 'fatima@example.com' },
  { id: '#3217', customer: 'Ahmed', product: 'Earbuds', status: 'Paid', amount: 'Rs 2,500', date: '2025-12-05', quantity: 1, email: 'ahmed@example.com' },
  { id: '#3216', customer: 'Zainab', product: 'Headphones', status: 'Shipped', amount: 'Rs 5,200', date: '2025-12-04', quantity: 1, email: 'zainab@example.com' },
];

const initialProducts: Product[] = [
  { id: '1', name: 'Mobile Phone Case', category: 'MobilePhoneCase', price: 700, stock: 150, sold: 520, brand: 'Spigen', rating: 4.6 },
  { id: '2', name: 'Earbuds', category: 'Earbuds', price: 2500, stock: 200, sold: 420, brand: 'Apple', rating: 4.8 },
  { id: '3', name: 'Adaptor', category: 'Adaptor', price: 1200, stock: 300, sold: 310, brand: 'Anker', rating: 4.7 },
  { id: '4', name: 'Headphones', category: 'Headphones', price: 5200, stock: 80, sold: 275, brand: 'Sony', rating: 4.9 },
];

const initialCustomers: Customer[] = [
  { id: '1', name: 'Ali', email: 'ali@example.com', orders: 5, totalSpent: 'Rs 12,500', joinDate: '2025-01-15', status: 'Active' },
  { id: '2', name: 'Sara', email: 'sara@example.com', orders: 3, totalSpent: 'Rs 8,200', joinDate: '2025-02-20', status: 'Active' },
  { id: '3', name: 'Usman', email: 'usman@example.com', orders: 8, totalSpent: 'Rs 25,600', joinDate: '2024-11-10', status: 'Active' },
  { id: '4', name: 'Fatima', email: 'fatima@example.com', orders: 2, totalSpent: 'Rs 3,400', joinDate: '2025-03-05', status: 'Active' },
  { id: '5', name: 'Ahmed', email: 'ahmed@example.com', orders: 12, totalSpent: 'Rs 45,000', joinDate: '2024-08-22', status: 'Active' },
  { id: '6', name: 'Zainab', email: 'zainab@example.com', orders: 4, totalSpent: 'Rs 15,800', joinDate: '2025-04-12', status: 'Active' },
];

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [ordersData, setOrdersData] = useState<Order[]>(initialOrders);
  const [productsData, setProductsData] = useState<Product[]>(initialProducts);
  const [customersData, setCustomersData] = useState<Customer[]>(initialCustomers);

  // Calculate stats
  const totalSales = 'Rs 450,000';
  const orders = ordersData.length;
  const customers = customersData.length;
  const products = productsData.length;

  // Order actions
  const addOrder = (order: Order) => {
    setOrdersData([order, ...ordersData]);
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrdersData(ordersData.map(order => 
      order.id === id ? { ...order, ...updates } : order
    ));
  };

  const deleteOrder = (id: string) => {
    setOrdersData(ordersData.filter(order => order.id !== id));
  };

  // Product actions
  const addProduct = (product: Product) => {
    setProductsData([...productsData, product]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProductsData(productsData.map(product => 
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProductsData(productsData.filter(product => product.id !== id));
  };

  // Customer actions
  const addCustomer = (customer: Customer) => {
    setCustomersData([...customersData, customer]);
  };

  const updateCustomer = (id: string, updates: Partial<Customer>) => {
    setCustomersData(customersData.map(customer => 
      customer.id === id ? { ...customer, ...updates } : customer
    ));
  };

  const deleteCustomer = (id: string) => {
    setCustomersData(customersData.filter(customer => customer.id !== id));
  };

  return (
    <DashboardContext.Provider
      value={{
        totalSales,
        orders,
        customers,
        products,
        ordersData,
        productsData,
        customersData,
        addOrder,
        updateOrder,
        deleteOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        addCustomer,
        updateCustomer,
        deleteCustomer,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}

