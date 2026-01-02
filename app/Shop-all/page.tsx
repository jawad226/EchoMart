"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  brand: string;
  rating: number;
  category: Category;
};

export default function ShopAll() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();
  const [filters, setFilters] = useState({
    category: "all",
    brand: "all",
    sortBy: "featured",
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("http://localhost:4000/products"),
          fetch("http://localhost:4000/categories")
        ]);
        const prodData: Product[] = await prodRes.json();
        const catData: Category[] = await catRes.json();

        setProducts(prodData);
        setFilteredProducts(prodData);
        setCategories(catData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (filters.category !== "all") {
      result = result.filter(p => p.category.slug === filters.category);
    }

    if (filters.brand !== "all") {
      result = result.filter(p => p.brand === filters.brand);
    }

    if (filters.sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (filters.sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (filters.sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    setFilteredProducts(result);
  }, [filters, products]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const brands = Array.from(new Set(products.map(p => p.brand)));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Shop All Products</h1>
          <p className="text-gray-600 mt-2">Browse our entire collection from all categories.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-64 flex-shrink-0 bg-white p-6 rounded-2xl shadow-sm h-fit sticky top-8">
          <h3 className="font-bold text-lg mb-6">Filters</h3>

          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Category</h4>
            <select
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="w-full p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.slug}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Brand</h4>
            <select
              value={filters.brand}
              onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
              className="w-full p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Sort By</h4>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              className="w-full p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={product.image || "/EarFun.png"} alt={product.name} fill className="object-contain group-hover:scale-105 transition-transform duration-500" />
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      SALE
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-bold text-purple-600 uppercase mb-2 block">{product.brand}</span>
                  <h3 className="font-bold text-gray-900 mb-3 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold">Rs {product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through ml-2">Rs {product.originalPrice}</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart({ id: product.id.toString(), title: product.name, price: product.price, image: product.image || "/EarFun.png", qty: 1 })}
                      className="bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-xl transition-all shadow-lg hover:rotate-12"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  );
}
