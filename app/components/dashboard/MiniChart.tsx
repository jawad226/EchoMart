"use client"; 

import React, { useState, useEffect } from "react";

import { useDashboard } from '../../../context/DashboardContext';
import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export default function MiniChart({ days = 7 }: { days?: number }) {
  const { ordersData } = useDashboard();
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (!ordersData || ordersData.length === 0) return;

    // Process real data: Group by Date
    const groupedData: Record<string, { date: string; sales: number; orders: number; sortTime?: number }> = {};

    // Sort orders by date
    const sortedOrders = [...ordersData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Generate last 7 days keys ensuring we show even empty days if needed, 
    // but for now let's just map the data we have for a cleaner look

    // Filter orders based on the selected time range (days)
    const now = new Date();
    const cutoffDate = new Date();
    cutoffDate.setDate(now.getDate() - days);

    const filteredOrders = sortedOrders.filter(order => new Date(order.date) >= cutoffDate);

    filteredOrders.forEach(order => {
      // Parse "Rs 1,234" -> 1234
      const amount = parseFloat(order.amount.replace(/[^0-9.-]+/g, ""));
      const dateObj = new Date(order.date);
      const dateKey = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      if (!groupedData[dateKey]) {
        groupedData[dateKey] = { date: dateKey, sales: 0, orders: 0, sortTime: dateObj.getTime() };
      }
      groupedData[dateKey].sales += amount;
      groupedData[dateKey].orders += 1;
    });

    // Convert to array and sort by time
    let dataArray = Object.values(groupedData).sort((a: any, b: any) => a.sortTime - b.sortTime);

    // Ensure we fill in gaps if needed, or just show available data points.
    // For a smoother chart, we might want to ensure at least some points exist.

    setChartData(dataArray);

  }, [ordersData, days]);

  if (!ordersData) return <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm">Loading data...</div>;
  if (chartData.length === 0) return <div className="h-full w-full flex items-center justify-center text-slate-400 text-sm">No sales data available yet</div>;




  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#64748B' }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: '#64748B' }}
            dx={-10}
          />
          <Tooltip
            cursor={{ fill: '#F1F5F9' }}
            contentStyle={{
              backgroundColor: '#1E293B',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            labelStyle={{ color: '#94A3B8', marginBottom: '0.5rem', fontSize: '0.75rem' }}
            itemStyle={{ fontSize: '0.875rem', padding: 0 }}
            formatter={(value: any, name: any) => [
              name === 'sales' ? `Rs ${value.toLocaleString()}` : value,
              name === 'sales' ? 'Revenue' : 'Orders'
            ]}
          />
          <Bar
            dataKey="sales"
            fill="#3b82f6"
            radius={[4, 4, 0, 0]}
            name="sales"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
