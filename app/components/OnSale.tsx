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
        const res = await fetch("http://localhost:4000/products");
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
    <section className="py-10 px-6 bg-gray-50 text-center">
      <h2 className="text-black text-3xl font-bold mb-8">On Sale</h2>

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
            <div className="flex flex-col justify-between rounded-xl shadow-lg hover:shadow-2xl transition relative bg-white p-4 h-full">

              {product.sale && (
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  SALE
                </span>
              )}

              <div className="w-full h-40 flex justify-center items-center mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div>

              <h3 className="text-black text-sm font-medium mb-2 min-h-[40px]">
                {product.title}
              </h3>

              <div className="flex justify-center items-center gap-2 mb-4">
                {product.oldPrice && (
                  <span className="text-gray-400 line-through text-sm">
                    Rs {product.oldPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-purple-600 font-semibold">
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
                className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full transition-all shadow-md"
              >
                Add to Cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Link href="/Sale">
        <button className="mt-8 bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition">
          View All
        </button>
      </Link>
    </section>
  );
};

export default OnSale;
