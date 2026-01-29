"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '../../components/dashboard/Sidebar';
import { DashboardProvider, useDashboard } from '../../../context/DashboardContext';
import { message } from 'antd';
import {
  ShoppingBag,
  ExternalLink,
  Trash2,
  Filter,
  Clock,
  CheckCircle2,
  Truck,
  XCircle,
  AlertCircle
} from 'lucide-react';

function OrdersContent() {
  const { ordersData, updateOrder, deleteOrder } = useDashboard();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filteredOrders = filterStatus === 'all'
    ? ordersData
    : ordersData.filter(order => order.status === filterStatus);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    const success = await updateOrder(id, { status: newStatus as any });
    if (success) message.success("Order status updated!");
    setUpdatingId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      setUpdatingId(id.toString());
      const success = await deleteOrder(id);
      if (success) message.success("Order deleted!");
      setUpdatingId(null);
    }
  };

  const statusMap: Record<string, { color: string; icon: any }> = {
    Paid: { color: 'emerald', icon: CheckCircle2 },
    Pending: { color: 'amber', icon: Clock },
    Shipped: { color: 'blue', icon: Truck },
    Delivered: { color: 'purple', icon: ShoppingBag },
    Cancelled: { color: 'red', icon: XCircle },
  };

  const getStatusStyles = (status: string) => {
    const config = statusMap[status] || { color: 'slate', icon: AlertCircle };
    return {
      pill: `bg-${config.color}-50 text-${config.color}-700 border-${config.color}-100`,
      icon: `text-${config.color}-500`,
      iconComp: config.icon
    };
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Order Management</h2>
            <p className="text-slate-500 mt-1">Track and fulfillment process for all store orders.</p>
          </div>
        </div>

        {/* Status Stats / Filters */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {Object.entries(statusCounts).map(([status, count]) => {
            const active = filterStatus === status;
            const { iconComp: Icon } = getStatusStyles(status);
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                 className={`flex flex-col p-4 rounded-2xl border transition-all ${active
                     ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/10'
                     : 'bg-white border-slate-100 hover:border-slate-300 shadow-sm'
                   }`}
               >
                 <div className="flex items-center justify-between mb-2">
                   <div className={`p-1.5 rounded-lg ${active ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                     {Icon ? <Icon size={16} /> : <Filter size={16} />}
                   </div>
                   <span className="text-xs font-black text-slate-900">{count}</span>
                 </div>
                 <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-blue-600' : 'text-slate-400'}`}>
                   {status}
                 </span>
               </button>
             );
           })}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h3 className="font-bold text-lg text-slate-800">Transactions Timeline</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Live sync active
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Customer Details</th>
                  <th className="px-6 py-4">Products Summary</th>
                  <th className="px-6 py-4">Total Amount</th>
                  <th className="px-6 py-4">Processing Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredOrders.map((order) => {
                  const styles = getStatusStyles(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-6 py-5">
                        <span className="text-[11px] font-black text-slate-300 group-hover:text-blue-600 transition-colors bg-slate-100/50 px-2 py-1 rounded-md">
                          #{order.orderNumber || order.id.toString().slice(-6)}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700">{order.customer}</span>
                          <span className="text-xs text-slate-400 font-medium">{order.email || 'No email provided'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          {order.items && order.items.length > 0 ? (
                            <div className="flex items-center gap-2">
                              <div className="bg-blue-50 text-blue-600 w-6 h-6 flex items-center justify-center rounded-md font-black text-[10px]">
                                {order.quantity}
                              </div>
                              <span className="text-xs font-bold text-slate-500 line-clamp-1 truncate max-w-[150px]">
                                {order.items[0].productName}{order.items.length > 1 && ` + ${order.items.length - 1} more`}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs italic text-slate-300">Package empty</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 font-black text-slate-900">
                        Rs {order.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-5">
                        <div className="relative group/select inline-block">
                          <select
                            disabled={updatingId === order.id.toString()}
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`pl-3 pr-8 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-tight border appearance-none transition-all outline-none ${styles.pill} cursor-pointer hover:shadow-sm`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                            <Clock size={12} />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/dashboard/orders/${order.id}`}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            title="View Order Details"
                          >
                            <ExternalLink size={16} />
                          </Link>
                          <button
                            disabled={updatingId === order.id.toString()}
                            onClick={() => handleDelete(order.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="Delete Order"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredOrders.length === 0 && (
            <div className="text-center py-24">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
                <ShoppingBag size={32} />
              </div>
              <p className="text-sm font-bold text-slate-400">No transactions found.</p>
            </div>
          )}
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
