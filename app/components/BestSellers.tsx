// // "use client";

// // import { Swiper, SwiperSlide } from "swiper/react";
// // import { Autoplay } from "swiper/modules"; // Navigation & Pagination removed
// // import "swiper/css";
// // import Image from "next/image";

// // interface Product {
// //   id: number;
// //   title: string;
// //   image: string;
// //   price: number;
// //   oldPrice?: number;
// //   sale?: boolean;
// // }

// // const products: Product[] = [
// //   { id: 1, title: "JP - Space Tablet 10.4” Wi-Fi 32GB", image: "/adp.png", price: 70, oldPrice: 85, sale: true },
// //   { id: 2, title: "Ocean Pro 11 - 12.3” Touch Screen", image: "/EarFun.png", price: 70, oldPrice: 85, sale: true },
// //   { id: 3, title: "Shel 50” Class LED 4K UHD Smart TV", image: "/headphone.png", price: 85 },
// //   { id: 4, title: "Fitboot Inspire Fitness Tracker", image: "/phone.png", price: 70, oldPrice: 85, sale: true },
// //   { id: 5, title: "Smartphone Z Pixel Max 128GB", image: "/adp.png", price: 70, oldPrice: 85, sale: true },
// //   { id: 6, title: "65” Class Nano LED 4K UHD Smart TV", image: "/EarFun.png", price: 70, oldPrice: 85, sale: true },
// //   { id: 7, title: "Wireless Noise Cancelling Headphones", image: "/headphone.png", price: 90 },
// //   { id: 8, title: "Gaming Monitor 27” QHD 144Hz", image: "/phone.png", price: 120 },
// // ];

// // const BestSellers = () => {
// //   return (
// //     <section className="py-10 px-6 bg-gray-100 text-center">
// //       <h2 className="text-black text-3xl font-bold mb-8">Best Sellers</h2>

// //       <Swiper
// //         modules={[Autoplay]}
// //         spaceBetween={20}
// //         slidesPerView={1}
// //         breakpoints={{
// //           640: { slidesPerView: 2 },
// //           1024: { slidesPerView: 4 },
// //         }}
// //         autoplay={{ delay: 3000 }}
// //         className="pb-10"
// //       >
// //         {products.map((product) => (
// //           <SwiperSlide key={product.id}>
// //             <div className="flex flex-col justify-between rounded-xl shadow-lg hover:shadow-2xl transition relative bg-white p-4 h-full">
              
// //               {product.sale && (
// //                 <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
// //                   SALE
// //                 </span>
// //               )}

// //               <div className="w-full h-40 flex justify-center items-center mb-4">
// //                 <Image
// //                   src={product.image}
// //                   alt={product.title}
// //                   width={150}
// //                   height={150}
// //                   className="object-contain"
// //                 />
// //               </div>

// //               <h3 className="text-black text-sm font-medium mb-2 min-h-[40px]">
// //                 {product.title}
// //               </h3>

// //               <div className="flex justify-center items-center gap-2 mb-4">
// //                 {product.oldPrice && (
// //                   <span className="text-gray-400 line-through text-sm">
// //                     ${product.oldPrice.toFixed(2)}
// //                   </span>
// //                 )}
// //                 <span className="text-purple-600 font-semibold">
// //                   ${product.price.toFixed(2)}
// //                 </span>
// //               </div>

// //               <button className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full transition-all shadow-md">
// //                 Add to Cart
// //               </button>
// //             </div>
// //           </SwiperSlide>
// //         ))}
// //       </Swiper>

// //       <button className="mt-8 bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition">
// //         View All
// //       </button>
// //     </section>
// //   );
// // };

// // export default BestSellers;


// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import Image from "next/image";
// import { Star, Heart, ShoppingCart, Eye, Zap } from "lucide-react";
// import { useState } from "react";

// interface Product {
//   id: number;
//   title: string;
//   image: string;
//   price: number;
//   oldPrice?: number;
//   sale?: boolean;
//   rating: number;
//   reviews: number;
//   isNew?: boolean;
//   stock: number;
//   category: string;
// }

// const products: Product[] = [
//   { id: 1, title: "JP - Space Tablet 10.4” Wi-Fi 32GB", image: "/adp.png", price: 70, oldPrice: 85, sale: true, rating: 4.5, reviews: 128, isNew: true, stock: 15, category: "Electronics" },
//   { id: 2, title: "Ocean Pro 11 - 12.3” Touch Screen", image: "/EarFun.png", price: 70, oldPrice: 85, sale: true, rating: 4.2, reviews: 89, stock: 8, category: "Electronics" },
//   { id: 3, title: "Shel 50” Class LED 4K UHD Smart TV", image: "/headphone.png", price: 85, rating: 4.8, reviews: 256, stock: 25, category: "TV & Home Theater" },
//   { id: 4, title: "Fitboot Inspire Fitness Tracker", image: "/phone.png", price: 70, oldPrice: 85, sale: true, rating: 4.1, reviews: 67, isNew: true, stock: 12, category: "Wearables" },
//   { id: 5, title: "Smartphone Z Pixel Max 128GB", image: "/adp.png", price: 70, oldPrice: 85, sale: true, rating: 4.6, reviews: 342, stock: 5, category: "Mobile" },
//   { id: 6, title: "65” Class Nano LED 4K UHD Smart TV", image: "/EarFun.png", price: 70, oldPrice: 85, sale: true, rating: 4.7, reviews: 178, stock: 18, category: "TV & Home Theater" },
//   { id: 7, title: "Wireless Noise Cancelling Headphones", image: "/headphone.png", price: 90, rating: 4.4, reviews: 203, stock: 30, category: "Audio" },
//   { id: 8, title: "Gaming Monitor 27” QHD 144Hz", image: "/phone.png", price: 120, rating: 4.9, reviews: 156, isNew: true, stock: 10, category: "Gaming" },
// ];

