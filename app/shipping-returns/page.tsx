"use client";

import React from "react";
import { Truck, RotateCcw, ShieldCheck, Globe } from "lucide-react";

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-900 text-white p-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Shipping & Returns</h1>
          <p className="text-gray-400">Everything you need to know about our delivery and exchange process.</p>
        </div>

        <div className="p-12 space-y-16">
          {/* Shipping Section */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <Truck size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Shipping Policy</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">Domestic Shipping</h3>
                <p className="text-gray-600 leading-relaxed">
                  We offer standard and express shipping for all domestic orders. Standard shipping usually takes 3-5 business days, 
                  while express shipping arrives within 1-2 business days.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-gray-800">International Shipping</h3>
                <p className="text-gray-600 leading-relaxed">
                  We ship to over 50 countries worldwide. International delivery times vary by location but generally range 
                  between 7-14 business days.
                </p>
              </div>
            </div>
          </section>

          {/* Return Section */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-pink-50 text-pink-600 rounded-2xl">
                <RotateCcw size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Returns & Exchanges</h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-8">
              We want you to be completely satisfied with your purchase. If for any reason you are not happy, 
              you can return or exchange any unused item in its original packaging within 30 days of delivery.
            </p>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">How to return?</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-600">
                <li>Visit our Help Center and select "Initiate Return".</li>
                <li>Print your prepaid shipping label sent to your email.</li>
                <li>Pack the item securely and drop it off at any authorized location.</li>
                <li>Your refund will be processed within 5-7 business days after we receive the item.</li>
              </ol>
            </div>
          </section>

          {/* Guarantee Section */}
          <section className="pt-8 border-t border-gray-100 grid md:grid-cols-2 gap-12">
            <div className="flex gap-4">
              <ShieldCheck className="text-green-600 shrink-0" size={32} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Secure Packaging</h3>
                <p className="text-sm text-gray-500">Every item is checked and packed with high-grade protection.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Globe className="text-blue-600 shrink-0" size={32} />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Worldwide Support</h3>
                <p className="text-sm text-gray-500">Our support team is available globally for delivery tracking.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
