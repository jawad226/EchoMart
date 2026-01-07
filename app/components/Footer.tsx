"use client";

import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6 text-gray-700">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Store Location */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Store Location</h3>
          <p className="text-sm leading-6">
            500 Terry Francine Street <br />
            San Francisco, CA 94158 <br />
            <a href="mailto:info@looks.com" className="text-blue-600 hover:underline">
              info@looks.com
            </a>
            <br />
            123-456-7890
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <Link href="#" aria-label="Facebook">
              <Facebook className="w-5 h-5 hover:text-black transition" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <Instagram className="w-5 h-5 hover:text-black transition" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Twitter className="w-5 h-5 hover:text-black transition" />
            </Link>
            <Link href="#" aria-label="YouTube">
              <Youtube className="w-5 h-5 hover:text-black transition" />
            </Link>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/Shop-all" className="hover:text-black">Shop All</Link></li>
            <li><Link href="/category/Earbuds" className="hover:text-black">Earbuds</Link></li>
            <li><Link href="/category/Adaptor" className="hover:text-black">Adaptor</Link></li>
            <li><Link href="/category/Headphones" className="hover:text-black">Headphones</Link></li>
            <li><Link href="/category/Mobile-Phone-Case" className="hover:text-black">Mobile Phone Case</Link></li>
            <li><Link href="/Sale" className="hover:text-black">Sale</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contact" className="hover:text-black">Contact Us</Link></li>
            <li><Link href="/help-center" className="hover:text-black">Help Center</Link></li>
            <li><Link href="/about" className="hover:text-black">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-black">Careers</Link></li>
          </ul>
        </div>

        {/* Policy */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Policy</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shipping-returns" className="hover:text-black">Shipping & Returns</Link></li>
            <li><Link href="/terms" className="hover:text-black">Terms & Conditions</Link></li>
            <li><Link href="/payment-methods" className="hover:text-black">Payment Methods</Link></li>
            <li><Link href="/faq" className="hover:text-black">FAQ</Link></li>
          </ul>
        </div>
      </div>

      {/* Payment Logos */}
      <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm">
        <p className="mb-4">We accept the following payment methods</p>
        <div className="flex justify-center gap-4 flex-wrap">
          {["visa", "mastercard", "amex", "paypal", "discover"].map((logo) => (
            <img
              key={logo}
              src={`https://upload.wikimedia.org/wikipedia/commons/${logo === "visa"
                ? "0/04/Visa.svg"
                : logo === "mastercard"
                ? "0/0e/Mastercard-logo.svg"
                : logo === "amex"
                ? "3/30/American_Express_logo_%282018%29.svg"
                : logo === "paypal"
                ? "b/b5/PayPal.svg"
                : "5/5a/Discover_Card_logo.svg"
              }`}
              alt={logo}
              className="h-6 w-auto"
            />
          ))}
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-xs text-gray-500 mt-6">
        © {new Date().getFullYear()} by Looks Shop.
      </div>
    </footer>
  );
}
