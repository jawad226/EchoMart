"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production.up.railway.app";
      const res = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: "Your message has been sent successfully! We'll get back to you soon." });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const errorData = await res.json();
        setStatus({ type: 'error', message: errorData.message || "Failed to send message. Please try again later." });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({ type: 'error', message: "An error occurred. Please check your connection and try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contact Header */}
      <div className="bg-white border-b border-gray-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-500">
            Have a question or just want to say hi? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Call us at</p>
                  <p className="font-semibold text-gray-900">123-456-7890</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-pink-50 text-pink-600 rounded-2xl">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email us at</p>
                  <p className="font-semibold text-gray-900 text-blue-600">info@looks.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Visit us at</p>
                  <p className="font-semibold text-gray-900 leading-relaxed">
                    500 Terry Francine Street <br />
                    San Francisco, CA 94158
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Live Support</h3>
              <button className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-2xl font-semibold hover:bg-black transition-colors">
                <MessageCircle size={20} />
                Chat with Us
              </button>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-gray-500 mb-8">We'll respond to your inquiry as soon as possible.</p>

            {status && (
              <div className={`mb-8 p-4 rounded-2xl text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                }`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700 ml-1">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    disabled={loading}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none disabled:opacity-50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    disabled={loading}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700 ml-1">Subject</label>
                <input
                  id="subject"
                  type="text"
                  required
                  disabled={loading}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700 ml-1">Message</label>
                <textarea
                  id="message"
                  required
                  disabled={loading}
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more about your inquiry..."
                  className="p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-blue-800 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-900 transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                      <Send size={20} />
                      Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <div className="w-full h-96 bg-gray-200 rounded-[3rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 relative group">
          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center text-gray-500 text-lg font-medium">
            <div className="flex flex-col items-center gap-4">
              <MapPin size={48} />
              Interactive Map Integration Coming Soon
            </div>
          </div>
          {/* Optional: Add an actual iframe if you want a real map */}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
