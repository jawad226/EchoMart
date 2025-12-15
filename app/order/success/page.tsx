"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-4xl w-full rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        {/* LEFT */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full border-2 border-black flex items-center justify-center">
              ✓
            </div>
            <h1 className="text-2xl font-semibold">
              Thank you!
            </h1>
          </div>

          <p className="text-gray-700 mb-2">
            Order ID: <b>{orderId}</b>
          </p>

          <p className="text-gray-600 mb-6">
            Your order is confirmed.  
            You’ll receive a confirmation email shortly.
          </p>

          {/* Fake map placeholder */}
          <div className="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center text-gray-500 text-sm">
            Shipping address map preview
          </div>

          <div className="space-y-2 text-sm text-gray-600">
            <p>📦 Estimated delivery: 3–5 business days</p>
            <p>💳 Payment status: Paid</p>
          </div>

          <Link
            href="/"
            className="inline-block mt-8 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900"
          >
            Continue Shopping
          </Link>
        </div>

        {/* RIGHT */}
        <div className="bg-gray-50 p-8 border-l">
          <h2 className="font-semibold mb-4">Order Summary</h2>

          <div className="flex items-center gap-3 mb-4">
            <Image
              src="https://via.placeholder.com/60"
              width={60}
              height={60}
              alt="Product"
              className="rounded-md border"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">Product Name</p>
              <p className="text-xs text-gray-500">Qty: 1</p>
            </div>
            <p className="text-sm font-semibold">Rs. 1,247</p>
          </div>

          <div className="border-t pt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. 1,247</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Rs. 200</span>
            </div>
            <div className="flex justify-between font-semibold text-base pt-2">
              <span>Total</span>
              <span>Rs. 1,447</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
