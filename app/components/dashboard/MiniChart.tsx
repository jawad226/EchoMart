"use client"; // important for Next.js 13+ app directory

import React, { useState, useEffect } from "react";

export default function MiniChart() {
  const [salesData, setSalesData] = useState("");
  const [ordersData, setOrdersData] = useState("");

  useEffect(() => {
    const generateDataPoints = () => {
      const points = [];
      const baseValue = 20;
      for (let i = 0; i <= 30; i++) {
        const variation = Math.sin(i / 5) * 5 + Math.random() * 3;
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
        return `${x},${parseFloat(y) + 8}`;
      })
      .join(" ");

    setSalesData(sales);
    setOrdersData(orders);
  }, []);

  // While loading on server, don't render chart
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
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ordersGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>

        <polygon fill="url(#salesGradient)" points={`0,30 ${salesData} 100,30`} />
        <polyline fill="none" stroke="#3b82f6" strokeWidth="2" points={salesData} />

        <polygon fill="url(#ordersGradient)" points={`0,30 ${ordersData} 100,30`} />
        <polyline fill="none" stroke="#10b981" strokeWidth="2" points={ordersData} />
      </svg>
    </div>
  );
}
