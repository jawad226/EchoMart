'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [clientData, setClientData] = useState<any>(null);

  useEffect(() => {
    const id = localStorage.getItem('lastOrderId');
    setOrderId(id);

    const userData = localStorage.getItem('userData');
    if (userData) {
      setClientData(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-black">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. We&apos;ve received your order and are getting it ready for shipment.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Order Number</span>
            <span className="text-lg font-bold text-gray-900">{orderId || "#3217"}</span>
          </div>
          {clientData && (
            <div className="border-t border-gray-200 pt-4">
              <span className="text-sm text-gray-500 uppercase tracking-wider font-semibold block mb-1">Customer</span>
              <span className="text-gray-900 font-medium">{clientData.name || 'Valued Customer'}</span>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Link href="/Shop-all" className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-900 transition-all">
            <ShoppingBag size={20} />
            Continue Shopping
          </Link>

          <Link href="/" className="w-full flex items-center justify-center gap-2 text-gray-600 font-semibold hover:text-black transition-all group">
            Go to Homepage
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}