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
  AlertCircle,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Calendar
} from 'lucide-react';

function OrdersContent() {
  const { ordersData, updateOrder, deleteOrder } = useDashboard();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter & Search Logic
  const filteredOrders = ordersData
    .filter(order => {
      const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
      const matchesSearch =
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toString().includes(searchQuery);
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by newest

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
      pill: `bg-${config.color}-50 text-${config.color}-700 border-${config.color}-200`,
      icon: `text-${config.color}-500`,
      iconComp: config.icon
    };
  };

  const tabs = ['all', 'Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Order Management</h2>
            <p className="text-slate-500 mt-1 font-medium">Track and manage your store's transactions.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all shadow-sm">
              <Download size={16} />
              Export CSV
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
              <ShoppingBag size={16} />
              Add Order
            </button>
          </div>
        </div>

        {/* Controls & Filters */}
        <div className="bg-white p-4 rounded-t-3xl border-x border-t border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Search */}
          <div className="relative w-full md:w-96">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Order ID, Customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setFilterStatus(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all whitespace-nowrap ${filterStatus === tab
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white border-x border-b border-slate-200 shadow-sm overflow-hidden mb-6 rounded-b-3xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100 text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
                  <th className="px-6 py-4 w-12 text-center">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  </th>
                  <th className="px-6 py-4">Order ID & Date</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Product Summary</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginatedOrders.map((order) => {
                  const styles = getStatusStyles(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-5 text-center">
                        <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500/20" />
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {order.orderNumber || `#${order.id.toString().slice(-6)}`}
                          </span>
                          <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                            <Calendar size={10} />
                            {new Date(order.date).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 uppercase">
                            {order.customer.slice(0, 2)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-700">{order.customer}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{order.email || 'No email'}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        {order.items && order.items.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-slate-600 line-clamp-1 max-w-[180px]">
                              {order.items[0].productName}
                            </span>
                            {order.items.length > 1 && (
                              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded-md w-fit">
                                +{order.items.length - 1} more
                              </span>
                            )}
                            </div>
                        ) : (
                          <span className="text-xs italic text-slate-300">No items</span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="relative group/select inline-block">
                          <select
                            disabled={updatingId === order.id.toString()}
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`pl-2.5 pr-8 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-tight border appearance-none transition-all outline-none ${styles.pill} cursor-pointer hover:shadow-sm disabled:opacity-50`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Paid">Paid</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                          <div className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none ${styles.icon}`}>
                            {styles.iconComp ? <styles.iconComp size={10} /> : <Clock size={10} />}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-sm font-black text-slate-900">
                          Rs {order.amount.toLocaleString().replace('Rs ', '')}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/dashboard/orders/${order.id}`}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="View Details"
                          >
                            <ExternalLink size={14} />
                          </Link>
                          <button
                            disabled={updatingId === order.id.toString()}
                            onClick={() => handleDelete(order.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {paginatedOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-20">
                      <div className="flex flex-col items-center justify-center mb-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-3">
                          <ShoppingBag size={24} />
                        </div>
                        <p className="text-sm font-bold text-slate-400">No orders found</p>
                        <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search query.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          {filteredOrders.length > 0 && (
            <div className="p-4 border-t border-slate-50 flex items-center justify-between bg-slate-50/30">
              <div className="text-xs font-medium text-slate-500">
                Showing <span className="font-bold text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-slate-900">{Math.min(currentPage * itemsPerPage, filteredOrders.length)}</span> of <span className="font-bold text-slate-900">{filteredOrders.length}</span> results
              </div>
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${currentPage === i + 1
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
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
