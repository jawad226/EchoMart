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
  compatibleWith?: string[];
  material?: string;
};

const mobileCaseData: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Case",
    price: 24,
    originalPrice: 29,
    category: "mobile-phone-case",
    brand: "Spigen",
    rating: 4.6,
    image: "/products/iphone-case.jpg",
    isNew: true,
    discount: 17,
    compatibleWith: ["iPhone 15 Pro"],
    material: "Polycarbonate"
  },
  {
    id: 2,
    name: "Samsung Galaxy Case",
    price: 19,
    category: "mobile-phone-case",
    brand: "Caseology",
    rating: 4.4,
    image: "/products/samsung-case.jpg",
    compatibleWith: ["Samsung Galaxy S23"],
    material: "TPU"
  },
  {
    id: 3,
    name: "Rugged Protective Case",
    price: 34,
    category: "mobile-phone-case",
    brand: "OtterBox",
    rating: 4.7,
    image: "/products/rugged-case.jpg",
    isFeatured: true,
    compatibleWith: ["Multiple Models"],
    material: "Polycarbonate + TPU"
  },
  {
    id: 4,
    name: "Clear Transparent Case",
    price: 15,
    category: "mobile-phone-case",
    brand: "ESR",
    rating: 4.3,
    image: "/products/clear-case.jpg",
    compatibleWith: ["iPhone 14/15 Series"],
    material: "Crystal Clear TPU"
  },
  {
    id: 5,
    name: "Leather Wallet Case",
    price: 39,
    originalPrice: 49,
    category: "mobile-phone-case",
    brand: "Bellroy",
    rating: 4.5,
    image: "/products/leather-case.jpg",
    discount: 20,
    compatibleWith: ["iPhone 15 Pro Max"],
    material: "Genuine Leather"
  },
  {
    id: 6,
    name: "Gaming Phone Case",
    price: 28,
    category: "mobile-phone-case",
    brand: "Razer",
    rating: 4.4,
    image: "/products/gaming-case.jpg",
    compatibleWith: ["Gaming Phones"],
    material: "Textured Rubber"
  }
];

export default function MobileCasePage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mobileCaseData);
  const [filters, setFilters] = useState({
    brand: "all",
    material: "all",
    priceRange: "all",
    sortBy: "featured",
  });

  const brands = ["all", "Spigen", "Caseology", "OtterBox", "ESR", "Bellroy", "Razer"];
  const materials = ["all", "Polycarbonate", "TPU", "Leather", "Rubber"];
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-20", label: "Under $20" },
    { value: "20-30", label: "$20 - $30" },
    { value: "30+", label: "Over $30" },
  ];

  useEffect(() => {
    let result = [...mobileCaseData];

    if (filters.brand !== "all") {
      result = result.filter(product => product.brand === filters.brand);
    }

    if (filters.material !== "all") {
      result = result.filter(product => product.material?.includes(filters.material));
    }

    if (filters.priceRange !== "all") {
      switch (filters.priceRange) {
        case "0-20":
          result = result.filter(product => product.price < 20);
          break;
        case "20-30":
          result = result.filter(product => product.price >= 20 && product.price < 30);
          break;
        case "30+":
          result = result.filter(product => product.price >= 30);
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
            <h1 className="text-4xl font-bold text-gray-900">Mobile Phone Cases</h1>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Protect your device in style with our premium phone cases. 
              From rugged protection to sleek designs, find the perfect case for your phone.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Filter Cases</h3>
              
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
                <h4 className="font-medium text-gray-900 mb-3">Material</h4>
                <div className="space-y-2">
                  {materials.map(material => (
                    <label key={material} className="flex items-center">
                      <input
                        type="radio"
                        name="material"
                        checked={filters.material === material}
                        onChange={() => setFilters(prev => ({ ...prev, material }))}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{material}</span>
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
                onClick={() => setFilters({ brand: "all", material: "all", priceRange: "all", sortBy: "featured" })}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-600">{filteredProducts.length} cases found</span>
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
                    <div className="aspect-square bg-gradient-to-br from-orange-50 to-orange-100 rounded-t-lg overflow-hidden">
                      <div className="w-full h-64 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <div className="text-center">
                          <div className="w-16 h-24 bg-orange-200 rounded-2xl mx-auto mb-3 flex items-center justify-center">
                            <div className="w-12 h-20 bg-orange-300 rounded-xl"></div>
                          </div>
                          <span className="text-orange-600 text-sm font-medium">{product.brand}</span>
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
                      <div className="flex items-center space-x-2">
                        {product.material && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{product.material}</span>
                        )}
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    
                    {product.compatibleWith && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Compatible with:</p>
                        <div className="flex flex-wrap gap-1">
                          {product.compatibleWith.map((device, index) => (
                            <span key={index} className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                              {device}
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