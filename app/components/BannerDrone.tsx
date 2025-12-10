// // components/BannerDrone.tsx
// "use client";
// import Image from "next/image";

// export default function BannerDrone() {
//   return (
//     <section className="w-full h-[85vh] bg-gray-200 p-6 flex items-center justify-center">

//       {/* White Main Container */}
//       <div className="w-full h-full bg-white flex flex-col md:flex-row items-center overflow-hidden rounded-xl shadow-md">

//         {/* Left Content */}
//         <div className="md:w-1/2 px-20 space-y-4">
//           <span className="bg-red-500 text-white px-3 py-1 text-sm rounded-md">
//             Today’s Special
//           </span>

//           <h2 className="text-3xl text-black md:text-4xl font-bold leading-tight">
//             Best Aerial View <br /> in Town
//           </h2>

//           <h3 className="text-4xl font-extrabold text-purple-600">30% OFF</h3>

//           <p className="font-medium text-gray-600">
//             On professional camera drones
//           </p>

//           <p className="text-gray-400 text-sm">
//             Limited quantities. Stocks selling fast — check product details.
//           </p>

//           <button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full text-white mt-4 transition-all font-semibold shadow-md hover:scale-105">
//             Shop Now
//           </button>
//         </div>

//         {/* Right Image */}
//         <div
//           className="relative md:w-1/2 h-full overflow-hidden"
//           style={{
//             clipPath: "polygon(33% 0, 100% 0%, 100% 100%, 0% 100%)",
//           }}
//         >
//           <Image
//             src="/bannerd.jpg"
//             alt="Drone"
//             fill
//             className="object-cover"
//             priority
//           />
//         </div>

//       </div>
//     </section>
//   );
// }



// components/BannerDrone.tsx
"use client";
import Image from "next/image";

export default function BannerDrone() {
  return (
    <section className="w-full h-auto min-h-[70vh] md:h-[85vh] bg-gray-50 p-4 md:p-6 flex items-center justify-center">

      {/* White Main Container */}
      <div className="w-full h-full bg-white flex flex-col md:flex-row items-center overflow-hidden rounded-xl shadow-md">

        {/* Left Content */}
        <div className="w-full md:w-1/2 px-6 md:px-20 py-8 md:py-0 space-y-3 md:space-y-4 text-center md:text-left">
          <span className="bg-red-500 text-white px-3 py-1 text-sm rounded-md inline-block">
            Today's Special
          </span>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-black">
            Best Aerial View <br /> in Town
          </h2>

          <h3 className="text-3xl md:text-4xl font-extrabold text-purple-600">30% OFF</h3>

          <p className="font-medium text-gray-600">
            On professional camera drones
          </p>

          <p className="text-gray-400 text-sm max-w-md mx-auto md:mx-0">
            Limited quantities. Stocks selling fast — check product details.
          </p>

          <button className="bg-purple-600 hover:bg-purple-700 px-6 md:px-8 py-3 rounded-full text-white mt-4 transition-all font-semibold shadow-md hover:scale-105 active:scale-95">
            Shop Now
          </button>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
          {/* Mobile: Full rectangle image */}
          <div className="md:hidden w-full h-full">
            <Image
              src="/bannerd.jpg"
              alt="Drone"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Desktop: Clipped image */}
          <div className="hidden md:block w-full h-full relative"
            style={{
              clipPath: "polygon(33% 0, 100% 0%, 100% 100%, 0% 100%)",
            }}
          >
            <Image
              src="/bannerd.jpg"
              alt="Drone"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}