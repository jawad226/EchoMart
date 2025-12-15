"use client";

import { useCart } from "@/context/CartContext";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md";

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    isOpen,
    toggleCart,
  } = useCart();

  // --------------------------
  // CALCULATE TOTAL AMOUNT
  // --------------------------
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transition-transform duration-300 z-50 
      ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button onClick={toggleCart}>
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* If Cart Empty */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[80%] text-center px-4">
          <div className="text-gray-400 text-6xl mb-4">🛒</div>
          <p className="text-lg text-gray-600">Your cart is empty.</p>

          <Link href="/Shop-all">
            <button
              onClick={toggleCart}
              className="mt-4 px-5 py-2 bg-black text-white rounded-md text-sm"
            >
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="p-4 space-y-4 overflow-y-auto h-[72%]">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between border-b pb-4"
              >
                {/* Product Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  width={60}
                  height={60}
                  className="rounded-md"
                />

                {/* Product Details */}
                <div className="flex-1 px-3">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    Rs. {item.price.toLocaleString()}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded-md"
                    >
                      -
                    </button>

                    <span className="text-sm font-medium">{item.qty}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 py-1 bg-gray-200 rounded-md"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-black hover:text-red-500 text-sm"
                >
                  <MdDelete size={22} />
                </button>
              </div>
            ))}
          </div>

          {/* Checkout Section (Fixed Bottom) */}
          <div className="p-4 border-t bg-white">
            <p className="text-xs text-gray-500">
              Shipping & taxes calculated at checkout
            </p>

            <Link href="/checkout">
              <button
                onClick={toggleCart}
                className="mt-3 w-full py-3 bg-blue-300 hover:bg-blue-800 text-white font-semibold text-sm rounded-md"
              >
                CHECK OUT • Rs.{totalPrice.toLocaleString()} PKR
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
