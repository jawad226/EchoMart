// "use client";
// import Image from "next/image";
// import Link from "next/link";

// export default function PromoBanner() {
//   return (
//     <section className="w-full  h-[90vh] bg-gray-200 p-6 flex items-center justify-center">

//       {/* Full White Content Box */}
//       <div className="w-full h-full bg-white flex flex-col md:flex-row overflow-hidden rounded-xl shadow-md">

//         {/* LEFT IMAGE SIDE */}
//         <div
//           className="relative w-full md:w-1/2 h-full overflow-hidden"
//           style={{
//             clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
//           }}
//         >
//           <Image
//             src="/hd.jpg"
//             alt="Promo Product"
//             fill
//             priority
//             className="object-cover"
//           />

//           {/* Badge */}
//           <div className="absolute top-6 right-6 bg-red-600 text-white text-lg font-semibold px-6 py-4 rounded-full rotate-[15deg] shadow-xl">
//             Best Price
//           </div>
//         </div>

//         {/* RIGHT TEXT CONTENT */}
//         <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-10">

//           <p className="text-gray-600 text-xl font-medium mb-2">Save up to</p>

//           <h1 className="text-black text-6xl md:text-7xl font-extrabold mb-4">
//             $150
//           </h1>

//           <p className="text-gray-700 text-xl mb-3">
//             on selected laptop & tablets brands
//           </p>

//           <p className="text-gray-400 text-sm mb-8">Terms and conditions apply</p>

//           <Link href="" className="px-10 py-4 bg-purple-600 hover:bg-purple-700 transition-all text-white rounded-full font-semibold text-lg shadow-md">
//             Shop Now
//           </Link>

//         </div>

//       </div>
//     </section>
//   );
// }


"use client";
import Image from "next/image";
import Link from "next/link";

export default function PromoBanner() {
  return (
    <section className="w-full h-auto min-h-[70vh] md:h-[90vh] bg-gray-50 p-4 md:p-6 flex items-center justify-center">

      {/* Full White Content Box */}
      <div className="w-full h-full bg-white flex flex-col md:flex-row overflow-hidden rounded-xl shadow-md">

        {/* LEFT IMAGE SIDE */}
        <div className="relative w-full md:w-1/2 h-64 md:h-full overflow-hidden">
          {/* Mobile: Full rectangle image */}
          <div className="md:hidden w-full h-full">
            <Image
              src="/hd.jpg"
              alt="Promo Product"
              fill
              priority
              className="object-cover"
            />
            
            {/* Badge for mobile */}
            <div className="absolute top-4 right-4 bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-full rotate-[15deg] shadow-xl">
              Best Price
            </div>
          </div>
          
          {/* Desktop: Clipped image */}
          <div className="hidden md:block w-full h-full relative"
            style={{
              clipPath: "polygon(0 0, 100% 0, 80% 100%, 0% 100%)",
            }}
          >
            <Image
              src="/hd.jpg"
              alt="Promo Product"
              fill
              priority
              className="object-cover"
            />

            {/* Badge for desktop */}
            <div className="absolute top-6 right-6 bg-red-600 text-white text-lg font-semibold px-6 py-4 rounded-full rotate-[15deg] shadow-xl">
              Best Price
            </div>
          </div>
        </div>

        {/* RIGHT TEXT CONTENT */}
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-10 py-8 md:py-0 text-center md:text-left">

          <p className="text-gray-600 text-lg md:text-xl font-medium mb-2">Save up to</p>

          <h1 className="text-black text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4">
            $150
          </h1>

          <p className="text-gray-700 text-lg md:text-xl mb-3 max-w-md mx-auto md:mx-0">
            on selected laptop & tablets brands
          </p>

          <p className="text-gray-400 text-sm mb-6 md:mb-8">Terms and conditions apply</p>

          <Link 
            href="/category/Earbuds" 
            className="px-8 md:px-10 py-3 md:py-4 bg-purple-600 hover:bg-purple-700 transition-all text-white rounded-full font-semibold text-base md:text-lg shadow-md hover:scale-105 active:scale-95 inline-block w-fit mx-auto md:mx-0"
          >
            Shop Now
          </Link>

        </div>

      </div>
    </section>
  );
}