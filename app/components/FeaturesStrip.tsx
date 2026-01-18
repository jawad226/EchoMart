import React from "react";
import { Truck, Headset, RefreshCw } from "lucide-react";

export default function FeaturesStrip() {
  const features = [
    {
      title: "EXCHANGE POLICY",
      description: "Exchange within 7 days",
      icon: <RefreshCw className="w-10 h-10 text-gray-400 mb-4" strokeWidth={1.5} />,
    },
    {
      title: "SHIPPING ALL OVER PAKISTAN",
      description: "Ship anywhere, rates available at checkout.",
      icon: <Truck className="w-10 h-10 text-gray-400 mb-4" strokeWidth={1.5} />,
    },
    {
      title: "24/7 SUPPORT",
      description: "Call us anytime at +92 319 0412258",
      icon: <Headset className="w-10 h-10 text-gray-400 mb-4" strokeWidth={1.5} />,
    },
  ];

  return (
    <div className="w-full bg-gray-50 border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center justify-center p-4">
              <div className="">
                {/* Icon wrapper for extra finish */}
                {feature.icon}
              </div>
              <h3 className="font-bold text-gray-900 tracking-wider text-sm md:text-base uppercase mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm md:text-sm font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
