// "use client";
// import Image from "next/image";

// const PromoSection = () => {
//   return (
//     <section className="grid md:grid-cols-2 gap-4 p-6 bg-gray-200">
//       {/* Left Card - Smartphones */}
//       <div className="relative bg-red-600 text-white rounded-lg p-8 flex flex-col justify-center items-start overflow-hidden">
//         <div className="z-10">
//           <p className="text-sm font-light">Holiday Deals</p>
//           <h2 className="text-4xl font-bold mt-2">Up to 30% off</h2>
//           <p className="text-sm mt-2">Selected Earbuds Brands</p>
//           <button className="mt-4 bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-red-100 transition">
//             Shop
//           </button>
//         </div>
//         <Image
//           src="/EarFun.png"
//           alt="Smartphone"
//           width={280}
//           height={270}
//           className="absolute object-cover right-10 bottom-0 opacity-90"
//         />
//       </div>

//       {/* Right Card - Headphones */}
//       <div className="relative bg-purple-700 text-white rounded-lg p-8 flex flex-col justify-center items-start overflow-hidden">
//         <div className="z-10">
//           <p className="text-sm font-light">Just In</p>
//           <h2 className="text-4xl font-bold mt-2 leading-tight">
//             Take Your <br /> Sound Anywhere
//           </h2>
//           <p className="text-sm mt-2">Top Adaptor Brands</p>
//           <button className="mt-4 bg-white text-purple-700 px-6 py-2 rounded-full font-semibold hover:bg-purple-100 transition">
//             Shop
//           </button>
//         </div>
//         <Image
//           src="/adp.png"
//           alt="Headphones"
//           width={250}
//           height={250}
//           className="absolute object-cover right-10 bottom-0 opacity-90"
//         />
//       </div>
//     </section>
//   );
// };

// export default PromoSection;


"use client";
import Image from "next/image";
import Link from "next/link";

const PromoSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6 bg-gray-50">
      {/* Left Card - Smartphones */}
      <div className="relative bg-red-600 text-white rounded-lg p-6 sm:p-8 flex flex-col justify-center items-start overflow-hidden min-h-[250px] sm:min-h-[300px]">
        <div className="z-10 max-w-[60%] sm:max-w-none">
          <p className="text-xs sm:text-sm font-light">Holiday Deals</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2">Up to 30% off</h2>
          <p className="text-xs sm:text-sm mt-1 sm:mt-2">Selected Earbuds Brands</p>
          <Link href="/category/Earbuds">
            <button className="mt-3 sm:mt-4 bg-white text-red-600 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold hover:bg-red-100 transition text-xs sm:text-sm">
            Shop
          </button>
          </Link>
          
        </div>
        <Image
          src="/EarFun.png"
          alt="Smartphone"
          width={200}
          height={200}
          className="absolute object-cover right-2 sm:right-4 md:right-10 bottom-0 opacity-90 w-[120px] sm:w-[160px] md:w-[200px] lg:w-[280px]"
        />
      </div>

      {/* Right Card - Headphones */}
      <div className="relative bg-purple-700 text-white rounded-lg p-6 sm:p-8 flex flex-col justify-center items-start overflow-hidden min-h-[250px] sm:min-h-[300px]">
        <div className="z-10 max-w-[60%] sm:max-w-none">
          <p className="text-xs sm:text-sm font-light">Just In</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2 leading-tight">
            Take Your <br /> Sound Anywhere
          </h2>
          <p className="text-xs sm:text-sm mt-1 sm:mt-2">Top Adaptor Brands</p>
          <Link href="/category/Adaptor">
            <button className="mt-3 sm:mt-4 bg-white text-purple-700 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-semibold hover:bg-purple-100 transition text-xs sm:text-sm">
              Shop
            </button>
          </Link>
        </div>
        <Image
          src="/adp.png"
          alt="Headphones"
          width={180}
          height={180}
          className="absolute object-cover right-2 sm:right-4 md:right-10 bottom-0 opacity-90 w-[110px] sm:w-[140px] md:w-[180px] lg:w-[250px]"
        />
      </div>
    </section>
  );
};

export default PromoSection;