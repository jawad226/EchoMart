"use client";
import React, { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface SaleProduct {
  id: string;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  sale?: boolean;
}

const OnSale = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<SaleProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOnSale = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/products`);
        if (res.ok) {
          const data = await res.json();
          const saleItems = data
            .filter((p: any) => p.originalPrice && p.originalPrice > p.price)
            .map((p: any) => ({
              id: p.id.toString(),
              title: p.name,
              image: p.image || "/adp.png",
              price: p.price,
              oldPrice: p.originalPrice,
              sale: true
            }));
          setProducts(saleItems);
        }
      } catch (err) {
        console.error("Failed to fetch on sale products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOnSale();
  }, []);

  if (isLoading) return null;
  if (products.length === 0) return null;

  return (
    <section className="py-12 px-6 bg-white text-center">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-black-900 text-3xl md:text-4xl font-extrabold">On Sale</h2>
          <div className="w-20 h-1.5 bg-blue-600 mt-4 rounded-full"></div>
        </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        autoplay={{ delay: 3000 }}
        className="pb-10"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative">

              {product.sale && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    -{Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)}% OFF
                  </span>
                </div>
              )}

              <div className="w-full h-44 flex justify-center items-center mb-6 overflow-hidden rounded-xl bg-gray-50/50">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={160}
                  height={160}
                  className="object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <h3 className="text-gray-800 text-sm font-bold mb-3 min-h-[40px] line-clamp-2 px-2">
                {product.title}
              </h3>

              <div className="flex flex-col items-center gap-1 mb-5">
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-xs font-medium">
                    Rs {product.oldPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-blue-800 text-lg font-black">
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
                  })
                }
                className="mt-auto bg-blue-800 hover:bg-blue-900 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md active:scale-95 text-sm"
              >
                Add to Cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

        <div className="mt-12">
          <Link href="/Sale">
            <button className="bg-transparent border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-10 py-3 rounded-xl font-bold transition-all duration-300">
              View All Offers
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OnSale;
