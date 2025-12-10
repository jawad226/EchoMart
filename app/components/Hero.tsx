// "use client";

// import Link from "next/link";

// export default function Hero() {
//   return (
//     <section
//       className="relative h-[83vh] flex items-center bg-center bg-cover bg-no-repeat"
//       style={{
//         backgroundImage: "url('/hdp.jpg')",
//       }}
//     >
//       {/* Overlay gradient for text visibility */}
//       <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

//       {/* Content */}
//       <div className="relative z-10 w-full px-6 md:px-12 flex items-center text-white">
//         <div className="max-w-lg space-y-6 text-left ml-0 md:ml-12">
//           <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
//             Best Prices
//           </span>

//           <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
//             Incredible Prices <br /> on All Your Favorite Items
//           </h1>

//           <p className="text-gray-200 text-base md:text-lg">
//             Get more for less on selected brands
//           </p>

//           <Link
//             href="/shop"
//             className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-full transition-all duration-300"
//           >
//             Shop Now
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative h-[70vh] sm:h-[75vh] md:h-[83vh] flex items-center bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/hdp.jpg')",
      }}
    >
      {/* Overlay gradient for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent md:from-black/60 md:via-black/40 md:to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-12 flex items-center justify-center md:justify-start text-white">
        <div className="max-w-xs sm:max-w-sm md:max-w-lg space-y-4 sm:space-y-5 md:space-y-6 text-center md:text-left mx-auto md:mx-0 md:ml-12">
          {/* Badge */}
          <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            Best Prices
          </span>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug sm:leading-tight">
            Incredible Prices <br className="hidden sm:block" /> 
            on All Your Favorite Items
          </h1>

          {/* Description */}
          <p className="text-gray-200 text-sm sm:text-base md:text-lg">
            Get more for less on selected brands
          </p>

          {/* CTA Button */}
          <Link
            href="/category/Earbuds"
            className="inline-block mt-2 sm:mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 sm:py-3 px-5 sm:px-6 rounded-full transition-all duration-300 text-sm sm:text-base"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Mobile-specific optimizations */}
      <style jsx>{`
        @media (max-width: 640px) {
          section {
            background-position: center 30%;
          }
        }
      `}</style>
    </section>
  );
}