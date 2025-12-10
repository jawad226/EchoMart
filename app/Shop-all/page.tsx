// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";

// // Product data type
// type Product = {
//   id: number;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   category: string;
//   brand: string;
//   rating: number;
//   image: string;
//   isNew?: boolean;
//   isFeatured?: boolean;
//   discount?: number;
// };

// // Sample product data
// const productsData: Product[] = [
//   {
//     id: 1,
//     name: "Professional DSLR Camera",
//     price: 1299,
//     originalPrice: 1499,
//     category: "cameras",
//     brand: "Canon",
//     rating: 4.8,
//     image: "/products/camera-1.jpg",
//     isNew: true,
//     discount: 13,
//   },
//   {
//     id: 2,
//     name: "4K Action Camera",
//     price: 399,
//     category: "cameras",
//     brand: "GoPro",
//     rating: 4.6,
//     image: "/products/action-cam.jpg",
//     isFeatured: true,
//   },
//   {
//     id: 3,
//     name: "Professional Drone Pro",
//     price: 1599,
//     originalPrice: 1999,
//     category: "drones",
//     brand: "DJI",
//     rating: 4.9,
//     image: "/products/drone-pro.jpg",
//     isNew: true,
//     discount: 20,
//   },
//   {
//     id: 4,
//     name: "Compact Drone Mini",
//     price: 599,
//     category: "drones",
//     brand: "DJI",
//     rating: 4.4,
//     image: "/products/drone-mini.jpg",
//   },
//   {
//     id: 5,
//     name: "Gaming Laptop Pro",
//     price: 1999,
//     originalPrice: 2299,
//     category: "laptops",
//     brand: "ASUS",
//     rating: 4.7,
//     image: "/products/laptop-gaming.jpg",
//     isFeatured: true,
//     discount: 13,
//   },
//   {
//     id: 6,
//     name: "Ultrabook Premium",
//     price: 1399,
//     category: "laptops",
//     brand: "Dell",
//     rating: 4.5,
//     image: "/products/laptop-ultra.jpg",
//   },
//   {
//     id: 7,
//     name: "Wireless Earbuds Pro",
//     price: 249,
//     originalPrice: 299,
//     category: "accessories",
//     brand: "Sony",
//     rating: 4.6,
//     image: "/products/earbuds-pro.jpg",
//     discount: 17,
//   },
//   {
//     id: 8,
//     name: "Smart Watch Series 5",
//     price: 399,
//     category: "accessories",
//     brand: "Apple",
//     rating: 4.8,
//     image: "/products/watch-5.jpg",
//     isNew: true,
//   },
// ];

// export default function ShopAll() {
//   const [products, setProducts] = useState<Product[]>(productsData);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData);
//   const [filters, setFilters] = useState({
//     category: "all",
//     brand: "all",
//     priceRange: "all",
//     sortBy: "featured",
//   });
//   const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

//   // Categories and brands for filters
//   const categories = ["all", "cameras", "drones", "laptops", "accessories"];
//   const brands = ["all", "Canon", "GoPro", "DJI", "ASUS", "Dell", "Sony", "Apple"];
//   const priceRanges = [
//     { value: "all", label: "All Prices" },
//     { value: "0-500", label: "Under $500" },
//     { value: "500-1000", label: "$500 - $1000" },
//     { value: "1000-2000", label: "$1000 - $2000" },
//     { value: "2000+", label: "Over $2000" },
//   ];
//   const sortOptions = [
//     { value: "featured", label: "Featured" },
//     { value: "newest", label: "Newest" },
//     { value: "price-low", label: "Price: Low to High" },
//     { value: "price-high", label: "Price: High to Low" },
//     { value: "rating", label: "Highest Rated" },
//   ];

//   // Apply filters
//   useEffect(() => {
//     let result = [...products];

//     // Category filter
//     if (filters.category !== "all") {
//       result = result.filter(product => product.category === filters.category);
//     }

//     // Brand filter
//     if (filters.brand !== "all") {
//       result = result.filter(product => product.brand === filters.brand);
//     }

