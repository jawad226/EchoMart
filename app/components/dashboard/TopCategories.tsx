"use client";

import React from 'react';
import { useDashboard } from '../../../context/DashboardContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function TopCategories() {
  const { productsData } = useDashboard();

  // Calculate sales per category
  const categorySales: Record<string, number> = {};
  productsData.forEach(product => {
    if (!categorySales[product.category]) {
      categorySales[product.category] = 0;
    }
    categorySales[product.category] += product.sold;
  });

  const data = Object.keys(categorySales)
    .map(name => ({ name, value: categorySales[name] }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 4); // Top 4 categories

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1'];

  return (
    <div className="h-full flex flex-col">
       <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">Top Categories</h3>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mt-1">Sales Distribution</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full h-56 relative mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Text */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
             <span className="block text-3xl font-black text-slate-800">100%</span>
             <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1">Total Items</span>
           </div>
           
           {/* Floating Badges (Simulated) */}
           <div className="absolute top-[20%] right-[10%] bg-blue-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg pointer-events-none">
             +25%
           </div>
           <div className="absolute bottom-[20%] left-[10%] bg-blue-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg pointer-events-none">
             +75%
           </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          {data.slice(0, 2).map((entry, index) => (
            <div key={entry.name} className="flex flex-col items-center justify-center text-center">
               <div className="flex items-center gap-2 mb-1">
                 <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                 <span className="text-xs font-bold text-slate-400">{entry.name}</span>
               </div>
               <span className="text-xl font-black text-slate-800">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
