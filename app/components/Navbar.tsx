// "use client";

// import { Search, Heart, ShoppingCart, User } from "lucide-react";
// import Link from "next/link";

// const Header = () => {
//   const categories = [
//     { name: "Earbuds", slug: "Earbuds" },
//     { name: "Adaptor", slug: "Adaptor" },
//     { name: "Headphones", slug: "Headphones" },
//     { name: "Mobile Phone Case", slug: "MobilePhoneCase" },
//   ];

//   return (
//     <header className="w-full border-b border-gray-200 bg-white">
//       {/* Top Bar */}
//       <div className="flex items-center justify-between px-6 py-4">
//         {/* Logo */}
//         <Link href="/" className="text-2xl font-semibold text-gray-900">
//           Looks Shop
//         </Link>

//         {/* Icons */}
//         <div className="flex items-center gap-5 text-gray-700">
//           <Search className="w-5 h-5 cursor-pointer hover:text-black transition" />
//           <div className="flex items-center gap-2 cursor-pointer hover:text-black transition">
//             <Link href="/Auth/login" className="hidden sm:inline text-sm">Log In</Link>
//           </div>
//           <Heart className="w-5 h-5 cursor-pointer hover:text-black transition" />
//           <Link href="/Cart"><ShoppingCart className="w-5 h-5 cursor-pointer hover:text-black transition" /></Link>
//         </div>
//       </div>

//       {/* Category Menu */}
//       <nav className="flex justify-center gap-8 bg-gray-50 py-2 text-sm text-gray-700">
//         <Link href="/Shop-all" className="hover:text-black font-medium">
//           Shop All
//         </Link>
//         {categories.map((cat) => (
//           <Link
//             key={cat.slug}
//             href={`/category/${cat.slug}`}
//             className="hover:text-black transition"
//           >
//             {cat.name}
//           </Link>
//         ))}
//         <Link href="/Sale" className="hover:text-black font-medium">
//           Sale
//         </Link>
//       </nav>
//     </header>
//   );
// };

// export default Header;

"use client";

import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { name: "Earbuds", slug: "Earbuds" },
    { name: "Adaptor", slug: "Adaptor" },
    { name: "Headphones", slug: "Headphones" },
    { name: "Mobile Phone Case", slug: "MobilePhoneCase" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        {/* Mobile Menu Button and Logo */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button - Visible only on mobile */}
          <button
            className="sm:hidden p-1 rounded-md hover:bg-gray-100 transition"
            onClick={toggleMobileMenu}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="text-xl sm:text-2xl font-semibold text-gray-900">
            Looks Shop
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 sm:gap-5 text-gray-700">
          <Search className="w-5 h-5 cursor-pointer hover:text-black transition" />
          <div className="flex items-center gap-2 cursor-pointer hover:text-black transition">
            <Link href="/auth/login" className="hidden sm:inline text-sm"> <User className="w-5 h-5" /></Link>

          </div>
          <Heart className="w-5 h-5 cursor-pointer hover:text-black transition" />
          <Link href="/Cart">
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-black transition" />
          </Link>
        </div>
      </div>

      {/* Desktop Category Menu - Hidden on mobile */}
      <nav className="hidden sm:flex justify-center gap-8 bg-gray-50 py-2 text-sm text-gray-700">
        <Link href="/Shop-all" className="hover:text-black font-medium">
          Shop All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="hover:text-black transition"
          >
            {cat.name}
          </Link>
        ))}
        <Link href="/Sale" className="hover:text-black font-medium">
          Sale
        </Link>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleMobileMenu}
          />

          {/* Menu Panel */}
          <div className="absolute left-0 top-0 w-4/5 max-w-xs h-full bg-white shadow-lg">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="text-lg font-semibold">Menu</span>
              <button
                onClick={toggleMobileMenu}
                className="p-1 rounded-md hover:bg-gray-100 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col p-4">
              <Link
                href="/Shop-all"
                className="py-3 px-2 hover:bg-gray-50 rounded-md font-medium border-b border-gray-100"
                onClick={toggleMobileMenu}
              >
                Shop All
              </Link>

              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="py-3 px-2 hover:bg-gray-50 rounded-md border-b border-gray-100"
                  onClick={toggleMobileMenu}
                >
                  {cat.name}
                </Link>
              ))}

              <Link
                href="/Sale"
                className="py-3 px-2 hover:bg-gray-50 rounded-md font-medium border-b border-gray-100"
                onClick={toggleMobileMenu}
              >
                Sale
              </Link>

              {/* Mobile Login Link */}
              <Link
                href="/auth/login"
                className="py-3 px-2 hover:bg-gray-50 rounded-md font-medium mt-4 border-t border-gray-100"
                onClick={toggleMobileMenu}
              >
                Log In
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;