//     // Price range filter
//     if (filters.priceRange !== "all") {
//       switch (filters.priceRange) {
//         case "0-500":
//           result = result.filter(product => product.price < 500);
//           break;
//         case "500-1000":
//           result = result.filter(product => product.price >= 500 && product.price < 1000);
//           break;
//         case "1000-2000":
//           result = result.filter(product => product.price >= 1000 && product.price < 2000);
//           break;
//         case "2000+":
//           result = result.filter(product => product.price >= 2000);
//           break;
//       }
//     }

//     // Sorting
//     switch (filters.sortBy) {
//       case "newest":
//         result = result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
//         break;
//       case "price-low":
//         result = result.sort((a, b) => a.price - b.price);
//         break;
//       case "price-high":
//         result = result.sort((a, b) => b.price - a.price);
//         break;
//       case "rating":
//         result = result.sort((a, b) => b.rating - a.rating);
//         break;
//       case "featured":
//       default:
//         result = result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
//         break;
//     }

//     setFilteredProducts(result);
//   }, [filters, products]);

//   const handleFilterChange = (key: string, value: string) => {
//     setFilters(prev => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const clearAllFilters = () => {
//     setFilters({
//       category: "all",
//       brand: "all",
//       priceRange: "all",
//       sortBy: "featured",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Shop All Products</h1>
//               <p className="text-gray-600 mt-2">Discover our complete collection</p>
//             </div>
//             <div className="mt-4 md:mt-0 flex items-center space-x-4">
//               <span className="text-sm text-gray-600">
//                 {filteredProducts.length} products found
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar Filters - Desktop */}
//           <div className="hidden lg:block w-64 flex-shrink-0">
//             <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
//                 <button
//                   onClick={clearAllFilters}
//                   className="text-sm text-purple-600 hover:text-purple-700 font-medium"
//                 >
//                   Clear all
//                 </button>
//               </div>

//               {/* Category Filter */}
//               <div className="mb-6">
//                 <h4 className="font-medium text-gray-900 mb-3">Category</h4>
//                 <div className="space-y-2">
//                   {categories.map(category => (
//                     <label key={category} className="flex items-center">
//                       <input
//                         type="radio"
//                         name="category"
//                         checked={filters.category === category}
//                         onChange={() => handleFilterChange("category", category)}
//                         className="text-purple-600 focus:ring-purple-500"
//                       />
//                       <span className="ml-2 text-sm text-gray-700 capitalize">
//                         {category}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Brand Filter */}
//               <div className="mb-6">
//                 <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
//                 <div className="space-y-2">
//                   {brands.map(brand => (
//                     <label key={brand} className="flex items-center">
//                       <input
//                         type="radio"
//                         name="brand"
//                         checked={filters.brand === brand}
//                         onChange={() => handleFilterChange("brand", brand)}
//                         className="text-purple-600 focus:ring-purple-500"
//                       />
//                       <span className="ml-2 text-sm text-gray-700">{brand}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Range Filter */}
//               <div className="mb-6">
//                 <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
//                 <div className="space-y-2">
//                   {priceRanges.map(range => (
//                     <label key={range.value} className="flex items-center">
//                       <input
//                         type="radio"
//                         name="priceRange"
//                         checked={filters.priceRange === range.value}
//                         onChange={() => handleFilterChange("priceRange", range.value)}
//                         className="text-purple-600 focus:ring-purple-500"
//                       />
//                       <span className="ml-2 text-sm text-gray-700">{range.label}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             {/* Mobile Filter Bar */}
//             <div className="lg:hidden bg-white rounded-lg shadow-sm p-4 mb-6">
//               <div className="flex items-center justify-between">
//                 <button
//                   onClick={() => setMobileFiltersOpen(true)}
//                   className="flex items-center space-x-2 text-gray-700"
//                 >
//                   <span>Filters</span>
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
//                   </svg>
//                 </button>

