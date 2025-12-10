"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  oldPrice?: number;
  sale?: boolean;
}

const products: Product[] = [
  { id: 1, title: "JP - Space Tablet 10.4” Wi-Fi 32GB", image: "/adp.png", price: 70, oldPrice: 85, sale: true },
  { id: 2, title: "Ocean Pro 11 - 12.3” Touch Screen", image: "/EarFun.png", price: 70, oldPrice: 85, sale: true },
  { id: 3, title: "Shel 50” Class LED 4K UHD Smart TV", image: "/headphone.png", price: 85 },
  { id: 4, title: "Fitboot Inspire Fitness Tracker", image: "/phone.png", price: 70, oldPrice: 85, sale: true },
  { id: 5, title: "Smartphone Z Pixel Max 128GB", image: "/adp.png", price: 70, oldPrice: 85, sale: true },
  { id: 6, title: "65” Class Nano LED 4K UHD Smart TV", image: "/EarFun.png", price: 70, oldPrice: 85, sale: true },
  { id: 7, title: "Wireless Noise Cancelling Headphones", image: "/headphone.png", price: 90 },
  { id: 8, title: "Gaming Monitor 27” QHD 144Hz", image: "/phone.png", price: 120 },
  { id: 9, title: "Ultra Bass Wireless Speakers", image: "/adp.png", price: 55, oldPrice: 70, sale: true },
  { id: 10, title: "Smart Home Camera 1080p", image: "/EarFun.png", price: 40, oldPrice: 55, sale: true },
];

const OnSale = () => {
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
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-purple-600 font-semibold">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <button className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full transition-all shadow-md">
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
