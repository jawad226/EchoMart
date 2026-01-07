"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, Send } from "lucide-react";

export default function FAQPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      category: "General",
      q: "What is Looks Shop?",
      a: "Looks Shop is a premier e-commerce platform dedicated to providing high-quality electronics, accessories, and tech lifestyle products."
    },
    {
      category: "Orders",
      q: "Can I change my order after it's placed?",
      a: "Orders can be modified within 2 hours of placement. Please contact our support team immediately if you need to make changes."
    },
    {
      category: "Shipping",
      q: "How long does shipping take?",
      a: "Domestic orders typically take 3-5 business days. International orders can take 7-14 business days depending on the region."
    },
    {
      category: "Returns",
      q: "What if I receive a damaged item?",
      a: "If your item arrives damaged, please take a photo and contact us within 48 hours for a free replacement or full refund."
    },
    {
      category: "Payments",
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and various local payment options."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
            <HelpCircle size={16} />
            Help Center
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Find quick answers to common questions about our products, shipping, and more.
          </p>
        </div>

        <div className="space-y-4 mb-20">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <button
                onClick={() => setActiveFaq(activeFaq === i ? null : index)}
                className="w-full flex items-center justify-between p-8 text-left group"
              >
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2 block">{faq.category}</span>
                  <span className="text-lg font-bold text-gray-900 group-hover:text-blue-800 transition-colors">{faq.q}</span>
                </div>
                <div className={`p-2 rounded-xl transition-all duration-300 ${activeFaq === i ? "bg-blue-600 text-white rotate-180" : "bg-gray-50 text-gray-400"}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFaq === i ? "max-h-60" : "max-h-0"}`}
              >
                <div className="p-8 pt-0 text-gray-600 leading-relaxed text-lg border-t border-gray-50 mt-4">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="bg-gray-900 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <h2 className="text-3xl font-bold mb-6">Still have questions?</h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed">
            If you couldn't find the answer you were looking for, our team is always ready to help you out.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/contact" className="w-full sm:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              <Send size={18} />
              Contact Support
            </a>
            <button className="w-full sm:w-auto bg-white/10 text-white px-10 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center justify-center gap-2 border border-white/10">
              <MessageCircle size={18} />
              Chat With Us
            </button>
          </div>
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
        </div>
      </div>
    </div>
  );
}