//                 <select
//                   value={filters.sortBy}
//                   onChange={(e) => handleFilterChange("sortBy", e.target.value)}
//                   className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 >
//                   {sortOptions.map(option => (
//                     <option key={option.value} value={option.value}>
//                       {option.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Sort Bar - Desktop */}
//             <div className="hidden lg:flex items-center justify-between mb-6">
//               <span className="text-sm text-gray-600">
//                 Showing {filteredProducts.length} of {products.length} products
//               </span>
//               <select
//                 value={filters.sortBy}
//                 onChange={(e) => handleFilterChange("sortBy", e.target.value)}
//                 className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//               >
//                 {sortOptions.map(option => (
//                   <option key={option.value} value={option.value}>
//                     {option.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Products Grid */}
//             {filteredProducts.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="text-gray-400 text-6xl mb-4">😔</div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
//                 <p className="text-gray-600 mb-4">Try adjusting your filters to find what you're looking for.</p>
//                 <button
//                   onClick={clearAllFilters}
//                   className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
//                 >
//                   Clear all filters
//                 </button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {filteredProducts.map(product => (
//                   <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
//                     <div className="relative">
//                       {/* Product Image */}
//                       <div className="aspect-w-3 aspect-h-2 bg-gray-200 rounded-t-lg overflow-hidden">
//                         <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
//                           <span className="text-gray-400">Product Image</span>
//                         </div>
//                       </div>

//                       {/* Badges */}
//                       <div className="absolute top-3 left-3 flex flex-col space-y-2">
//                         {product.isNew && (
//                           <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
//                             New
//                           </span>
//                         )}
//                         {product.isFeatured && (
//                           <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
//                             Featured
//                           </span>
//                         )}
//                         {product.discount && (
//                           <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
//                             -{product.discount}%
//                           </span>
//                         )}
//                       </div>
//                     </div>

//                     {/* Product Info */}
//                     <div className="p-4">
//                       <div className="flex items-center justify-between mb-2">
//                         <span className="text-xs text-gray-500 uppercase">{product.brand}</span>
//                         <div className="flex items-center">
//                           <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                           </svg>
//                           <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
//                         </div>
//                       </div>

//                       <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-2">
//                           <span className="text-lg font-bold text-gray-900">${product.price}</span>
//                           {product.originalPrice && (
//                             <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
//                           )}
//                         </div>
//                         <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full transition-colors">
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Filters Modal */}
//       {mobileFiltersOpen && (
//         <div className="fixed inset-0 z-50 lg:hidden">
//           <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileFiltersOpen(false)} />
//           <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
//                 <button
//                   onClick={() => setMobileFiltersOpen(false)}
//                   className="text-gray-400 hover:text-gray-500"
//                 >
//                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               {/* Mobile Filter Content */}
//               <div className="space-y-6">
//                 {/* Category Filter */}
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-3">Category</h4>
//                   <div className="space-y-2">
//                     {categories.map(category => (
//                       <label key={category} className="flex items-center">
//                         <input
//                           type="radio"
//                           name="category-mobile"
//                           checked={filters.category === category}
//                           onChange={() => handleFilterChange("category", category)}
//                           className="text-purple-600 focus:ring-purple-500"
//                         />
//                         <span className="ml-2 text-sm text-gray-700 capitalize">
//                           {category}
//                         </span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Brand Filter */}
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
//                   <div className="space-y-2">
//                     {brands.map(brand => (
//                       <label key={brand} className="flex items-center">
//                         <input
//                           type="radio"
//                           name="brand-mobile"
//                           checked={filters.brand === brand}
//                           onChange={() => handleFilterChange("brand", brand)}
//                           className="text-purple-600 focus:ring-purple-500"
//                         />
//                         <span className="ml-2 text-sm text-gray-700">{brand}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Price Range Filter */}
//                 <div>
//                   <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
//                   <div className="space-y-2">
//                     {priceRanges.map(range => (
//                       <label key={range.value} className="flex items-center">
//                         <input
//                           type="radio"
//                           name="priceRange-mobile"
//                           checked={filters.priceRange === range.value}
//                           onChange={() => handleFilterChange("priceRange", range.value)}
//                           className="text-purple-600 focus:ring-purple-500"
//                         />
//                         <span className="ml-2 text-sm text-gray-700">{range.label}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <button
//                   onClick={clearAllFilters}
//                   className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
//                 >
//                   Clear All Filters
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Product data type
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
};

