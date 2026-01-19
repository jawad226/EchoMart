"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

type Product = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  brand: string;
  rating: number;
  category: { name: string; slug: string };
};

export default function SalePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchSaleProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production-176a.up.railway.app"}/products`);
        const data: Product[] = await res.json();
        // Only show products where originalPrice > price
        const onSale = data.filter(p => p.originalPrice && p.originalPrice > p.price);
        setProducts(onSale);
      } catch (error) {
        console.error("Error fetching sale products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSaleProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sale Hero */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block bg-white/20 backdrop-blur-md px-6 py-2 rounded-full font-black tracking-widest text-sm mb-6 uppercase border border-white/30">
            Exclusive Deals
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 italic transform -skew-x-6">MEGA SALE EVENT</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto font-medium">
            Massive savings on your favorite electronics. Don't miss out - prices are dropped for a limited time!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {products.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <h2 className="text-2xl font-bold text-gray-400">No active sales at the moment. Check back soon!</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map(product => (
              <div key={product.id} className="group relative">
                <div className="absolute -top-3 -right-3 z-10 bg-red-600 text-white font-black px-4 py-2 rounded-xl shadow-xl transform rotate-12 group-hover:scale-110 transition-transform">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </div>

                <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 p-4">
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-6">
                    <Image
                      src={product.image || "/EarFun.png"}
                      alt={product.name}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-red-600 uppercase tracking-tighter bg-red-50 px-3 py-1 rounded-full">{product.category.name}</span>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-bold">{product.rating}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 h-14 line-clamp-2 leading-tight">{product.name}</h3>

                    <div className="flex items-end justify-between pt-4 border-t border-gray-50">
                      <div className="flex flex-col">
                        <span className="text-3xl font-black text-red-600">Rs {product.price}</span>
                        <span className="text-sm text-gray-400 line-through font-bold">Rs {product.originalPrice}</span>
                      </div>
                      <button
                        onClick={() => addToCart({ id: product.id.toString(), title: product.name, price: product.price, image: product.image || "/EarFun.png", qty: 1, category: product.category.name })}
                        className="bg-red-600 hover:bg-black text-white px-6 py-3 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-200"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
