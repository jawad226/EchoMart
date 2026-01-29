"use client";

import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, toggleCart } = useCart();
  const { user, logout } = useAuth();
  const [categories, setCategories] = useState<{ name: string; slug: string }[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "register" | "forgot-password">("login");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production-176a.up.railway.app"}/categories`);
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-4 sm:px-6">
        {/* Mobile Menu Button and Logo */}
        <div className="flex items-center gap-4">
          <button
            className="sm:hidden p-1 rounded-md hover:bg-gray-100 transition"
            onClick={toggleMobileMenu}
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="https://res.cloudinary.com/dcfzqdk58/image/upload/v1768734900/Gemini_Generated_Image_gkmj63gkmj63gkmj-removebg-preview_nvsfed.png"
              alt="Echo Mart"
              width={200}
              height={40}
              className="h-8 md:h-10 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 sm:gap-5 text-gray-700">
          <Search className="w-5 h-5 cursor-pointer hover:text-black transition" />
          <div className="flex items-center gap-2 cursor-pointer group">
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/profile" className="flex items-center gap-2 py-1 px-2 rounded-lg hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                  ) : (
                      <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="hidden sm:inline text-sm font-bold text-slate-700">{user.name}</span>
                </Link>
                <div className="flex items-center gap-1">
                  {user.role === 'admin' && (
                    <Link
                      href="/dashboard"
                      className="text-[10px] font-extrabold uppercase tracking-widest bg-blue-50 text-blue-600 px-2 py-1 rounded-md hover:bg-blue-100 transition-colors"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => { logout(); setAuthView("login"); setIsAuthModalOpen(true); }}
                    className="text-[10px] font-extrabold uppercase tracking-widest bg-slate-50 text-slate-500 px-2 py-1 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
                <button
                  onClick={() => { setAuthView("login"); setIsAuthModalOpen(true); }}
                  className="p-2 rounded-full hover:bg-slate-50 transition-colors"
                >
                  <User className="w-5 h-5 text-slate-600" />
                </button>
            )}
          </div>
          <Heart className="w-5 h-5 cursor-pointer hover:text-black transition" />
          <button
            type="button"
            onClick={toggleCart}
            className="relative"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5 cursor-pointer hover:text-black transition" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] leading-none px-1.5 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Desktop Category Menu - Hidden on mobile */}
      <nav className="hidden sm:flex justify-center gap-8 bg-gray-50 py-2 text-sm text-gray-700">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={cat.slug === "Shop-all" || cat.slug === "Sale" ? `/${cat.slug}` : `/category/${cat.slug}`}
            className={`hover:text-black transition ${cat.slug === "Shop-all" || cat.slug === "Sale" ? "font-medium" : ""}`}
          >
            {cat.name}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleMobileMenu}
          />

          <div className="absolute left-0 top-0 w-4/5 max-w-xs h-full bg-white shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <span className="text-lg font-semibold">Menu</span>
              <button
                onClick={toggleMobileMenu}
                className="p-1 rounded-md hover:bg-gray-100 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col p-4">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={cat.slug === "Shop-all" || cat.slug === "Sale" ? `/${cat.slug}` : `/category/${cat.slug}`}
                  className={`py-3 px-2 hover:bg-gray-50 rounded-md border-b border-gray-100 ${cat.slug === "Shop-all" || cat.slug === "Sale" ? "font-medium" : ""}`}
                  onClick={toggleMobileMenu}
                >
                  {cat.name}
                </Link>
              ))}

              {user ? (
                <button
                  onClick={() => { logout(); toggleMobileMenu(); setAuthView("login"); setIsAuthModalOpen(true); }}
                  className="py-3 px-2 text-left hover:bg-gray-50 rounded-md font-medium mt-4 border-t border-gray-100 text-red-600"
                >
                  Logout ({user.name})
                </button>
              ) : (
                  <button
                    onClick={() => { setAuthView("login"); setIsAuthModalOpen(true); toggleMobileMenu(); }}
                    className="py-3 px-2 text-left hover:bg-gray-50 rounded-md font-medium mt-4 border-t border-gray-100"
                >
                  Log In
                  </button>
              )}
            </nav>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authView}
      />
    </header>
  );
};

export default Header;
