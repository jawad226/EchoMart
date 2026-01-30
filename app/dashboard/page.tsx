"use client";

import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import StatsCard from '../components/dashboard/StatsCard';
import MiniChart from '../components/dashboard/MiniChart';
import TopCategories from '../components/dashboard/TopCategories';
import RecentOrders from '../components/dashboard/RecentOrders';
import { DashboardProvider, useDashboard } from '../../context/DashboardContext';
import { Package, Smartphone, Headphones, Zap } from 'lucide-react'; // Placeholder icons if needed

function DashboardContent() {
  const { totalSales, orders, customers, products, ordersData, productsData } = useDashboard();

  const [timeRange, setTimeRange] = React.useState(7);

  // Helper to calculate growth vs previous period (30 days default for cards)
  const calculateGrowth = (currentValue: number, previousValue: number) => {
    if (previousValue === 0) return currentValue > 0 ? '+100%' : '0%';
    const growth = ((currentValue - previousValue) / previousValue) * 100;
    return `${growth > 0 ? '+' : ''}${growth.toFixed(1)}%`;
  };

  // Real Metrics Calculation
  const metrics = React.useMemo(() => {
    if (!ordersData.length) return { salesGrowth: '0%', ordersGrowth: '0%', avgOrderValue: 0 };

    const now = new Date();
    const last30Days = new Date();
    last30Days.setDate(now.getDate() - 30);

    const prev30Days = new Date();
    prev30Days.setDate(now.getDate() - 60);

    let currentSales = 0;
    let prevSales = 0;
    let currentOrders = 0;
    let prevOrders = 0;

    ordersData.forEach(order => {
      const orderDate = new Date(order.date);
      const amount = parseFloat(order.amount.replace(/[^0-9.-]+/g, ""));

      if (orderDate >= last30Days && orderDate <= now) {
        currentSales += amount;
        currentOrders += 1;
      } else if (orderDate >= prev30Days && orderDate < last30Days) {
        prevSales += amount;
        prevOrders += 1;
      }
    });

    const totalRevenueNumeric = parseFloat(totalSales.toLocaleString().replace(/,/g, ''));
    const avgOrderValue = orders > 0 ? totalRevenueNumeric / orders : 0;

    return {
      salesGrowth: calculateGrowth(currentSales, prevSales),
      ordersGrowth: calculateGrowth(currentOrders, prevOrders),
      avgOrderValue,
      customersGrowth: '+12.5%', // Mock
      productsGrowth: '+5.0%'  // Mock
    };
  }, [ordersData, totalSales, orders]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Dashboard</h2>
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
            growth={metrics.salesGrowth}
            icon="DollarSign"
          />
          <StatsCard 
            title="Total Orders" 
            value={orders} 
            growth={metrics.ordersGrowth}
            icon="Package"
          />
          <StatsCard 
            title="Total Customers" 
            value={customers} 
            growth={metrics.customersGrowth}
            icon="Users"
          />
          <StatsCard 
            title="Products in Store" 
            value={products} 
            growth={metrics.productsGrowth}
            icon="ShoppingBag"
          />
        </div>

        {/* Charts and Top Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden">
            {/* Decorative top border */}
            {/* Clean top, no border for EcomDash style */}

            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">Sales Analytics</h3>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">Revenue & Order Volume</p>
              </div>
              <div className="flex gap-1 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
                <button
                  onClick={() => setTimeRange(7)}
                  className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${timeRange === 7 ? 'bg-white shadow-sm text-blue-700 border border-slate-100' : 'text-slate-500 hover:bg-white hover:shadow-sm'}`}
                >
                  7D
                </button>
                <button
                  onClick={() => setTimeRange(30)}
                  className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${timeRange === 30 ? 'bg-white shadow-sm text-blue-700 border border-slate-100' : 'text-slate-500 hover:bg-white hover:shadow-sm'}`}
                >
                  30D
                </button>
                <button
                  onClick={() => setTimeRange(90)}
                  className={`text-xs font-bold px-4 py-2 rounded-lg transition-all ${timeRange === 90 ? 'bg-white shadow-sm text-blue-700 border border-slate-100' : 'text-slate-500 hover:bg-white hover:shadow-sm'}`}
                >
                  90D
                </button>
              </div>
            </div>
            <div className="h-56">
              <MiniChart days={timeRange} />
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

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 overflow-hidden relative">
            <TopCategories />
          </div>
        </div>

        {/* Recent Orders and Best Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <RecentOrders />
          </div>

          <div className="space-y-6">
            {/* Top Products */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">Top Products</h3>
                <button className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors">See All</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase font-bold text-slate-400 border-b border-slate-50">
                      <th className="pb-3 pl-2">No</th>
                      <th className="pb-3">Product Name</th>
                      <th className="pb-3 text-right">Sold</th>
                      <th className="pb-3 text-right">Profit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {productsData
                      .sort((a, b) => b.sold - a.sold)
                      .slice(0, 4)
                      .map((product, index) => (
                        <tr key={product.id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 pl-2 text-sm font-bold text-slate-400">{index + 1}</td>
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              {/* Placeholder icon if no image */}
                              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400">
                                <Smartphone size={16} />
                              </div>
                              <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-4 text-right text-sm font-bold text-slate-600">{product.sold}</td>
                          <td className="py-4 text-right text-sm font-bold text-slate-900">Rs {(product.price * product.sold * 0.2).toLocaleString()}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h3 className="font-extrabold text-xl text-slate-900 tracking-tight mb-6">Store Performance</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-500 font-medium">Avg Order Value</span>
                  <span className="font-bold text-slate-900">Rs {metrics.avgOrderValue.toFixed(0)}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-500 font-medium">Conversion Rate</span>
                  <span className="font-bold text-slate-900">3.2%</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-500 font-medium">Return Rate</span>
                  <span className="font-bold text-emerald-600">2.1%</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-slate-50 last:border-0">
                  <span className="text-sm text-slate-500 font-medium">Satisfaction</span>
                  <div className="flex items-center gap-1 font-bold text-amber-500">
                    <span>4.7</span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  </div>
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
