"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  sale?: boolean;
  isNew?: boolean;
  category: string;
  description: string;
}

const BestSellers = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/products`);
        if (res.ok) {
          const data = await res.json();
          // Map backend data to Home page format
          const mapped = data.slice(0, 8).map((p: any) => ({
            id: p.id,
            title: p.name,
            image: p.image || "/EarFun.png",
            price: p.price,
            oldPrice: p.originalPrice,
            sale: p.originalPrice && p.originalPrice > p.price,
            category: p.category?.name || "General",
            description: p.description || "Premium quality electronic product."
          }));
          setProducts(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch best sellers:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBestSellers();
  }, []);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  if (isLoading) return null;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Best Sellers
          </h2>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={products.length > 4}
          className="pb-2"
        >
          {products.map(product => {
            const isInWishlist = wishlist.includes(product.id);
            const discount = product.oldPrice
              ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
              : 0;

            return (
              <SwiperSlide key={product.id}>
                <div className="group relative flex flex-col h-[460px] bg-white rounded-3xl border border-gray-200 shadow-md hover:shadow-xl transition-all overflow-hidden">

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    {product.sale && (
                      <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                        -{discount}%
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                        NEW
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-2 rounded-full shadow-lg backdrop-blur-sm transition-all ${isInWishlist
                        ? 'bg-red-500 text-white'
                        : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                        }`}
                    >
                      <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={() => setModalProduct(product)}
                      className="p-2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm text-gray-700 hover:bg-purple-500 hover:text-white transition-all"
                    >
                      <Eye size={18} />
                    </button>
                  </div>

                  {/* Product Image */}
                  <div className="relative w-full h-60 flex justify-center items-center p-8 bg-slate-50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="object-contain transition-transform duration-700 transform hover:scale-110 drop-shadow-xl"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col flex-grow p-6 pt-5">
                    <span className="text-[10px] text-blue-600 font-extrabold mb-2 uppercase tracking-widest bg-blue-50 w-fit px-2 py-0.5 rounded-md">
                      {product.category}
                    </span>
                    <h3 className="text-slate-900 font-bold mb-3 line-clamp-2 leading-tight group-hover:text-blue-700 transition-colors">
                      {product.title}
                    </h3>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                      <div className="flex flex-col">
                        {product.oldPrice && (
                          <span className="text-slate-400 line-through text-xs font-medium">
                            Rs {product.oldPrice.toLocaleString()}
                          </span>
                        )}
                        <span className="text-xl font-black text-slate-900 leading-none">
                          Rs {product.price.toLocaleString()}
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          addToCart({
                            id: product.id.toString(),
                            title: product.title,
                            price: product.price,
                            image: product.image,
                            qty: 1,
                            category: product.category
                          })
                        }
                        className="flex items-center gap-2 bg-slate-900 hover:bg-blue-600 text-white font-bold px-5 py-3 rounded-xl transition-all shadow-md group-hover:shadow-blue-200 group-hover:shadow-lg"
                      >
                        <ShoppingCart size={16} />
                        <span className="text-sm">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button className="bg-white border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 text-slate-900 font-black px-12 py-4 rounded-2xl transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
            Browse All Products
          </button>
        </div>
      </div>

      {/* Quick View Modal */}
      {modalProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative shadow-xl animate-fade-in">
            <button
              onClick={() => setModalProduct(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 text-2xl font-bold"
            >
              ×
            </button>
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-64 h-64">
                <Image src={modalProduct.image} alt={modalProduct.title} fill className="object-contain" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">{modalProduct.title}</h2>
              <p className="text-gray-600 text-center">{modalProduct.description}</p>
              <span className="text-2xl font-bold text-gray-900">
                Rs {modalProduct.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BestSellers;
