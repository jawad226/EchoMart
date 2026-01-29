"use client";

import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import StatsCard from '../components/dashboard/StatsCard';
import MiniChart from '../components/dashboard/MiniChart';
import SaleComponent from '../components/dashboard/SaleComponent';
import RecentOrders from '../components/dashboard/RecentOrders';
import { DashboardProvider, useDashboard } from '../../context/DashboardContext';

function DashboardContent() {
  const { totalSales, orders, customers, products, ordersData, productsData } = useDashboard();

  // Calculate growth percentages (mock data)
  const salesGrowth = '+12.5%';
  const ordersGrowth = '+8.3%';
  const customersGrowth = '+15.2%';
  const productsGrowth = '+5.1%';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Dashboard</h2>
            <p className="text-slate-500 mt-1">Welcome back! Here's a summary of your store's performance.</p>
          </div>
          <div className="text-sm font-medium bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 text-slate-700">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Revenue"
            value={`${totalSales.toLocaleString()}`} 
            growth={salesGrowth}
            icon="DollarSign"
          />
          <StatsCard 
            title="Total Orders" 
            value={orders} 
            growth={ordersGrowth}
            icon="Package"
          />
          <StatsCard 
            title="Total Customers" 
            value={customers} 
            growth={customersGrowth}
            icon="Users"
          />
          <StatsCard 
            title="Products in Store" 
            value={products} 
            growth={productsGrowth}
            icon="ShoppingBag"
          />
        </div>

        {/* Charts and Top Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg text-slate-800">Sales Analytics</h3>
                <p className="text-xs text-slate-500">Performance over time</p>
              </div>
              <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
                <button className="text-xs px-3 py-1.5 rounded-md hover:bg-white transition-all text-slate-500">7D</button>
                <button className="text-xs bg-white px-3 py-1.5 rounded-md shadow-sm text-slate-900 font-medium">30D</button>
                <button className="text-xs px-3 py-1.5 rounded-md hover:bg-white transition-all text-slate-500">90D</button>
              </div>
            </div>
            <div className="h-64">
              <MiniChart />
            </div>
            <div className="mt-6 flex items-center justify-between text-sm border-t border-slate-100 pt-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                  <span className="text-slate-600 font-medium">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                  <span className="text-slate-600 font-medium">Orders</span>
                </div>
              </div>
              <div className="text-xs font-medium text-slate-400">Last updated: Just now</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <SaleComponent />
          </div>
        </div>

        {/* Recent Orders and Best Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <RecentOrders />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-slate-800">Best Sellers</h3>
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">View All</button>
              </div>
              <div className="space-y-5">
                {productsData
                  .sort((a, b) => b.sold - a.sold)
                  .slice(0, 4)
                  .map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xs font-bold text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-800">{product.name}</div>
                          <div className="text-xs text-slate-500">{product.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm text-slate-900">{product.sold} sold</div>
                        <div className="text-xs text-slate-400 font-medium">Rs {product.price.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg text-slate-800 mb-6">Store Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <span className="text-sm text-slate-600 font-medium">Avg Order Value</span>
                  <span className="font-bold text-slate-900">Rs 1,406</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                  <span className="text-sm text-slate-600 font-medium">Conversion Rate</span>
                  <span className="font-bold text-slate-900">3.2%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50">
                  <span className="text-sm text-emerald-700 font-medium">Return Rate</span>
                  <span className="font-bold text-emerald-700">2.1%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50">
                  <span className="text-sm text-amber-700 font-medium">Satisfaction</span>
                  <span className="font-bold text-amber-700">4.7/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
