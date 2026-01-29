"use client";

import React from 'react';
import Link from 'next/link';
import { useDashboard } from '../../../context/DashboardContext';

export default function RecentOrders() {
  const { ordersData } = useDashboard();
  const recentOrders = ordersData.slice(0, 5);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Shipped':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'Delivered':
        return 'bg-purple-50 text-purple-700 border-purple-100';
      case 'Cancelled':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg text-slate-800">Recent Orders</h3>
          <p className="text-xs text-slate-500 mt-1">Monitor recent transactions</p>
        </div>
        <Link
          href="/dashboard/orders"
          className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50">
              <th className="py-4 px-6">Order ID</th>
              <th className="py-4 px-6">Customer</th>
              <th className="py-4 px-6">Product</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Amount</th>
              <th className="py-4 px-6 text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {recentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-6 font-bold text-xs text-slate-400 group-hover:text-blue-600 transition-colors">
                  #{order.orderNumber || order.id.toString().slice(-4)}
                </td>
                <td className="py-4 px-6 font-semibold text-slate-700">{order.customer}</td>
                <td className="py-4 px-6">
                  {order.items && order.items.length > 0 ? (
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-600">
                        {order.items[0].productName}
                      </span>
                      {order.items.length > 1 && (
                        <span className="text-[10px] font-bold text-slate-400">
                          + {order.items.length - 1} more items
                        </span>
                      )}
                    </div>
                  ) : (
                      <span className="text-slate-400 italic">No items</span>
                  )}
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-tight border ${getStatusStyles(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-6 font-bold text-slate-900">Rs {order.amount.toLocaleString()}</td>
                <td className="py-4 px-6 text-right text-xs font-medium text-slate-500">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {recentOrders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-2">📦</div>
            <p className="text-sm font-medium text-slate-400">No orders found yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
