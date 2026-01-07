"use client";

import React from "react";
import { CreditCard, Lock, ShieldCheck, Zap } from "lucide-react";

export default function PaymentMethodsPage() {
  const methods = [
    { name: "Visa", icon: "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" },
    { name: "Mastercard", icon: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Mastercard-logo.svg" },
    { name: "American Express", icon: "https://upload.wikimedia.org/wikipedia/commons/b/b3/American_Express_logo_%282018%29.svg" },
    { name: "PayPal", icon: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-blue-800 p-12 text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Payment Methods</h1>
          <p className="text-blue-100">Safe, secure, and flexible payment options for you.</p>
        </div>

        <div className="p-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16">
            {methods.map((method) => (
              <div key={method.name} className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <img src={method.icon} alt={method.name} className="h-8 w-auto grayscale group-hover:grayscale-0 transition-all" />
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{method.name}</span>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Lock size={28} />
              </div>
              <h3 className="font-bold text-gray-900">Highly Secure</h3>
              <p className="text-sm text-gray-500 leading-relaxed">We use AES-256 encryption to protect your data.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck size={28} />
              </div>
              <h3 className="font-bold text-gray-900">Fraud Protection</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Advanced AI monitoring for all transactions.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto">
                <Zap size={28} />
              </div>
              <h3 className="font-bold text-gray-900">Instant Approval</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Payments are processed and confirmed instantly.</p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="p-4 bg-white/10 rounded-3xl">
              <CreditCard size={48} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Shopping built on trust</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your payment safety is our priority. We never store your full card details on our servers, 
                ensuring a worry-free checkout experience every time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
