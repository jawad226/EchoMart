"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { message } from 'antd';

// Types
export interface OrderItemData {
  productName: string;
  quantity: number;
  id: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  street: string;
  apartment?: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber?: string;
  customer: string;
  items: OrderItemData[];
  status: 'Paid' | 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  amount: string;
  date: string;
  quantity: number;
  email?: string;
  shippingAddress?: ShippingAddress;
  paymentMethod?: string;
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
  categoriesData: { id: number; name: string; slug: string }[];

  // Actions
  refreshData: () => Promise<void>;
  addOrder: (order: any) => Promise<boolean>;
  updateOrder: (id: string, order: Partial<Order>) => Promise<boolean>;
  deleteOrder: (id: string) => Promise<boolean>;
  addProduct: (product: any) => Promise<boolean>;
  updateProduct: (id: string | number, product: any) => Promise<boolean>;
  deleteProduct: (id: string | number) => Promise<boolean>;
  addCategory: (category: any) => Promise<boolean>;
  deleteCategory: (id: string | number) => Promise<boolean>;
  addCustomer: (customer: any) => void;
  updateCustomer: (id: string, customer: any) => void;
  deleteCustomer: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { token, user } = useAuth();
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [customersData, setCustomersData] = useState<Customer[]>([]);
  const [categoriesData, setCategoriesData] = useState<{ id: number; name: string; slug: string }[]>([]);

  // Stats
  const [totalSales, setTotalSales] = useState('Rs 0');
  const [orders, setOrders] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [products, setProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch Stats
      const statsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/stats/dashboard`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (statsRes.ok) {
        const stats = await statsRes.json();
        setTotalSales(stats.totalSales);
        setOrders(stats.orders);
        setCustomers(stats.customers);
        setProducts(stats.products);
      }

      // Fetch Categories
      const catRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/categories`);
      if (catRes.ok) {
        const categories = await catRes.json();
        setCategoriesData(categories);
      }

      // Fetch Products
      const productsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/products`);
      if (productsRes.ok) {
        const products = await productsRes.json();
        const mappedProducts = products.map((p: any) => ({
          ...p,
          category: p.category?.name || 'Uncategorized'
        }));
        setProductsData(mappedProducts);
      }

      // Fetch Orders
      const ordersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/orders`);
      let orders = [];
      if (ordersRes.ok) {
        orders = await ordersRes.json();
        const mappedOrders = orders.map((o: any) => ({
          id: o.id.toString(), // Keep true ID for API calls
          orderNumber: o.orderNumber || `#${o.id}`, // Display ID
          customer: o.customer?.name || 'Unknown',
          items: o.items?.map((i: any) => ({
            productName: i.product?.name || 'Unknown Product',
            quantity: i.quantity,
            id: i.id,
            price: i.price || i.product?.price || 0,
            image: i.product?.image || null
          })) || [],
          status: o.status,
          amount: `Rs ${(o.totalAmount || 0).toLocaleString()}`,
          date: o.date.split('T')[0],
          quantity: o.items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0,
          email: o.customer?.email,
          shippingAddress: o.shippingAddress,
          paymentMethod: o.paymentMethod
        }));
        setOrdersData(mappedOrders);
      }

      // Fetch Customers (Users)
      console.log('Fetching customers...');
      const usersRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/user`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (usersRes.ok) {
        const users = await usersRes.json();
        console.log('Customers fetched:', users.length);
        const mappedCustomers = users.map((u: any) => ({
          id: u.id.toString(),
          name: u.name,
          email: u.email,
          orders: orders.filter((o: any) => o.customer?.id === u.id).length,
          totalSpent: `Rs ${(u.totalSpent || 0).toLocaleString()}`,
          joinDate: u.joinDate || 'N/A',
          status: u.status as 'Active' | 'Inactive'
        }));
        setCustomersData(mappedCustomers);
      } else {
        console.error('Failed to fetch customers:', usersRes.status);
      }

    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user?.role === 'admin') {
      fetchDashboardData();
    }
  }, [token, user]);

  const refreshData = async () => {
    await fetchDashboardData();
  };

  // Product actions - Persistence Implementation
  const addProduct = async (product: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to add product:", err);
      return false;
    }
  };

  const updateProduct = async (id: string | number, updates: any) => {
    try {
      console.log('Updating product:', id, updates);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/products/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        console.log('Update successful');
        await refreshData();
        return true;
      } else {
        const errData = await res.json();
        console.error('Update failed:', errData);
        return false;
      }
    } catch (err) {
      console.error("Failed to update product:", err);
      return false;
    }
  };

  const deleteProduct = async (id: string | number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/products/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to delete product:", err);
      return false;
    }
  };

  // Category actions
  const addCategory = async (category: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(category),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to add category:", err);
      return false;
    }
  };

  const deleteCategory = async (id: string | number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/categories/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to delete category:", err);
      return false;
    }
  };

  // Order actions
  const addOrder = async (order: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (res.ok) {
        await refreshData();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Failed to add order:", err);
      return false;
    }
  };

  const updateOrder = async (id: string, updates: Partial<Order>) => {
    try {
      // Logic refactored: ID is now the DB ID, no need to strip #

      // Call backend API if status is being updated
      if (updates.status) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/orders/${id}/status`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ status: updates.status }),
        });

        if (!res.ok) {
          const errData = await res.json();
          console.error('Failed to update order status:', errData);
          message.error(`Failed to update status: ${errData.message || 'Unknown error'}`);
          return false;
        }
      }

      // Optimistic update + Refresh
      setOrdersData(ordersData.map(order => order.id === id ? { ...order, ...updates } : order));
      await refreshData();
      return true;
    } catch (err) {
      console.error("Failed to update order:", err);
      message.error("Failed to update order. Check console for details.");
      return false;
    }
  };

  const deleteOrder = async (id: string) => {
    // Backend delete for orders not fully implemented yet
    setOrdersData(ordersData.filter(order => order.id !== id));
    return true;
  };

  // Customer actions (Stubs)
  const addCustomer = () => { };
  const updateCustomer = () => { };
  const deleteCustomer = () => { };

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
        categoriesData,
        refreshData,
        addOrder,
        updateOrder,
        deleteOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        deleteCategory,
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

