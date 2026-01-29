"use client";

import React, { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import { DashboardProvider, useDashboard } from '../../../context/DashboardContext';
import {
  Users,
  Search,
  Trash2,
  UserPlus,
  Mail,
  Calendar,
  CreditCard,
  CheckCircle2,
  XCircle,
  MoreVertical
} from 'lucide-react';

function CustomersContent() {
  const { customersData, addCustomer, updateCustomer, deleteCustomer } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    orders: 0,
    totalSpent: '',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'Active' as 'Active' | 'Inactive',
  });
  const [error, setError] = useState<string | null>(null);

  const filteredCustomers = customersData.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (id: string, status: 'Active' | 'Inactive') => {
    updateCustomer(id, { status });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this customer?')) {
      deleteCustomer(id);
    }
  };

  const handleAddCustomer = () => {
    if (!newCustomer.name.trim() || !newCustomer.email.trim()) {
      setError('Name and email are required');
      return;
    }

    addCustomer({
      id: `c-${Date.now()}`,
      ...newCustomer,
    });

    setNewCustomer({
      name: '',
      email: '',
      orders: 0,
      totalSpent: '',
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
    });
    setError(null);
    setIsPanelOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">User Intelligence</h2>
            <p className="text-slate-500 mt-1">Manage and segment your customer database.</p>
          </div>
          <button
            onClick={() => setIsPanelOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-100 flex items-center gap-2 transition-all active:scale-95"
          >
            <UserPlus size={20} />
            <span>New Customer</span>
          </button>
        </div>

        {/* Filters and Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-medium shadow-sm hover:border-slate-300"
            />
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Growth</p>
              <p className="text-xl font-black text-slate-900">{customersData.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active</p>
              <p className="text-xl font-black text-emerald-600 leading-tight">
                {customersData.filter(c => c.status === 'Active').length}
              </p>
            </div>
          </div>
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-50/50 transition-colors duration-500"></div>

              <div className="flex items-start justify-between relative z-10 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                    {customer.name[0].toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 tracking-tight text-lg">{customer.name}</h3>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Mail size={12} />
                      <span className="text-xs font-bold font-mono">{customer.email}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-tighter border ${customer.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}>
                    {customer.status}
                  </span>
                  <button onClick={() => handleDelete(customer.id)} className="p-1.5 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                <div className="bg-slate-50/80 p-3 rounded-2xl border border-white">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    <CreditCard size={10} /> Orders
                  </div>
                  <span className="text-lg font-black text-slate-900">{customer.orders}</span>
                </div>
                <div className="bg-slate-50/80 p-3 rounded-2xl border border-white">
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    <Calendar size={10} /> Tenure
                  </div>
                  <span className="text-xs font-black text-slate-600 truncate block">{customer.joinDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50 relative z-10">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Value</span>
                  <span className="text-xl font-black text-blue-600">{customer.totalSpent}</span>
                </div>
                <div className="flex items-center gap-1">
                  <select
                    value={customer.status}
                    onChange={(e) => handleStatusChange(customer.id, e.target.value as 'Active' | 'Inactive')}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-black uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8 relative cursor-pointer"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-200 mt-8">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Users size={40} />
            </div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight">No match discovered</h3>
            <p className="text-sm font-bold text-slate-400 mt-1">Try refining your search parameters.</p>
          </div>
        )}

        {/* PANEL / MODAL FOR ADDING */}
        {isPanelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-fade-in border border-slate-100">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">Provision Account</h3>
                  <p className="text-slate-500 text-sm mt-1">Onboard a new customer to the platform.</p>
                </div>
                <button onClick={() => setIsPanelOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl">
                  <XCircle size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={newCustomer.name}
                      onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email Addr</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={newCustomer.email}
                      onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Initial Orders</label>
                    <input
                      type="number"
                      value={newCustomer.orders}
                      onChange={(e) => setNewCustomer({ ...newCustomer, orders: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Initial Spend</label>
                    <input
                      type="text"
                      placeholder="Rs 0"
                      value={newCustomer.totalSpent}
                      onChange={(e) => setNewCustomer({ ...newCustomer, totalSpent: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                    />
                  </div>
                </div>

                {error && <p className="text-xs text-red-500 font-bold px-1">{error}</p>}

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setIsPanelOpen(false)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCustomer}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-blue-100"
                  >
                    Save Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function CustomersPage() {
  return (
    <DashboardProvider>
      <CustomersContent />
    </DashboardProvider>
  );
}
