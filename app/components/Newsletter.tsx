// "use client";
// import { useState } from "react";

// export default function Newsletter() {
//   const [email, setEmail] = useState("");
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateEmail(email)) {
//       setSubmitted(true);
//       setError("");
//       // Here you would typically also send the email to your backend
//     } else {
//       setError("Please enter a valid email address.");
//     }
//   };

//   const validateEmail = (email: string) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email.toLowerCase());
//   };
//     return (
//     <div className="bg-gray-200 py-16">
//       <h2 className="text-3xl font-bold text-center mb-4">Subscribe to our Newsletter</h2>
//       <p className="text-center text-gray-600 mb-6">
//         Stay updated with the latest news and exclusive offers.
//       </p>
//         <form
//             onSubmit={handleSubmit}>
//             <div className="flex justify-center">
//                 <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Enter your email"  

//                     className="w-1/3 p-3 border border-gray-300 rounded-l-full focus:outline-none"
//                 />
//                 <button 
//                     type="submit"
//                     className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 rounded-r-full transition-all shadow-md"
//                 >
//                     Subscribe
//                 </button>
//             </div>
//         </form>
//         {submitted && <p className="text-center text-green-600 mt-4">Thank you for subscribing!</p>}
//         {error && <p className="text-center text-red-600 mt-4">{error}</p>}
//     </div>
//   );
// }

"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setSubmitted(true);
      setError("");
      // Here you would typically also send the email to your backend
    } else {
      setError("Please enter a valid email address.");
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  return (
    <div className="bg-gray-50 py-12 md:py-16 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Subscribe to our Newsletter</h2>
      <p className="text-center text-gray-600 mb-6 text-sm md:text-base max-w-md mx-auto">
        Stay updated with the latest news and exclusive offers.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row justify-center max-w-2xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"  
            className="w-full sm:w-auto sm:flex-1 p-3 border border-gray-300 rounded-full sm:rounded-l-full sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
          />
          <button 
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 mt-3 sm:mt-0 rounded-full sm:rounded-r-full sm:rounded-l-none transition-all shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Subscribe
          </button>
        </div>
      </form>
      
      {submitted && (
        <p className="text-center text-green-600 mt-4 text-sm md:text-base">
          Thank you for subscribing!
        </p>
      )}
      {error && (
        <p className="text-center text-red-600 mt-4 text-sm md:text-base">
          {error}
        </p>
      )}
    </div>
  );
}