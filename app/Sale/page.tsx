// components/SalePage.tsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  brand: string;
  rating: number;
  image: string;
  discount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  sold?: number;
  stock: number;
  features?: string[];
};

const saleProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Earbuds Pro with ANC",
    price: 159,
    originalPrice: 249,
    category: "earbuds",
    brand: "Apple",
    rating: 4.8,
    image: "/products/airpods-pro.jpg",
    discount: 36,
    isFeatured: true,
    sold: 124,
    stock: 15,
    features: ["Active Noise Cancellation", "Spatial Audio", "6hr battery"]
  },
  {
    id: 2,
    name: "Premium Noise Cancelling Headphones",
    price: 279,
    originalPrice: 399,
    category: "headphones",
    brand: "Sony",
    rating: 4.9,
    image: "/products/sony-headphones.jpg",
    discount: 30,
    isBestSeller: true,
    sold: 89,
    stock: 8,
    features: ["Industry-leading ANC", "30hr battery", "Quick Charge"]
  },
  {
    id: 3,
    name: "USB-C GaN Fast Charging Adaptor",
    price: 22,
    originalPrice: 39,
    category: "adaptor",
    brand: "Anker",
    rating: 4.7,
    image: "/products/usbc-adaptor.jpg",
    discount: 44,
    sold: 256,
    stock: 42,
    features: ["65W PD", "GaN Technology", "Compact Design"]
  },
  {
    id: 4,
    name: "iPhone 15 Pro Max Protective Case",
    price: 19,
    originalPrice: 29,
    category: "mobile-phone-case",
    brand: "Spigen",
    rating: 4.6,
    image: "/products/iphone-case.jpg",
    discount: 34,
    sold: 178,
    stock: 23,
    features: ["Military Protection", "Wireless Charging", "Slim Fit"]
  },
  {
    id: 5,
    name: "Pro Gaming Headset with RGB",
    price: 99,
    originalPrice: 159,
    category: "headphones",
    brand: "Razer",
    rating: 4.5,
    image: "/products/razer-headset.jpg",
    discount: 38,
    isBestSeller: true,
    sold: 67,
    stock: 12,
    features: ["7.1 Surround Sound", "Retractable Mic", "RGB Lighting"]
  },
  {
    id: 6,
    name: "4-Port USB-C Charging Hub",
    price: 39,
    originalPrice: 59,
    category: "adaptor",
    brand: "UGREEN",
    rating: 4.5,
    image: "/products/multi-port-hub.jpg",
    discount: 34,
    sold: 143,
    stock: 18,
    features: ["4 Ports", "100W Total", "LED Indicator"]
  },
  {
    id: 7,
    name: "Sports Wireless Earbuds - Waterproof",
    price: 59,
    originalPrice: 99,
    category: "earbuds",
    brand: "JBL",
    rating: 4.4,
    image: "/products/jbl-earbuds.jpg",
    discount: 40,
    sold: 92,
    stock: 25,
    features: ["Secure Fit", "Sweatproof", "25hr battery"]
  },
  {
    id: 8,
    name: "Rugged Protective Case - Military Grade",
    price: 27,
    originalPrice: 39,
    category: "mobile-phone-case",
    brand: "OtterBox",
    rating: 4.7,
    image: "/products/rugged-case.jpg",
    discount: 31,
    isFeatured: true,
    sold: 201,
    stock: 9,
    features: ["Drop Protection", "Screen Protection", "Durable"]
  },
  {
    id: 9,
    name: "Fast Wireless Charging Pad",
    price: 28,
    originalPrice: 45,
    category: "adaptor",
    brand: "Samsung",
    rating: 4.4,
    image: "/products/wireless-pad.jpg",
    discount: 38,
    sold: 134,
    stock: 31,
    features: ["15W Fast Charge", "LED Indicator", "Non-slip"]
  },
  {
    id: 10,
    name: "Studio Monitor Headphones Pro",
    price: 119,
    originalPrice: 189,
    category: "headphones",
    brand: "Audio-Technica",
    rating: 4.7,
    image: "/products/studio-headphones.jpg",
    discount: 37,
    sold: 56,
    stock: 14,
    features: ["Reference Sound", "Comfort Fit", "Detachable Cable"]
  },
  {
    id: 11,
    name: "Crystal Clear Phone Case",
    price: 12,
    originalPrice: 19,
    category: "mobile-phone-case",
    brand: "ESR",
    rating: 4.3,
    image: "/products/clear-case.jpg",
    discount: 37,
    sold: 287,
    stock: 47,
    features: ["Crystal Clear", "Yellowing Resistant", "Easy Install"]
  },
  {
    id: 12,
    name: "Budget TWS Earbuds with Touch Control",
    price: 29,
    originalPrice: 49,
    category: "earbuds",
    brand: "Realme",
    rating: 4.2,
    image: "/products/realme-earbuds.jpg",
    discount: 41,
    isBestSeller: true,
    sold: 312,
    stock: 38,
    features: ["Low Latency", "20hr battery", "Touch Control"]
  }
];