// Sample product data with your categories
const productsData: Product[] = [
  // Earbuds
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
  },
  {
    id: 4,
    name: "Budget TWS Earbuds",
    price: 39,
    category: "earbuds",
    brand: "Realme",
    rating: 4.2,
    image: "/products/realme-earbuds.jpg",
  },

  // Adaptors
  {
    id: 5,
    name: "USB-C Fast Charging Adaptor",
    price: 29,
    originalPrice: 39,
    category: "adaptor",
    brand: "Anker",
    rating: 4.7,
    image: "/products/usbc-adaptor.jpg",
    isNew: true,
    discount: 26,
  },
  {
    id: 6,
    name: "Multi-Port Charging Hub",
    price: 49,
    category: "adaptor",
    brand: "UGREEN",
    rating: 4.5,
    image: "/products/multi-port-hub.jpg",
    isFeatured: true,
  },
  {
    id: 7,
    name: "Car Charger Adaptor",
    price: 19,
    category: "adaptor",
    brand: "Aukey",
    rating: 4.3,
    image: "/products/car-charger.jpg",
  },
  {
    id: 8,
    name: "International Travel Adaptor",
    price: 25,
    category: "adaptor",
    brand: "Skross",
    rating: 4.6,
    image: "/products/travel-adaptor.jpg",
  },

  // Headphones
  {
    id: 9,
    name: "Wireless Over-Ear Headphones",
    price: 299,
    originalPrice: 399,
    category: "headphones",
    brand: "Bose",
    rating: 4.8,
    image: "/products/bose-headphones.jpg",
    isNew: true,
    discount: 25,
  },
  {
    id: 10,
    name: "Noise Cancelling Headphones",
    price: 349,
    category: "headphones",
    brand: "Sony",
    rating: 4.9,
    image: "/products/sony-headphones.jpg",
    isFeatured: true,
  },
  {
    id: 11,
    name: "Gaming Headset Pro",
    price: 129,
    category: "headphones",
    brand: "Razer",
    rating: 4.5,
    image: "/products/razer-headset.jpg",
  },
  {
    id: 12,
    name: "Studio Monitor Headphones",
    price: 159,
    category: "headphones",
    brand: "Audio-Technica",
    rating: 4.7,
    image: "/products/studio-headphones.jpg",
  },

  // Mobile Phone Cases
  {
    id: 13,
    name: "iPhone 15 Pro Case",
    price: 24,
    originalPrice: 29,
    category: "mobile-phone-case",
    brand: "Spigen",
    rating: 4.6,
    image: "/products/iphone-case.jpg",
    isNew: true,
    discount: 17,
  },
  {
    id: 14,
    name: "Samsung Galaxy Case",
    price: 19,
    category: "mobile-phone-case",
    brand: "Caseology",
    rating: 4.4,
    image: "/products/samsung-case.jpg",
  },
  {
    id: 15,
    name: "Rugged Protective Case",
    price: 34,
    category: "mobile-phone-case",
    brand: "OtterBox",
    rating: 4.7,
    image: "/products/rugged-case.jpg",
    isFeatured: true,
  },
  {
    id: 16,
    name: "Clear Transparent Case",
    price: 15,
    category: "mobile-phone-case",
    brand: "ESR",
    rating: 4.3,
    image: "/products/clear-case.jpg",
  },
];