// const BestSellers = () => {
//   const [wishlist, setWishlist] = useState<number[]>([]);
//   const [quickView, setQuickView] = useState<Product | null>(null);

//   const toggleWishlist = (productId: number) => {
//     setWishlist(prev => 
//       prev.includes(productId) 
//         ? prev.filter(id => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   const renderStars = (rating: number) => {
//     return (
//       <div className="flex items-center gap-1">
//         {[1, 2, 3, 4, 5].map((star) => (
//           <Star
//             key={star}
//             size={14}
//             className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
//           />
//         ))}
//         <span className="text-sm text-gray-600 ml-1">({rating})</span>
//       </div>
//     );
//   };

//   const getStockStatus = (stock: number) => {
//     if (stock === 0) return { text: "Out of Stock", color: "text-red-600 bg-red-50" };
//     if (stock < 10) return { text: `Only ${stock} left`, color: "text-orange-600 bg-orange-50" };
//     return { text: "In Stock", color: "text-green-600 bg-green-50" };
//   };

//   return (
//     <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Best Selling
//           </h2>
//         </div>

//         {/* Swiper with Navigation */}
//         <div className="relative">
//           <Swiper
//             modules={[Autoplay, Navigation]}
//             spaceBetween={30}
//             slidesPerView={1}
//             breakpoints={{
//               640: { slidesPerView: 2 },
//               768: { slidesPerView: 3 },
//               1024: { slidesPerView: 4 },
//               1280: { slidesPerView: 4 },
//             }}
//             autoplay={{ 
//               delay: 5000,
//               disableOnInteraction: false,
//               pauseOnMouseEnter: true
//             }}
//             navigation={{
//               nextEl: '.swiper-button-next',
//               prevEl: '.swiper-button-prev',
//             }}
//             loop={true}
//             className="pb-2"
//           >
//             {products.map((product) => {
//               const stockStatus = getStockStatus(product.stock);
//               const isInWishlist = wishlist.includes(product.id);
//               const discount = product.oldPrice 
//                 ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
//                 : 0;

//               return (
//                 <SwiperSlide key={product.id}>
//                   <div className="group flex flex-col h-[480px] bg-white rounded-2xl border border-gray-200 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                    
//                     {/* Badges Container */}
//                     <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
//                       {product.sale && (
//                         <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
//                           -{discount}%
//                         </span>
//                       )}
//                       {product.isNew && (
//                         <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
//                           NEW
//                         </span>
//                       )}
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <button 
//                         onClick={() => toggleWishlist(product.id)}
//                         className={`p-2 rounded-full shadow-lg backdrop-blur-sm transition-all ${
//                           isInWishlist 
//                             ? 'bg-red-500 text-white' 
//                             : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
//                         }`}
//                       >
//                         <Heart size={18} fill={isInWishlist ? "currentColor" : "none"} />
//                       </button>
//                       <button className="p-2 rounded-full bg-white/90 shadow-lg backdrop-blur-sm text-gray-700 hover:bg-purple-500 hover:text-white transition-all">
//                         <Eye size={18} />
//                       </button>
//                     </div>

//                     {/* Product Image */}
//                     <div className="relative w-full h-60 flex justify-center items-center p-6 bg-gradient-to-b from-gray-50 to-white">
//                       <Image
//                         src={product.image}
//                         alt={product.title}
//                         width={180}
//                         height={180}
//                         className="object-contain transition-transform duration-500 group-hover:scale-110"
//                       />
//                     </div>

//                     {/* Product Details */}
//                     <div className="flex flex-col flex-grow p-6 pt-4">
//                       {/* Category */}
//                       <span className="text-xs text-purple-600 font-medium mb-2 uppercase tracking-wide">
//                         {product.category}
//                       </span>

//                       {/* Title */}
//                       <h3 className="text-gray-900 font-semibold mb-3 line-clamp-2 leading-tight group-hover:text-purple-700 transition-colors">
//                         {product.title}
//                       </h3>

//                       {/* Rating */}
//                       <div className="flex items-center justify-between mb-3">
//                         {renderStars(product.rating)}
//                         <span className="text-xs text-gray-500">
//                           {product.reviews} reviews
//                         </span>
//                       </div>

