"use client";

import React, { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import { DashboardProvider, useDashboard } from '../../../context/DashboardContext';

function OrdersContent() {
  const { ordersData, updateOrder, deleteOrder } = useDashboard();
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredOrders = filterStatus === 'all' 
    ? ordersData 
    : ordersData.filter(order => order.status === filterStatus);

  const handleStatusChange = (id: string, newStatus: string) => {
    updateOrder(id, { status: newStatus as any });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      deleteOrder(id);
    }
  };

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

  const statusCounts = {
    all: ordersData.length,
    Paid: ordersData.filter(o => o.status === 'Paid').length,
    Pending: ordersData.filter(o => o.status === 'Pending').length,
    Shipped: ordersData.filter(o => o.status === 'Shipped').length,
    Delivered: ordersData.filter(o => o.status === 'Delivered').length,
    Cancelled: ordersData.filter(o => o.status === 'Cancelled').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 text-white flex">
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Order Management</h2>
          <p className="text-sm opacity-70">View and manage all customer orders</p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(statusCounts).map(([status, count]) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === status
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              {status} ({count})
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-4 py-3 text-xs opacity-70 uppercase">Order ID</th>
                  <th className="px-4 py-3 text-xs opacity-70 uppercase">Customer</th>
                  <th className="px-4 py-3 text-xs opacity-70 uppercase">Product</th>
                  <th className="px-4 py-3 text-xs opacity-70 uppercase">Quantity</th>
                  <th className="px-4 py-3 text-xs opacity-70 uppercase">Amount</th>
                  <th className="px-4 py-3 text-xs opacity-70 uppercase">Status</th>
                  <th className="px-4 py-3 text-xs opacity-70 uppercase">Date</th>
                  <th className="px-4 py-3 text-xs opacity-70 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 font-mono text-sm">{order.id}</td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        {order.email && (
                          <div className="text-xs opacity-60">{order.email}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">{order.product}</td>
                    <td className="px-4 py-3">{order.quantity}</td>
                    <td className="px-4 py-3 font-semibold">{order.amount}</td>
                    <td className="px-4 py-3">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-2 py-1 rounded text-xs border ${getStatusColor(order.status)} bg-transparent`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-sm opacity-70">{order.date}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-sm opacity-60">No orders found</div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-xs opacity-70 mb-1">Total Orders</div>
            <div className="text-2xl font-bold">{ordersData.length}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-xs opacity-70 mb-1">Pending</div>
            <div className="text-2xl font-bold text-yellow-400">{statusCounts.Pending}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-xs opacity-70 mb-1">Shipped</div>
            <div className="text-2xl font-bold text-blue-400">{statusCounts.Shipped}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-xs opacity-70 mb-1">Delivered</div>
            <div className="text-2xl font-bold text-green-400">{statusCounts.Delivered}</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function OrdersPage() {
  return (
    <DashboardProvider>
      <OrdersContent />
    </DashboardProvider>
  );
}

