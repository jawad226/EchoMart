"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderFailedPage() {
  const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-lg text-center">

                <div className="w-12 h-12 mx-auto rounded-full border-2 border-red-500 flex items-center justify-center text-red-500 mb-4">
                    ✕
                </div>

                <h1 className="text-2xl font-semibold mb-2">
                    Payment Failed
                </h1>

                <p className="text-gray-600 mb-4">
                    Order ID: <b>{orderId}</b>
                </p>

                <p className="text-sm text-gray-500 mb-6">
                    Your payment could not be completed.
                    Please try again or choose another payment method.
                </p>

                <Link
                    href="/checkout"
                    className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900"
                >
                    Try Again
                </Link>
            </div>
        </div>
    );
}
