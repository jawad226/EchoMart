"use client";

import React, { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import { DashboardProvider, useDashboard } from '../../../context/DashboardContext';

function CustomersContent() {
  const { customersData, updateCustomer, deleteCustomer } = useDashboard();
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 text-white flex">
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Customer Management</h2>
          <p className="text-sm opacity-70">Manage your customer database</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search customers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Customers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white/5 rounded-lg p-5 border border-white/10 hover:bg-white/10 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-xl font-bold">
                    {customer.name[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{customer.name}</h3>
                    <p className="text-xs opacity-60">{customer.email}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs border ${
                  customer.status === 'Active' 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                }`}>
                  {customer.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-70">Orders:</span>
                  <span className="font-semibold">{customer.orders}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-70">Total Spent:</span>
                  <span className="font-semibold">{customer.totalSpent}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-70">Member Since:</span>
                  <span className="text-xs opacity-60">{customer.joinDate}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <select
                  value={customer.status}
                  onChange={(e) => handleStatusChange(customer.id, e.target.value as 'Active' | 'Inactive')}
                  className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <button
                  onClick={() => handleDelete(customer.id)}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-12 bg-white/5 rounded-lg border border-white/10">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-lg font-semibold mb-2">No customers found</h3>
            <p className="text-sm opacity-70">Try adjusting your search</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-xs opacity-70 mb-1">Total Customers</div>
            <div className="text-2xl font-bold">{customersData.length}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-xs opacity-70 mb-1">Active</div>
            <div className="text-2xl font-bold text-green-400">
              {customersData.filter(c => c.status === 'Active').length}
            </div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-xs opacity-70 mb-1">Avg Orders/Customer</div>
            <div className="text-2xl font-bold">
              {customersData.length > 0 
                ? (customersData.reduce((sum, c) => sum + c.orders, 0) / customersData.length).toFixed(1)
                : 0
              }
            </div>
          </div>
        </div>
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

