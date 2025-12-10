"use client";
import { useState, useEffect } from "react";

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
  specs?: string[];
};

const adaptorData: Product[] = [
  {
    id: 1,
    name: "USB-C Fast Charging Adaptor",
    price: 29,
    originalPrice: 39,
    category: "adaptor",
    brand: "Anker",
    rating: 4.7,
    image: "/hd.jpg",
    isNew: true,
    discount: 26,
    specs: ["65W PD", "GaN Technology", "Compact Design"]
  },
  {
    id: 2,
    name: "Multi-Port Charging Hub",
    price: 49,
    category: "adaptor",
    brand: "UGREEN",
    rating: 4.5,
    image: "/products/multi-port-hub.jpg",
    isFeatured: true,
    specs: ["4 Ports", "100W Total", "LED Indicator"]
  },
  {
    id: 3,
    name: "Car Charger Adaptor",
    price: 19,
    category: "adaptor",
    brand: "Aukey",
    rating: 4.3,
    image: "/products/car-charger.jpg",
    specs: ["Quick Charge 3.0", "Dual USB", "Overheat Protection"]
  },
  {
    id: 4,
    name: "International Travel Adaptor",
    price: 25,
    category: "adaptor",
    brand: "Skross",
    rating: 4.6,
    image: "/products/travel-adaptor.jpg",
    specs: ["150+ Countries", "USB Ports", "Safety Shutters"]
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    price: 35,
    originalPrice: 45,
    category: "adaptor",
    brand: "Samsung",
    rating: 4.4,
    image: "/products/wireless-pad.jpg",
    discount: 22,
    specs: ["15W Fast Charge", "LED Indicator", "Non-slip Surface"]
  },
  {
    id: 6,
    name: "Laptop Power Adaptor",
    price: 59,
    category: "adaptor",
    brand: "Dell",
    rating: 4.5,
    image: "/products/laptop-adaptor.jpg",
    specs: ["90W Output", "Universal Compatible", "Overload Protection"]
  }
];

export default function AdaptorPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(adaptorData);
  const [filters, setFilters] = useState({
    brand: "all",
    priceRange: "all",
    sortBy: "featured",
  });

  const brands = ["all", "Anker", "UGREEN", "Aukey", "Skross", "Samsung", "Dell"];
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-20", label: "Under $20" },
    { value: "20-40", label: "$20 - $40" },
    { value: "40-60", label: "$40 - $60" },
    { value: "60+", label: "Over $60" },
  ];

  useEffect(() => {
    let result = [...adaptorData];

    if (filters.brand !== "all") {
      result = result.filter(product => product.brand === filters.brand);
    }

    if (filters.priceRange !== "all") {
      switch (filters.priceRange) {
        case "0-20":
          result = result.filter(product => product.price < 20);
          break;
        case "20-40":
          result = result.filter(product => product.price >= 20 && product.price < 40);
          break;
        case "40-60":
          result = result.filter(product => product.price >= 40 && product.price < 60);
          break;
        case "60+":
          result = result.filter(product => product.price >= 60);
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
            <h1 className="text-4xl font-bold text-gray-900">Charging Adaptors</h1>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Power up your devices with our reliable charging solutions. 
              From fast charging adaptors to multi-port hubs, we have everything you need.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Filter Adaptors</h3>
              
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
              <span className="text-gray-600">{filteredProducts.length} adaptors found</span>
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
                    <div className="aspect-square bg-gradient-to-br from-green-50 to-green-100 rounded-t-lg overflow-hidden">
                      <div className="w-full h-64 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-green-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
                            <div className="w-8 h-8 bg-green-300 rounded"></div>
                          </div>
                          <span className="text-green-600 text-sm font-medium">{product.brand}</span>
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
                    
                    {product.specs && (
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {product.specs.map((spec, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {spec}
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