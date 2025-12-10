"use client";

import React, { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import { DashboardProvider, useDashboard } from '../../../context/DashboardContext';

function InventoryContent() {
  const { productsData, updateProduct } = useDashboard();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [lowStockFilter, setLowStockFilter] = useState(false);

  const categories = ['all', 'Earbuds', 'Adaptor', 'Headphones', 'MobilePhoneCase'];

  let filteredProducts = productsData;
  
  if (filterCategory !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === filterCategory);
  }
  
  if (lowStockFilter) {
    filteredProducts = filteredProducts.filter(p => p.stock < 20);
  }

  const handleStockUpdate = (id: string, newStock: number) => {
    updateProduct(id, { stock: newStock });
  };

  const totalValue = productsData.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStockCount = productsData.filter(p => p.stock < 20).length;
  const outOfStockCount = productsData.filter(p => p.stock === 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 text-white flex">
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Inventory Management</h2>
          <p className="text-sm opacity-70">Track and manage your product inventory</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-xs opacity-70 mb-1">Total Products</div>
            <div className="text-2xl font-bold">{productsData.length}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="text-xs opacity-70 mb-1">Total Inventory Value</div>
            <div className="text-2xl font-bold">Rs {totalValue.toLocaleString()}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-yellow-500/30">
            <div className="text-xs opacity-70 mb-1">Low Stock</div>
            <div className="text-2xl font-bold text-yellow-400">{lowStockCount}</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 border border-red-500/30">
            <div className="text-xs opacity-70 mb-1">Out of Stock</div>
            <div className="text-2xl font-bold text-red-400">{outOfStockCount}</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filterCategory === cat
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
          <button
            onClick={() => setLowStockFilter(!lowStockFilter)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              lowStockFilter
                ? 'bg-yellow-500 text-white'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            Low Stock Only
          </button>
        </div>

        {/* Inventory Table */}
        <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-4 py-3 text-xs opacity-70 uppercase">Product</th>
                  <th className="px-4 py-3 text-xs opacity-70 uppercase">Category</th>
                  <th className="px-4 py-3 text-xs opacity-70 uppercase">Price</th>
                  <th className="px-4 py-3 text-xs opacity-70 uppercase">Stock</th>
                  <th className="px-4 py-3 text-xs opacity-70 uppercase">Status</th>
                  <th className="px-4 py-3 text-xs opacity-70 uppercase">Value</th>
                  <th className="px-4 py-3 text-xs opacity-70 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const stockStatus = product.stock === 0 
                    ? 'out' 
                    : product.stock < 20 
                    ? 'low' 
                    : 'good';
                  
                  return (
                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium">{product.name}</div>
                        {product.brand && (
                          <div className="text-xs opacity-60">{product.brand}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm opacity-70">{product.category}</td>
                      <td className="px-4 py-3 font-semibold">Rs {product.price.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          value={product.stock}
                          onChange={(e) => handleStockUpdate(product.id, parseInt(e.target.value) || 0)}
                          className="w-20 bg-white/5 border border-white/10 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs border ${
                          stockStatus === 'good'
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : stockStatus === 'low'
                            ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                        }`}>
                          {stockStatus === 'good' ? 'In Stock' : stockStatus === 'low' ? 'Low Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-sm">
                        Rs {(product.price * product.stock).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleStockUpdate(product.id, product.stock + 10)}
                          className="text-blue-400 hover:text-blue-300 text-sm mr-2"
                        >
                          +10
                        </button>
                        <button
                          onClick={() => handleStockUpdate(product.id, Math.max(0, product.stock - 10))}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          -10
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-sm opacity-60">No products found</div>
          )}
        </div>

        {/* Stock Alerts */}
        {lowStockCount > 0 && (
          <div className="mt-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h3 className="font-semibold text-yellow-400">Low Stock Alert</h3>
            </div>
            <p className="text-sm opacity-70">
              {lowStockCount} product{lowStockCount !== 1 ? 's' : ''} {lowStockCount === 1 ? 'has' : 'have'} low stock. Consider restocking soon.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function InventoryPage() {
  return (
    <DashboardProvider>
      <InventoryContent />
    </DashboardProvider>
  );
}

