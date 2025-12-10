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
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 text-white flex">
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">Dashboard Overview</h2>
            <p className="text-sm opacity-70 mt-1">Welcome back! Here's what's happening with your store.</p>
          </div>
          <div className="text-sm bg-white/5 px-4 py-2 rounded-lg border border-white/10">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard 
            title="Total Sales" 
            value={totalSales} 
            growth={salesGrowth}
            icon="💰"
          />
          <StatsCard 
            title="Total Orders" 
            value={orders} 
            growth={ordersGrowth}
            icon="📦"
          />
          <StatsCard 
            title="Customers" 
            value={customers} 
            growth={customersGrowth}
            icon="👥"
          />
          <StatsCard 
            title="Products" 
            value={products} 
            growth={productsGrowth}
            icon="📱"
          />
        </div>

        {/* Charts and Top Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2 bg-white/5 rounded-lg p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Sales Overview</h3>
              <div className="flex gap-2">
                <button className="text-xs bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition-colors">7D</button>
                <button className="text-xs bg-white/20 px-3 py-1 rounded hover:bg-white/20 transition-colors">30D</button>
                <button className="text-xs bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition-colors">90D</button>
              </div>
            </div>
            <div className="h-48">
              <MiniChart />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="opacity-70">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="opacity-70">Orders</span>
                </div>
              </div>
              <div className="text-xs opacity-60">Last 30 days performance</div>
            </div>
          </div>

          <SaleComponent />
        </div>

        {/* Recent Orders and Best Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RecentOrders />
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="font-semibold mb-4 text-lg">Best Selling Products</h3>
              <div className="space-y-4">
                {productsData
                  .sort((a, b) => b.sold - a.sold)
                  .slice(0, 4)
                  .map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{product.name}</div>
                          <div className="text-xs opacity-60">{product.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-sm">{product.sold} sold</div>
                        <div className="text-xs opacity-60">Rs {product.price.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <h3 className="font-semibold mb-3 text-lg">Quick Stats</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="opacity-70">Avg Order Value</span>
                  <span className="font-semibold">Rs 1,406</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="opacity-70">Conversion Rate</span>
                  <span className="font-semibold">3.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="opacity-70">Return Rate</span>
                  <span className="font-semibold text-green-400">2.1%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="opacity-70">Customer Satisfaction</span>
                  <span className="font-semibold text-yellow-400">4.7/5</span>
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