// Real SVG Icons Component
const RealIcons = {
  Headphones: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Earbuds: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  ),
  Adaptor: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  PhoneCase: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  ShoppingCart: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  Star: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
  Fire: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
    </svg>
  ),
  Clock: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Filter: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  ),
  CheckCircle: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Plus: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
    </svg>
  ),
  ChevronDown: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  Tag: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  ),
  TrendingUp: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
  ShieldCheck: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Zap: ({ className = "w-5 h-5" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
};

export default function SalePage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(saleProducts);
  const [filters, setFilters] = useState({
    category: "all",
    discountRange: "all",
    sortBy: "discount",
  });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Countdown timer - Sale ends in 3 days
  useEffect(() => {
    const saleEndDate = new Date();
    saleEndDate.setDate(saleEndDate.getDate() + 3);
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = saleEndDate.getTime() - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);

    return () => clearInterval(timer);
  }, []);

  const categories = [
    { value: "all", label: "All Categories", icon: "ShoppingCart" },
    { value: "earbuds", label: "Earbuds", icon: "Earbuds" },
    { value: "headphones", label: "Headphones", icon: "Headphones" },
    { value: "adaptor", label: "Adaptors", icon: "Adaptor" },
    { value: "mobile-phone-case", label: "Phone Cases", icon: "PhoneCase" },
  ];

  const discountRanges = [
    { value: "all", label: "All Discounts" },
    { value: "30-40", label: "30% - 40% Off" },
    { value: "40-50", label: "40% - 50% Off" },
    { value: "50+", label: "50%+ Off" },
  ];

  const sortOptions = [
    { value: "discount", label: "Highest Discount", icon: "TrendingUp" },
    { value: "price-low", label: "Price: Low to High", icon: "Tag" },
    { value: "price-high", label: "Price: High to Low", icon: "Tag" },
    { value: "rating", label: "Highest Rated", icon: "Star" },
    { value: "popular", label: "Most Popular", icon: "Fire" },
  ];

  useEffect(() => {
    let result = [...saleProducts];

    // Category filter
    if (filters.category !== "all") {
      result = result.filter(product => product.category === filters.category);
    }

    // Discount range filter
    if (filters.discountRange !== "all") {
      switch (filters.discountRange) {
        case "30-40":
          result = result.filter(product => product.discount >= 30 && product.discount < 40);
          break;
        case "40-50":
          result = result.filter(product => product.discount >= 40 && product.discount < 50);
          break;
        case "50+":
          result = result.filter(product => product.discount >= 50);
          break;
      }
    }

    // Sorting
    switch (filters.sortBy) {
      case "price-low":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = result.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        result = result.sort((a, b) => b.discount - a.discount);
        break;
      case "rating":
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        result = result.sort((a, b) => (b.sold || 0) - (a.sold || 0));
        break;
      default:
        result = result.sort((a, b) => b.discount - a.discount);
        break;
    }

    setFilteredProducts(result);
  }, [filters]);

  const getCategoryIcon = (value: string) => {
    const category = categories.find(cat => cat.value === value);
    if (!category || !RealIcons[category.icon as keyof typeof RealIcons]) return null;
    const IconComponent = RealIcons[category.icon as keyof typeof RealIcons];
    return <IconComponent className="w-4 h-4" />;
  };

  const getStockStatus = (stock: number) => {
    if (stock > 20) return { text: "In Stock", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" };
    if (stock > 10) return { text: "Low Stock", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" };
    return { text: "Almost Gone", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200" };
  };

  const getProgressColor = (percentage: number) => {
    if (percentage > 70) return "bg-rose-500";
    if (percentage > 40) return "bg-amber-500";
    return "bg-emerald-500";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading amazing deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Professional Sale Header Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-rose-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Sale Badge */}
            <div className="inline-flex items-center justify-center space-x-2 mb-6 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <RealIcons.Fire className="w-5 h-5 text-amber-300" />
              <span className="text-lg font-semibold">FLASH SALE</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Mega Electronics
              <span className="block text-white/90 mt-2">Sale Event</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Exclusive discounts on premium electronics. Limited time offers with massive savings across all categories.
            </p>

            {/* Countdown Timer */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 max-w-4xl mx-auto border border-white/20">
              <p className="text-lg mb-6 font-medium flex items-center justify-center">
                <RealIcons.Clock className="w-5 h-5 mr-2" />
                Sale Ends In:
              </p>
              <div className="flex justify-center space-x-4 md:space-x-8">
                {[
                  { value: timeLeft.days, label: 'Days', color: 'bg-blue-500' },
                  { value: timeLeft.hours, label: 'Hours', color: 'bg-purple-500' },
                  { value: timeLeft.minutes, label: 'Minutes', color: 'bg-rose-500' },
                  { value: timeLeft.seconds, label: 'Seconds', color: 'bg-amber-500' }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className={`${item.color} rounded-xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-lg`}>
                      <span className="text-2xl md:text-3xl font-bold text-white">{item.value}</span>
                    </div>
                    <span className="text-sm mt-2 block text-white/80">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12 text-slate-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="currentColor"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="currentColor"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { value: saleProducts.length, label: 'Products on Sale', icon: 'ShoppingCart', color: 'text-blue-600' },
              { value: `${Math.max(...saleProducts.map(p => p.discount))}%`, label: 'Maximum Discount', icon: 'Tag', color: 'text-purple-600' },
              { value: `${saleProducts.reduce((acc, product) => acc + (product.sold || 0), 0)}+`, label: 'Items Sold', icon: 'Fire', color: 'text-rose-600' },
              { value: '3', label: 'Days Left', icon: 'Clock', color: 'text-amber-600' }
            ].map((stat, index) => {
              const IconComponent = RealIcons[stat.icon as keyof typeof RealIcons];
              return (
                <div key={index} className="text-center">
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-slate-600 text-xs flex items-center justify-center space-x-1">
                    <IconComponent className="w-3 h-3" />
                    <span>{stat.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                  <RealIcons.Filter className="w-5 h-5 mr-2" />
                  Filter Products
                </h3>
                <button
                  onClick={() => setFilters({ category: "all", discountRange: "all", sortBy: "discount" })}
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Clear All
                </button>
              </div>
              
              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-slate-900 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.value}
                      onClick={() => setFilters(prev => ({ ...prev, category: category.value }))}
                      className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-all ${
                        filters.category === category.value 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {getCategoryIcon(category.value)}
                      <span className="text-sm">{category.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Discount Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-slate-900 mb-3">Discount Range</h4>
                <div className="space-y-2">
                  {discountRanges.map(range => (
                    <button
                      key={range.value}
                      onClick={() => setFilters(prev => ({ ...prev, discountRange: range.value }))}
                      className={`w-full text-left p-2 rounded-lg transition-all text-sm ${
                        filters.discountRange === range.value 
                          ? 'bg-purple-50 text-purple-700 border border-purple-200' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <h4 className="font-medium text-slate-900 mb-2">Quick Stats</h4>
                <div className="space-y-1 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Total Products:</span>
                    <span className="font-medium">{saleProducts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Discount:</span>
                    <span className="font-medium text-green-600">
                      {Math.round(saleProducts.reduce((acc, p) => acc + p.discount, 0) / saleProducts.length)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Savings:</span>
                    <span className="font-medium text-rose-600">
                      ${saleProducts.reduce((acc, p) => acc + (p.originalPrice - p.price), 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hot Deals Sidebar */}
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-xl p-5 mt-6 border border-rose-200">
              <h4 className="font-semibold text-rose-900 mb-3 flex items-center">
                <RealIcons.Fire className="w-5 h-5 mr-2 text-rose-600" />
                Hot Deals
              </h4>
              <div className="space-y-3">
                {saleProducts
                  .filter(p => p.isBestSeller || p.isFeatured)
                  .slice(0, 3)
                  .map(product => (
                    <div key={product.id} className="bg-white rounded-lg p-3 border border-rose-100 hover:shadow transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-orange-100 rounded-lg flex items-center justify-center">
                          <span className="text-xs font-bold text-rose-600">-{product.discount}%</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
                          <div className="flex items-center space-x-1 mt-0.5">
                            <span className="text-sm font-bold text-rose-600">${product.price}</span>
                            <span className="text-xs text-slate-500 line-through">${product.originalPrice}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Filter Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-50 rounded-lg px-3 py-1.5 border border-blue-200">
                    <span className="text-blue-700 font-medium text-sm">
                      {filteredProducts.length} deals found
                    </span>
                  </div>
                  
                  {/* Active Filters */}
                  {(filters.category !== "all" || filters.discountRange !== "all") && (
                    <div className="flex items-center space-x-2">
                      {filters.category !== "all" && (
                        <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full border border-slate-300 flex items-center space-x-1">
                          {getCategoryIcon(filters.category)}
                          <span>{categories.find(c => c.value === filters.category)?.label}</span>
                          <button
                            onClick={() => setFilters(prev => ({ ...prev, category: "all" }))}
                            className="ml-1 hover:text-rose-600 transition-colors"
                          >
                            ×
                          </button>
                        </span>
                      )}
                      {filters.discountRange !== "all" && (
                        <span className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded-full border border-slate-300">
                          {discountRanges.find(r => r.value === filters.discountRange)?.label}
                          <button
                            onClick={() => setFilters(prev => ({ ...prev, discountRange: "all" }))}
                            className="ml-1 hover:text-rose-600 transition-colors"
                          >
                            ×
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    className="appearance-none bg-white border border-slate-300 rounded-lg px-3 py-2 pr-8 text-slate-700 text-sm font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <RealIcons.ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="text-slate-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No deals found</h3>
                <p className="text-slate-600 mb-4 max-w-sm mx-auto">
                  Try adjusting your filters to discover amazing deals.
                </p>
                <button
                  onClick={() => setFilters({ category: "all", discountRange: "all", sortBy: "discount" })}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Show All Deals
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => {
                  const stockStatus = getStockStatus(product.stock);
                  const soldPercentage = Math.min(100, ((product.sold || 0) / ((product.sold || 0) + product.stock)) * 100);
                  
                  return (
                    <div key={product.id} className="group">
                      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 hover:border-blue-300">
                        <div className="relative">
                          {/* Discount Badge */}
                          <div className="absolute top-3 left-3 z-10">
                            <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                              {product.discount}% OFF
                            </div>
                          </div>

                          {/* Product Badges */}
                          <div className="absolute top-3 right-3 z-10 flex flex-col space-y-1">
                            {product.isFeatured && (
                              <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                                Featured
                              </span>
                            )}
                            {product.isBestSeller && (
                              <span className="bg-gradient-to-r from-amber-500 to-orange-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                                Best Seller
                              </span>
                            )}
                          </div>

                          {/* Product Image Area */}
                          <div className="aspect-square bg-gradient-to-br from-slate-50 to-blue-50 rounded-t-xl flex items-center justify-center p-8">
                            <div className="text-center">
                              <div className="w-20 h-20 bg-white/50 rounded-xl mx-auto mb-4 flex items-center justify-center backdrop-blur-sm border border-white/20">
                                <div className="text-slate-700">
                                  <RealIcons.ShieldCheck className="w-8 h-8 mx-auto" />
                                </div>
                              </div>
                              <span className="text-slate-700 text-sm font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full">
                                {product.brand}
                              </span>
                            </div>

                            {/* Stock Progress Bar */}
                            <div className="absolute bottom-0 left-0 right-0 bg-slate-200 h-2 rounded-b-lg overflow-hidden">
                              <div 
                                className={`h-2 transition-all duration-1000 ${getProgressColor(soldPercentage)}`}
                                style={{ width: `${soldPercentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className="p-5">
                          {/* Brand and Rating */}
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-500 uppercase font-medium tracking-wide">{product.brand}</span>
                            <div className="flex items-center space-x-1 bg-slate-100 px-2 py-1 rounded-full">
                              <RealIcons.Star className="w-3 h-3 text-amber-400" />
                              <span className="text-xs font-semibold text-slate-700">{product.rating}</span>
                            </div>
                          </div>

                          {/* Product Name */}
                          <h3 className="font-semibold text-slate-900 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>

                          {/* Features */}
                          {product.features && (
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-1.5">
                                {product.features.slice(0, 2).map((feature, index) => (
                                  <span key={index} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Price Section */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-baseline space-x-2">
                              <span className="text-2xl font-bold text-slate-900">${product.price}</span>
                              <span className="text-sm text-slate-500 line-through">${product.originalPrice}</span>
                              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                                Save ${product.originalPrice - product.price}
                              </span>
                            </div>
                          </div>

                          {/* Stock and Sales Info */}
                          <div className="flex items-center justify-between mb-4 text-sm">
                            <span className={`px-2 py-1 rounded-md ${stockStatus.bg} ${stockStatus.color} border ${stockStatus.border} font-medium`}>
                              {stockStatus.text} • {product.stock} left
                            </span>
                            {product.sold && (
                              <span className="text-slate-500">{product.sold} sold</span>
                            )}
                          </div>

                          {/* Add to Cart Button */}
                          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md flex items-center justify-center space-x-2">
                            <RealIcons.Plus className="w-4 h-4" />
                            <span>Add to Cart - Save ${product.originalPrice - product.price}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Sale Banner Bottom */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-rose-600 rounded-xl p-8 text-white text-center mt-12 overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-10"></div>
              
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  Limited Time Double Discount!
                </h3>
                <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
                  Get an extra 10% off on orders above $200. Limited stock available.
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 inline-block border border-white/20">
                  <span className="text-lg font-bold">Use code: </span>
                  <span className="text-lg font-bold bg-white text-blue-600 px-3 py-1 rounded">SALE10</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Shop Now & Save Big
                  </button>
                  <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    View All Hot Deals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}