// "use client";

// import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
// import Link from "next/link";
// import { useState } from "react";
// import Login from "../Auth/login/page";

// const Header = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [openLogin, setOpenLogin] = useState(false);

//   const categories = [
//     { name: "Earbuds", slug: "Earbuds" },
//     { name: "Adaptor", slug: "Adaptor" },
//     { name: "Headphones", slug: "Headphones" },
//     { name: "Mobile Phone Case", slug: "MobilePhoneCase" },
//   ];

//   const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

//   return (
//     <>
//       <header className="w-full border-b border-gray-200 bg-white">
//         {/* Top Bar */}
//         <div className="flex items-center justify-between px-4 py-4 sm:px-6">
//           {/* Mobile Menu + Logo */}
//           <div className="flex items-center gap-4">
//             <button 
//               className="sm:hidden p-1 rounded-md hover:bg-gray-100 transition"
//               onClick={toggleMobileMenu}
//             >
//               <Menu className="w-6 h-6" />
//             </button>

//             <Link href="/" className="text-xl sm:text-2xl font-semibold text-gray-900">
//               Looks Shop
//             </Link>
//           </div>

//           {/* Icons */}
//           <div className="flex items-center gap-4 sm:gap-5 text-gray-700">
//             <Search className="w-5 h-5 cursor-pointer hover:text-black transition" />

//             {/* Login Trigger */}
//             <div
//               className="flex items-center gap-2 cursor-pointer hover:text-black transition"
//               onClick={() => setOpenLogin(true)}
//             >
//               <User className="w-5 h-5" />
//             </div>

//             <Heart className="w-5 h-5 cursor-pointer hover:text-black transition" />
//             <Link href="/Cart">
//               <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-black transition" />
//             </Link>
//           </div>
//         </div>

//         {/* Desktop Category Menu */}
//         <nav className="hidden sm:flex justify-center gap-8 bg-gray-50 py-2 text-sm text-gray-700">
//           <Link href="/Shop-all" className="hover:text-black font-medium">Shop All</Link>
//           {categories.map((cat) => (
//             <Link 
//               key={cat.slug}
//               href={`/category/${cat.slug}`}
//               className="hover:text-black transition"
//             >
//               {cat.name}
//             </Link>
//           ))}
//           <Link href="/Sale" className="hover:text-black font-medium">Sale</Link>
//         </nav>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="fixed inset-0 z-50 sm:hidden">
//             <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleMobileMenu} />

//             <div className="absolute left-0 top-0 w-4/5 max-w-xs h-full bg-white shadow-lg">
//               <div className="flex items-center justify-between p-4 border-b border-gray-200">
//                 <span className="text-lg font-semibold">Menu</span>
//                 <button 
//                   onClick={toggleMobileMenu}
//                   className="p-1 rounded-md hover:bg-gray-100 transition"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               <nav className="flex flex-col p-4">
//                 <Link href="/Shop-all" className="py-3 px-2 border-b" onClick={toggleMobileMenu}>Shop All</Link>

//                 {categories.map((cat) => (
//                   <Link
//                     key={cat.slug}
//                     href={`/category/${cat.slug}`}
//                     className="py-3 px-2 border-b"
//                     onClick={toggleMobileMenu}
//                   >
//                     {cat.name}
//                   </Link>
//                 ))}

//                 <Link href="/Sale" className="py-3 px-2 border-b">Sale</Link>

//                 {/* Login in mobile menu */}
//                 <button
//                   className="py-3 px-2 text-left mt-4 font-medium border-t"
//                   onClick={() => {
//                     toggleMobileMenu();
//                     setOpenLogin(true);
//                   }}
//                 >
//                   Log In
//                 </button>
//               </nav>
//             </div>
//           </div>
//         )}
//       </header>

//       {/* Login Modal */}
//       {/* <Login isOpen={openLogin} onClose={() => setOpenLogin(false)} /> */}
//     </>
//   );
// };

// export default Header;
