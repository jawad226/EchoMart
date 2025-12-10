"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  rating: number;
  image: string;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
  features?: string[];
};

const earbudsData: Product[] = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    price: 199,
    originalPrice: 249,
    category: "earbuds",
    brand: "Apple",
    rating: 4.8,
    image: "/products/airpods-pro.jpg",
    isNew: true,
    discount: 20,
    features: ["Active Noise Cancellation", "Spatial Audio", "6hr battery"]
  },
  {
    id: 2,
    name: "Noise Cancelling Earbuds",
    price: 149,
    category: "earbuds",
    brand: "Sony",
    rating: 4.6,
    image: "/products/sony-earbuds.jpg",
    isFeatured: true,
    features: ["ANC", "30hr battery", "IPX4 Waterproof"]
  },
  {
    id: 3,
    name: "Sports Wireless Earbuds",
    price: 79,
    originalPrice: 99,
    category: "earbuds",
    brand: "JBL",
    rating: 4.4,
    image: "/products/jbl-earbuds.jpg",
    discount: 20,
    features: ["Secure Fit", "Sweatproof", "25hr battery"]
  },
  {
    id: 4,
    name: "Budget TWS Earbuds",
    price: 39,
    category: "earbuds",
    brand: "Realme",
    rating: 4.2,
    image: "/products/realme-earbuds.jpg",
    features: ["Low Latency", "20hr battery", "Touch Control"]
  },
  {
    id: 5,
    name: "Premium Sound Earbuds",
    price: 179,
    category: "earbuds",
    brand: "Sennheiser",
    rating: 4.7,
    image: "/products/sennheiser-earbuds.jpg",
    features: ["Hi-Fi Sound", "NoiseGard", "7hr battery"]
  },
  {
    id: 6,
    name: "Gaming Earbuds Pro",
    price: 129,
    originalPrice: 159,
    category: "earbuds",
    brand: "Razer",
    rating: 4.5,
    image: "/products/razer-earbuds.jpg",
    discount: 19,
    features: ["Gaming Mode", "RGB Lights", "20hr battery"]
  }
];

export default function EarbudsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(earbudsData);
  const [filters, setFilters] = useState({
    brand: "all",
    priceRange: "all",
    sortBy: "featured",
  });

  const brands = ["all", "Apple", "Sony", "JBL", "Realme", "Sennheiser", "Razer"];
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-50", label: "Under $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-200", label: "$100 - $200" },
    { value: "200+", label: "Over $200" },
  ];

  useEffect(() => {
    let result = [...earbudsData];

    if (filters.brand !== "all") {
      result = result.filter(product => product.brand === filters.brand);
    }

    if (filters.priceRange !== "all") {
      switch (filters.priceRange) {
        case "0-50":
          result = result.filter(product => product.price < 50);
          break;
        case "50-100":
          result = result.filter(product => product.price >= 50 && product.price < 100);
          break;
        case "100-200":
          result = result.filter(product => product.price >= 100 && product.price < 200);
          break;
        case "200+":
          result = result.filter(product => product.price >= 200);
          break;
      }
    }

    switch (filters.sortBy) {
      case "price-low":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        result = result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    setFilteredProducts(result);
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">Wireless Earbuds</h1>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Experience crystal clear sound with our premium collection of wireless earbuds. 
              From noise cancellation to extended battery life, find your perfect pair.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Filter Earbuds</h3>
              
              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        checked={filters.brand === brand}
                        onChange={() => setFilters(prev => ({ ...prev, brand }))}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label key={range.value} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === range.value}
                        onChange={() => setFilters(prev => ({ ...prev, priceRange: range.value }))}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setFilters({ brand: "all", priceRange: "all", sortBy: "featured" })}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-600">{filteredProducts.length} earbuds found</span>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-t-lg overflow-hidden">
                      <div className="w-full h-64 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-blue-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                            <div className="w-12 h-12 bg-blue-300 rounded-full"></div>
                          </div>
                          <span className="text-blue-600 text-sm font-medium">{product.brand}</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 flex flex-col space-y-2">
                      {product.isNew && <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">New</span>}
                      {product.isFeatured && <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">Featured</span>}
                      {product.discount && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">-{product.discount}%</span>}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 uppercase">{product.brand}</span>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    
                    {product.features && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {product.features.slice(0, 2).map((feature, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                        )}
                      </div>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors group-hover:scale-110">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}