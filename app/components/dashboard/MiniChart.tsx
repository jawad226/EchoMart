"use client"; 

import React, { useState, useEffect } from "react";

export default function MiniChart() {
  const [salesData, setSalesData] = useState("");
  const [ordersData, setOrdersData] = useState("");

  useEffect(() => {
    const generateDataPoints = () => {
      const points = [];
      const baseValue = 15; // Lower base value for cleaner look
      for (let i = 0; i <= 30; i++) {
        // More smooth variation for "professional" look
        const variation = Math.sin(i / 4) * 6 + Math.cos(i / 8) * 3 + Math.random() * 2;
        const value = baseValue - variation;
        points.push(`${i * 3.33},${Math.max(2, Math.min(28, value))}`);
      }
      return points.join(" ");
    };

    const sales = generateDataPoints();
    const orders = sales
      .split(" ")
      .map((point) => {
        const [x, y] = point.split(",");
        return `${x},${Math.min(28, parseFloat(y) + 5)}`;
      })
      .join(" ");

    setSalesData(sales);
    setOrdersData(orders);
  }, []);

  if (!salesData || !ordersData) return null;

  return (
    <div className="w-full h-full">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="salesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ordersGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>

        <polygon fill="url(#salesGradient)" points={`0,30 ${salesData} 100,30`} />
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={salesData}
        />

        <polygon fill="url(#ordersGradient)" points={`0,30 ${ordersData} 100,30`} />
        <polyline
          fill="none"
          stroke="#10b981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={ordersData}
        />
      </svg>
    </div>
  );
}
