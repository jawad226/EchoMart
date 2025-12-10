// // components/BannerHelp.tsx
// "use client";
// import Image from "next/image";

// export default function BannerHelp() {
//   return (
//     <section className="w-full h-[80vh] bg-black flex items-center justify-center">

//       {/* Black Full Content Box */}
//       <div className="w-full h-full bg-black flex flex-col md:flex-row items-center overflow-hidden">

//         {/* LEFT TEXT */}
//         <div className="md:w-1/2 px-20 space-y-4 text-white">
//           <h2 className="text-4xl font-bold leading-tight">
//             Need Help? Check Out Our Help Center
//           </h2>

//           <p className="text-gray-300">
//             I'm a paragraph. Click here to add your own text and edit me. 
//             Let your users get to know you.
//           </p>

//           <button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full text-white mt-4 transition-all font-semibold shadow-md hover:scale-105">
//             Go to Help Center
//           </button>
//         </div>

//         {/* RIGHT IMAGE FULL + CLIP PATH */}
//         <div
//           className="relative md:w-1/2 h-full overflow-hidden"
//           style={{
//             clipPath: "polygon(33% 0, 100% 0%, 100% 100%, 0% 100%)",
//           }}
//         >
//           <Image
//             src="/best.jpg"
//             alt="Help support"
//             fill
//             priority
//             className="object-cover"
//           />

//           {/* Optional Black Overlay to Match Theme */}
//           <div className="absolute inset-0 bg-black/20"></div>
//         </div>

//       </div>
//     </section>
//   );
// }


// components/BannerHelp.tsx
"use client";
import Image from "next/image";

export default function BannerHelp() {
  return (
    <section className="w-full h-auto min-h-[60vh] md:h-[80vh] bg-black flex items-center justify-center">

      {/* Black Full Content Box */}
      <div className="w-full h-full bg-black flex flex-col md:flex-row items-center overflow-hidden">

        {/* LEFT TEXT */}
        <div className="w-full md:w-1/2 px-6 md:px-20 py-8 md:py-0 space-y-4 text-white text-center md:text-left">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            Need Help? Check Out Our Help Center
          </h2>

          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto md:mx-0">
            I'm a paragraph. Click here to add your own text and edit me. 
            Let your users get to know you.
          </p>

          <button className="bg-purple-600 hover:bg-purple-700 px-6 md:px-8 py-3 rounded-full text-white mt-4 transition-all font-semibold shadow-md hover:scale-105 active:scale-95">
            Go to Help Center
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden">
          {/* Mobile: Full rectangle image */}
          <div className="md:hidden w-full h-full">
            <Image
              src="/best.jpg"
              alt="Help support"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          
          {/* Desktop: Clipped image */}
          <div className="hidden md:block w-full h-full relative"
            style={{
              clipPath: "polygon(33% 0, 100% 0%, 100% 100%, 0% 100%)",
            }}
          >
            <Image
              src="/best.jpg"
              alt="Help support"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>

      </div>
    </section>
  );
}