"use client";

import React from "react";
import { Shield, Star, Heart, Clock, Globe } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Our Story</h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
            Redefining the modern shopping experience through quality, innovation, and trust.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Founded in 2024, Looks Shop began with a simple goal: to provide high-quality electronics and accessories 
              that blend seamlessly into your lifestyle. We believe that technology should be accessible, durable, and 
              beautifully designed.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We carefully curate every product in our catalog, ensuring it meets our rigorous standards for performance 
              and aesthetics. From earbuds to adapted cases, we&apos;ve got you covered.
            </p>
          </div>
          <div className="bg-white p-1 rounded-3xl shadow-xl transform rotate-2">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
              alt="Team collaboration" 
              className="rounded-3xl w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Star size={28} />
              </div>
              <h3 className="font-bold text-gray-800 mb-3">Quality First</h3>
              <p className="text-gray-500 text-sm">We never compromise on the quality of our products.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Heart size={28} />
              </div>
              <h3 className="font-bold text-gray-800 mb-3">Customer Love</h3>
              <p className="text-gray-500 text-sm">Your satisfaction is our ultimate North Star.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Shield size={28} />
              </div>
              <h3 className="font-bold text-gray-800 mb-3">Transparency</h3>
              <p className="text-gray-500 text-sm">Honest pricing and clear communication, always.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Globe size={28} />
              </div>
              <h3 className="font-bold text-gray-800 mb-3">Innovation</h3>
              <p className="text-gray-500 text-sm">Staying ahead with the latest in tech lifestyle.</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-900 rounded-[3rem] p-12 text-white grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">10k+</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">500+</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Products</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Support</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">15+</div>
            <div className="text-gray-400 text-sm uppercase tracking-wider">Countries</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
