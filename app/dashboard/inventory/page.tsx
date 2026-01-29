"use client";

import React, { useState } from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import { DashboardProvider, useDashboard } from '../../../context/DashboardContext';
import { message } from 'antd';
import {
  Package,
  Database,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Settings2,
  XCircle
} from 'lucide-react';

function InventoryContent() {
  const { productsData, updateProduct } = useDashboard();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [lowStockFilter, setLowStockFilter] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const categories = ['all', 'Earbuds', 'Adaptor', 'Headphones', 'MobilePhoneCase'];

  let filteredProducts = productsData;
  
  if (filterCategory !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === filterCategory);
  }
  
  if (lowStockFilter) {
    filteredProducts = filteredProducts.filter(p => p.stock < 20);
  }

  const handleStockUpdate = async (id: string, newStock: number) => {
    setUpdatingId(id);
    const success = await updateProduct(id, { stock: newStock });
    if (success) {
      message.success("Stock inventory synchronized!");
    } else {
      message.error("Link failure: Could not update inventory.");
    }
    setUpdatingId(null);
  };

  const totalValue = productsData.reduce((sum, p) => sum + (p.price * p.stock), 0);
  const lowStockCount = productsData.filter(p => p.stock < 20).length;
  const outOfStockCount = productsData.filter(p => p.stock === 0).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Inventory Command</h2>
          <p className="text-slate-500 mt-1">Real-time resource tracking and lifecycle management.</p>
        </div>

        {/* Dynamic Summary System */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-50/50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                  <Package size={20} />
                </div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50/50 px-2 py-0.5 rounded-md">SKU Count</span>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Stock Items</p>
              <h3 className="text-2xl font-black text-slate-900">{productsData.length}</h3>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-50/50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <TrendingUp size={20} />
                </div>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50/50 px-2 py-0.5 rounded-md">Market Value</span>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Asset Value</p>
              <h3 className="text-2xl font-black text-slate-900">Rs {totalValue.toLocaleString()}</h3>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-50/50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                  <AlertTriangle size={20} />
                </div>
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-50/50 px-2 py-0.5 rounded-md text-nowrap">Attention req.</span>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Low Reserves</p>
              <h3 className="text-2xl font-black text-amber-600">{lowStockCount}</h3>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-red-50/50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-2xl">
                  <XCircle size={20} />
                </div>
                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50/50 px-2 py-0.5 rounded-md text-nowrap">Null Stock</span>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Depleted SKUs</p>
              <h3 className="text-2xl font-black text-red-600">{outOfStockCount}</h3>
            </div>
          </div>
        </div>

        {/* Global Control Bar */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto no-scrollbar">
            <div className="flex items-center gap-1.5 px-3 border-r border-slate-100 mr-2 text-slate-400">
              <Filter size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Filter:</span>
            </div>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-tight transition-all whitespace-nowrap ${filterCategory === cat
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                  : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                  }`}
              >
                {cat === 'all' ? 'Universal' : cat}
              </button>
            ))}
          </div>
          <button
            onClick={() => setLowStockFilter(!lowStockFilter)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg transition-all ${
              lowStockFilter
              ? 'bg-amber-600 text-white shadow-amber-100'
              : 'bg-white border border-slate-200 text-slate-400 shadow-slate-100'
            }`}
          >
            <AlertTriangle size={14} />
            <span>Critical Reserve Only</span>
          </button>
        </div>

        {/* Asset Table Interface */}
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-8 py-5">Product Matrix</th>
                  <th className="px-8 py-5">Unit Economy</th>
                  <th className="px-8 py-5 text-center">Quantities</th>
                  <th className="px-8 py-5">Inventory Status</th>
                  <th className="px-8 py-5">Equity Value</th>
                  <th className="px-8 py-5 text-right">Quick Adjust</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredProducts.map((product) => {
                  const stockStatus = product.stock === 0 ? 'out' : product.stock < 20 ? 'low' : 'good';
                  const styles = {
                    good: { pill: 'bg-emerald-50 text-emerald-700 font-black', icon: ShieldCheck, label: 'Optimal' },
                    low: { pill: 'bg-amber-50 text-amber-700 font-black', icon: AlertTriangle, label: 'Low Reserve' },
                    out: { pill: 'bg-red-50 text-red-700 font-black', icon: XCircle, label: 'Stockout' }
                  }[stockStatus];
                  
                  return (
                    <tr key={product.id} className="hover:bg-slate-50/30 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="font-black text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">{product.name}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-900">Rs {product.price.toLocaleString()}</span>
                          <span className="text-[10px] text-slate-400 font-bold">Base Unit</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-24 group/input transition-all">
                            <input
                              type="number"
                              min="0"
                              disabled={updatingId === product.id.toString()}
                              value={product.stock}
                              onChange={(e) => handleStockUpdate(product.id, parseInt(e.target.value) || 0)}
                              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-center text-sm font-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-tighter ${styles.pill}`}>
                          <styles.icon size={12} className="opacity-70" />
                          <span>{styles.label}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-black text-slate-900 bg-slate-50 px-2 py-1 rounded-md">
                          Rs {(product.price * product.stock).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            disabled={updatingId === product.id.toString()}
                            onClick={() => handleStockUpdate(product.id, product.stock + 10)}
                            className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-100 transition-all font-black text-xs"
                          >
                            +10
                          </button>
                          <button
                            disabled={updatingId === product.id.toString()}
                            onClick={() => handleStockUpdate(product.id, Math.max(0, product.stock - 10))}
                            className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-100 transition-all font-black text-xs"
                          >
                            -10
                          </button>
                          <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all">
                            <Settings2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <Database className="mx-auto text-slate-200 mb-4" size={48} />
              <p className="text-sm font-black text-slate-400">Zero entities found in this partition.</p>
            </div>
          )}
        </div>
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
