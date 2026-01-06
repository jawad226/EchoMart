"use client";

import React from "react";
import { CheckCircle, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, orderNumber }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleContinueShopping = () => {
    onClose();
    router.push("/Shop-all");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="relative p-8 text-center">
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>

          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full animate-bounce">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h3>
          <p className="text-gray-600 mb-6">
            Your order <span className="font-bold text-black">{orderNumber}</span> has been placed successfully. 
            We'll notify you when it's on the way!
          </p>

          <div className="bg-gray-50 rounded-2xl p-4 mb-8 text-sm flex justify-between items-center">
            <span className="text-gray-500">Order ID:</span>
            <span className="font-mono font-bold text-gray-900">{orderNumber}</span>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleContinueShopping}
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-95"
            >
              <ShoppingBag size={20} />
              Continue Shopping
            </button>
            <button
              onClick={() => {
                onClose();
                router.push("/order/success");
              }}
              className="w-full text-gray-500 font-semibold hover:text-black transition-all py-2"
            >
                View Order Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
