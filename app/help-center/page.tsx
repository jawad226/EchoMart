"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown, Package, RotateCcw, CreditCard, User, ShieldCheck, Mail, MessageCircle, Loader2 } from "lucide-react";

interface FaqItem {
  category: string;
  question: string;
  answer: string;
}

const HelpCenterPage = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { icon: <Package size={24} />, title: "Orders", desc: "Track, change, or cancel orders" },
    { icon: <RotateCcw size={24} />, title: "Returns", desc: "Easy returns and refund status" },
    { icon: <CreditCard size={24} />, title: "Payments", desc: "Payment methods and billing" },
    { icon: <User size={24} />, title: "Account", desc: "Manage profile and security" },
    { icon: <ShieldCheck size={24} />, title: "Privacy", desc: "Data protection and policies" },
    { icon: <Mail size={24} />, title: "Contact", desc: "Direct support options" },
  ];

  const staticFaqs = [
    {
      category: "Orders",
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive an email with a tracking number and a link to track your package in real-time."
    },
    {
      category: "Returns",
      question: "What is your return policy?",
      answer: "We offer a 30-day hassle-free return policy for all unused items in their original packaging."
    },
    {
      category: "Shipping",
      question: "Do you ship internationally?",
      answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location."
    },
    {
      category: "Orders",
      question: "How do I change my shipping address?",
      answer: "You can change your shipping address within 2 hours of placing an order by contacting our support team or visiting your account dashboard."
    },
    {
      category: "Payments",
      question: "Is my payment information secure?",
      answer: "Absolutely. We use industry-standard encryption and professional payment gateways to ensure your data is always protected."
    }
  ];

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com";
        const res = await fetch(`${apiUrl}/faq`);
        if (res.ok) {
          const data = await res.json();
          setFaqs(data.length > 0 ? data : staticFaqs);
        } else {
          setFaqs(staticFaqs);
        }
      } catch (error) {
        console.error("Failed to fetch FAQs:", error);
        setFaqs(staticFaqs);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Help Hero */}
      <div className="bg-gray-900 pt-20 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">How can we help you?</h1>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for articles, topics, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm transition-all text-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16">
        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 animate-in fade-in duration-700">
          {categories.map((cat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer group hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.title}</h3>
              <p className="text-gray-500 text-sm">{cat.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-10 gap-4 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-gray-500 font-medium">Loading FAQs...</p>
              </div>
            ) : filteredFaqs.length > 0 ? (
              <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                {filteredFaqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <button
                      onClick={() => toggleFaq(i)}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{faq.category}</span>
                        <span className="font-semibold text-gray-900">{faq.question}</span>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform duration-300 ${activeFaq === i ? "rotate-180 text-blue-600" : ""}`}
                      />
                    </button>
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFaq === i ? "max-h-60 border-t border-gray-50" : "max-h-0"}`}
                    >
                      <div className="p-6 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
                </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
                <p className="text-gray-500 text-lg">No FAQs found matching your search.</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-blue-600 font-bold hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Side Support Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-blue-800 rounded-[2.5rem] p-8 text-white relative overflow-hidden sticky top-8 shadow-xl shadow-blue-900/10">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
                <p className="text-blue-100 mb-8 leading-relaxed">
                  Our friendly support team is always here to assist you with any questions or concerns.
                </p>
                <div className="space-y-4">
                  <a href="/contact" className="flex items-center gap-4 bg-white/10 hover:bg-white/20 p-4 rounded-2xl transition-colors border border-white/10 group">
                    <div className="p-3 bg-white text-blue-800 rounded-xl">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="font-bold">Contact Support</p>
                      <p className="text-xs text-blue-200">Get a reply within 24h</p>
                    </div>
                  </a>
                  <button className="w-full flex items-center gap-4 bg-white text-blue-800 p-4 rounded-2xl hover:bg-blue-50 transition-colors group">
                    <div className="p-3 bg-blue-100 text-blue-800 rounded-xl">
                      <MessageCircle size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold">Live Chat</p>
                      <p className="text-xs text-blue-600">Average wait: 2 mins</p>
                    </div>
                  </button>
                </div>
              </div>
              {/* Abstract Background Element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
