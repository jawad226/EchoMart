"use client";

import React from 'react';
import Link from 'next/link';
import { useDashboard } from '../../../context/DashboardContext';

export default function RecentOrders() {
  const { ordersData } = useDashboard();
  const recentOrders = ordersData.slice(0, 5);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Shipped':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Delivered':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  return (
    <div className="bg-white/5 rounded-lg p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Recent Orders</h3>
        <Link
          href="/dashboard/orders"
          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          View All →
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs opacity-60 border-b border-white/10">
              <th className="py-3 px-2">Order ID</th>
              <th className="py-3 px-2">Customer</th>
              <th className="py-3 px-2">Product</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2">Amount</th>
              <th className="py-3 px-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-2 font-mono text-xs">{order.orderNumber || order.id}</td>
                <td className="py-3 px-2">{order.customer}</td>
                <td className="py-3 px-2">
                  {order.items && order.items.length > 0 ? (
                    <span>
                      {order.items[0].productName}
                      {order.items.length > 1 && <span className="opacity-60"> +{order.items.length - 1} more</span>}
                    </span>
                  ) : (
                    <span className="opacity-50">No items</span>
                  )}
                </td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-2 font-semibold">{order.amount}</td>
                <td className="py-3 px-2 text-xs opacity-70">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {recentOrders.length === 0 && (
          <div className="text-center py-8 text-sm opacity-60">No orders yet</div>
        )}
      </div>
    </div>
  );
}