export default function ShopAll() {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productsData);
  const [filters, setFilters] = useState({
    category: "all",
    brand: "all",
    priceRange: "all",
    sortBy: "featured",
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Categories and brands for filters
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "earbuds", label: "Earbuds" },
    { value: "adaptor", label: "Adaptor" },
    { value: "headphones", label: "Headphones" },
    { value: "mobile-phone-case", label: "Mobile Phone Case" },
  ];

  const brands = ["all", "Apple", "Sony", "JBL", "Realme", "Anker", "UGREEN", "Aukey", "Skross", "Bose", "Razer", "Audio-Technica", "Spigen", "Caseology", "OtterBox", "ESR"];
  
  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-50", label: "Under $50" },
    { value: "50-100", label: "$50 - $100" },
    { value: "100-200", label: "$100 - $200" },
    { value: "200+", label: "Over $200" },
  ];
  
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  // Apply filters
  useEffect(() => {
    let result = [...products];

    // Category filter
    if (filters.category !== "all") {
      result = result.filter(product => product.category === filters.category);
    }

    // Brand filter
    if (filters.brand !== "all") {
      result = result.filter(product => product.brand === filters.brand);
    }

    // Price range filter
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

    // Sorting
    switch (filters.sortBy) {
      case "newest":
        result = result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
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
  }, [filters, products]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: "all",
      brand: "all",
      priceRange: "all",
      sortBy: "featured",
    });
  };

  // Get category label
  const getCategoryLabel = (value: string) => {
    return categories.find(cat => cat.value === value)?.label || value;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shop All Products</h1>
              <p className="text-gray-600 mt-2">Discover our complete collection of electronics accessories</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {filteredProducts.length} products found
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Clear all
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category.value} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === category.value}
                        onChange={() => handleFilterChange("category", category.value)}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {category.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {brands.map(brand => (
                    <label key={brand} className="flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        checked={filters.brand === brand}
                        onChange={() => handleFilterChange("brand", brand)}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label key={range.value} className="flex items-center">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={filters.priceRange === range.value}
                        onChange={() => handleFilterChange("priceRange", range.value)}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Active Filters */}
            {(filters.category !== "all" || filters.brand !== "all" || filters.priceRange !== "all") && (
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  
                  {filters.category !== "all" && (
                    <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full flex items-center">
                      Category: {getCategoryLabel(filters.category)}
                      <button
                        onClick={() => handleFilterChange("category", "all")}
                        className="ml-1 hover:text-purple-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  
                  {filters.brand !== "all" && (
                    <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full flex items-center">
                      Brand: {filters.brand}
                      <button
                        onClick={() => handleFilterChange("brand", "all")}
                        className="ml-1 hover:text-purple-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  
                  {filters.priceRange !== "all" && (
                    <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full flex items-center">
                      Price: {priceRanges.find(p => p.value === filters.priceRange)?.label}
                      <button
                        onClick={() => handleFilterChange("priceRange", "all")}
                        className="ml-1 hover:text-purple-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Mobile Filter Bar */}
            <div className="lg:hidden bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex items-center space-x-2 text-gray-700 bg-gray-100 px-4 py-2 rounded-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  <span>Filters</span>
                </button>

                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Bar - Desktop */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <span className="text-sm text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
                {filters.category !== "all" && ` in ${getCategoryLabel(filters.category)}`}
              </span>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">😔</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters to find what you're looking for.</p>
                <button
                  onClick={clearAllFilters}
                  className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group">
                    <div className="relative">
                      {/* Product Image */}
                      <div className="aspect-square bg-gray-100 rounded-t-lg overflow-hidden">
                        <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gray-400 rounded-full mx-auto mb-2"></div>
                            <span className="text-gray-500 text-sm">{product.brand}</span>
                          </div>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col space-y-2">
                        {product.isNew && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        )}
                        {product.isFeatured && (
                          <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                        {product.discount && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            -{product.discount}%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Product Info */}
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

                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 h-12">{product.name}</h3>

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
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Mobile Filter Content */}
              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category.value} className="flex items-center">
                        <input
                          type="radio"
                          name="category-mobile"
                          checked={filters.category === category.value}
                          onChange={() => handleFilterChange("category", category.value)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {category.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {brands.map(brand => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="radio"
                          name="brand-mobile"
                          checked={filters.brand === brand}
                          onChange={() => handleFilterChange("brand", brand)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <label key={range.value} className="flex items-center">
                        <input
                          type="radio"
                          name="priceRange-mobile"
                          checked={filters.priceRange === range.value}
                          onChange={() => handleFilterChange("priceRange", range.value)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={clearAllFilters}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}