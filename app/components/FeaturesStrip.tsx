// // const features = [
// //   {
// //     title: "Curb-side pickup",
// //     icon: (
// //       <svg
// //         width="52"
// //         height="52"
// //         viewBox="0 0 24 24"
// //         fill="none"
// //         stroke="#8b5cf6"
// //         strokeWidth="1.8"
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //       >
// //         <path d="M3 13h13l3 5H6l-3-5z" />
// //         <circle cx="7" cy="19" r="2" stroke="black" />
// //         <circle cx="17" cy="19" r="2" stroke="black" />
// //       </svg>
// //     ),
// //   },
// //   {
// //     title: "Free shipping on orders over Rs 5,000",
// //     icon: (
// //       <svg
// //         width="42"
// //         height="42"
// //         viewBox="0 0 24 24"
// //         fill="none"
// //         stroke="#8b5cf6"
// //         strokeWidth="1.8"
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //       >
// //         <rect x="3" y="3" width="18" height="13" rx="2" stroke="black" />
// //         <path d="M3 8h18" />
// //       </svg>
// //     ),
// //   },
// //   {
// //     title: "Low prices guaranteed",
// //     icon: (
// //       <svg
// //         width="42"
// //         height="42"
// //         viewBox="0 0 24 24"
// //         fill="none"
// //         stroke="#8b5cf6"
// //         strokeWidth="1.8"
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //       >
// //         <path d="M12 2v20" stroke="black" />
// //         <path d="M8 6h8" />
// //         <path d="M8 18h8" />
// //       </svg>
// //     ),
// //   },
// //   {
// //     title: "Available to you 24/7",
// //     icon: (
// //       <svg
// //         width="42"
// //         height="42"
// //         viewBox="0 0 24 24"
// //         fill="none"
// //         stroke="#8b5cf6"
// //         strokeWidth="1.8"
// //         strokeLinecap="round"
// //         strokeLinejoin="round"
// //       >
// //         <circle cx="12" cy="12" r="9" stroke="black" />
// //         <path d="M12 7v5l3 2" />
// //       </svg>
// //     ),
// //   },
// // ];

// // export default function FeaturesStrip() {
// //   return (
// //     <div className="w-full bg-gray-200 pb-6 px-6">
// //       {/* Centered white box */}
// //       <div className=" mx-auto bg-white px-6 sm:px-10 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

// //         {features.map((f) => (
// //           <div key={f.title} className="flex items-center space-x-3">
// //             <div>{f.icon}</div>
// //             <p className="font-medium text-gray-900">{f.title}</p>
// //           </div>
// //         ))}

// //       </div>
// //     </div>
// //   );
// // }


// const features = [
//   {
//     title: "Curb-side pickup",
//     icon: (
//       <svg
//         width="52"
//         height="52"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="#8b5cf6"
//         strokeWidth="1.8"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
//       >
//         <path d="M3 13h13l3 5H6l-3-5z" />
//         <circle cx="7" cy="19" r="2" stroke="black" />
//         <circle cx="17" cy="19" r="2" stroke="black" />
//       </svg>
//     ),
//   },
//   {
//     title: "Free shipping on orders over Rs 5,000",
//     icon: (
//       <svg
//         width="42"
//         height="42"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="#8b5cf6"
//         strokeWidth="1.8"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
//       >
//         <rect x="3" y="3" width="18" height="13" rx="2" stroke="black" />
//         <path d="M3 8h18" />
//       </svg>
//     ),
//   },
//   {
//     title: "Low prices guaranteed",
//     icon: (
//       <svg
//         width="42"
//         height="42"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="#8b5cf6"
//         strokeWidth="1.8"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
//       >
//         <path d="M12 2v20" stroke="black" />
//         <path d="M8 6h8" />
//         <path d="M8 18h8" />
//       </svg>
//     ),
//   },
//   {
//     title: "Available to you 24/7",
//     icon: (
//       <svg
//         width="42"
//         height="42"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="#8b5cf6"
//         strokeWidth="1.8"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10"
//       >
//         <circle cx="12" cy="12" r="9" stroke="black" />
//         <path d="M12 7v5l3 2" />
//       </svg>
//     ),
//   },
// ];

// export default function FeaturesStrip() {
//   return (
//     <div className="w-full bg-gray-200 pb-6 px-4 sm:px-6">
//       {/* Centered white box */}
//       <div className="max-w-7xl mx-auto bg-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 rounded-lg shadow-sm">
//         {features.map((f) => (
//           <div key={f.title} className="flex items-center space-x-3 sm:space-x-4">
//             <div className="flex-shrink-0">{f.icon}</div>
//             <p className="font-medium text-gray-900 text-sm sm:text-base leading-tight">
//               {f.title}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

const features = [
  {
    title: "Curb-side pickup",
    icon: (
      <svg
        width="52"
        height="52"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
      >
        <path d="M3 13h13l3 5H6l-3-5z" />
        <circle cx="7" cy="19" r="2" stroke="white" />
        <circle cx="17" cy="19" r="2" stroke="white" />
      </svg>
    ),
    color: "bg-purple-600",
  },
  {
    title: "Free shipping on orders over Rs 5,000",
    icon: (
      <svg
        width="42"
        height="42"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
      >
        <rect x="3" y="3" width="18" height="13" rx="2" stroke="white" />
        <path d="M3 8h18" />
      </svg>
    ),
    color: "bg-indigo-500",
  },
  {
    title: "Low prices guaranteed",
    icon: (
      <svg
        width="42"
        height="42"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
      >
        <path d="M12 2v20" />
        <path d="M8 6h8" />
        <path d="M8 18h8" />
      </svg>
    ),
    color: "bg-green-500",
  },
  {
    title: "Available to you 24/7",
    icon: (
      <svg
        width="42"
        height="42"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    color: "bg-pink-500",
  },
];

export default function FeaturesStrip() {
  return (
    <div className="w-full bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {features.map((f) => (
          <div
            key={f.title}
            className="flex items-center space-x-4 p-4 md:p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div
              className={`flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full ${f.color} flex-shrink-0 transition-transform duration-300 hover:scale-110`}
            >
              {f.icon}
            </div>
            <p className="font-medium text-gray-900 text-sm sm:text-base md:text-lg leading-snug">
              {f.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