//                       {/* Stock Status */}
//                       <div className={`inline-flex items-center text-xs px-2 py-1 rounded-full ${stockStatus.color} self-start mb-4`}>
//                         {stockStatus.text}
//                       </div>

//                       {/* Price & Add to Cart */}
//                       <div className="flex items-center justify-between mt-auto">
//                         <div className="flex items-center gap-2">
//                           {product.oldPrice && (
//                             <span className="text-gray-400 line-through text-sm">
//                               ${product.oldPrice}
//                             </span>
//                           )}
//                           <span className="text-2xl font-bold text-gray-900">
//                             ${product.price}
//                           </span>
//                         </div>
                        
//                         <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-4 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
//                           <ShoppingCart size={18} />
//                           <span className="hidden sm:inline">Add</span>
//                         </button>
//                       </div>
//                     </div>

//                     {/* Hover Overlay */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
//                   </div>
//                 </SwiperSlide>
//               );
//             })}
//           </Swiper>

//           {/* Custom Navigation Buttons */}
//           <button className="swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white shadow-2xl rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100">
//             ←
//           </button>
//           <button className="swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white shadow-2xl rounded-full flex items-center justify-center hover:bg-purple-600 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100">
//             →
//           </button>
//         </div>

//         {/* View All Button */}
//         <div className="text-center mt-12">
//           <button className="group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-3">
//             <span>View All Best Sellers</span>
//             <div className="group-hover:translate-x-1 transition-transform duration-300">
//               →
//             </div>
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BestSellers;



"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // only autoplay, no navigation
import "swiper/css";
import Image from "next/image";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import { useState } from "react";

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

const products: Product[] = [
  { id: 1, title: "JP - Space Tablet 10.4” Wi-Fi 32GB", image: "/adp.png", price: 70, oldPrice: 85, sale: true, isNew: true, category: "Electronics", description: "High-quality tablet with Wi-Fi connectivity and 32GB storage." },
  { id: 2, title: "Ocean Pro 11 - 12.3” Touch Screen", image: "/EarFun.png", price: 70, oldPrice: 85, sale: true, category: "Electronics", description: "Touchscreen device with excellent display and performance." },
  { id: 3, title: "Shel 50” Class LED 4K UHD Smart TV", image: "/headphone.png", price: 85, category: "TV & Home Theater", description: "Smart TV with 4K UHD resolution and LED display." },
  { id: 4, title: "Fitboot Inspire Fitness Tracker", image: "/phone.png", price: 70, oldPrice: 85, sale: true, isNew: true, category: "Wearables", description: "Track your fitness with style and accuracy." },
  { id: 5, title: "JP - Space Tablet 10.4” Wi-Fi 32GB", image: "/adp.png", price: 70, oldPrice: 85, sale: true, isNew: true, category: "Electronics", description: "High-quality tablet with Wi-Fi connectivity and 32GB storage." },
  { id: 6, title: "Ocean Pro 11 - 12.3” Touch Screen", image: "/EarFun.png", price: 70, oldPrice: 85, sale: true, category: "Electronics", description: "Touchscreen device with excellent display and performance." },
  { id: 7, title: "Shel 50” Class LED 4K UHD Smart TV", image: "/headphone.png", price: 85, category: "TV & Home Theater", description: "Smart TV with 4K UHD resolution and LED display." },
  { id: 8, title: "Fitboot Inspire Fitness Tracker", image: "/phone.png", price: 70, oldPrice: 85, sale: true, isNew: true, category: "Wearables", description: "Track your fitness with style and accuracy." },
];

const BestSellers = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Best Sellers
          </h2>
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
          loop={true}
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
                      className={`p-2 rounded-full shadow-lg backdrop-blur-sm transition-all ${
                        isInWishlist 
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
                  <div className="relative w-full h-60 flex justify-center items-center p-6 bg-gray-50 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={180}
                      height={180}
                      className="object-contain transition-transform duration-500 transform hover:scale-110"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col flex-grow p-6 pt-4">
                    <span className="text-xs text-purple-600 font-medium mb-2 uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h3 className="text-gray-900 font-semibold mb-3 line-clamp-2 group-hover:text-purple-700 transition-colors">
                      {product.title}
                    </h3>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        {product.oldPrice && (
                          <span className="text-gray-400 line-through text-sm">
                            ${product.oldPrice}
                          </span>
                        )}
                        <span className="text-2xl font-bold text-gray-900">
                          ${product.price}
                        </span>
                      </div>
                      <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-4 py-3 rounded-xl transition-all shadow-lg hover:scale-105">
                        <ShoppingCart size={18} />
                        <span className="hidden sm:inline">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg hover:scale-105">
            View All Best Sellers
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
              <Image src={modalProduct.image} alt={modalProduct.title} width={250} height={250} className="object-contain"/>
              <h2 className="text-xl font-bold text-gray-900">{modalProduct.title}</h2>
              <p className="text-gray-600 text-center">{modalProduct.description}</p>
              <span className="text-2xl font-bold text-gray-900">
                ${modalProduct.price}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BestSellers;
