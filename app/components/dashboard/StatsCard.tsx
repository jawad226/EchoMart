import React from 'react';
import * as LucideIcons from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  growth?: string;
  icon?: string;
}

export default function StatsCard({ title, value, growth, icon }: StatsCardProps) {
  // Dynamically get the icon from lucide-react
  const IconComponent = icon ? (LucideIcons as any)[icon] : null;

  const isPositive = growth?.startsWith('+');

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</div>
        <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
          {IconComponent && <IconComponent size={20} className="text-slate-400 group-hover:text-blue-600 transition-colors" />}
        </div>
      </div>
      <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{value}</div>
      {growth && (
        <div className="flex items-center gap-1.5 mt-3">
          <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg text-xs font-bold ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
            }`}>
            <svg className={`w-3 h-3 ${!isPositive && 'rotate-180'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span>{growth.replace('+', '')}%</span>
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">vs last month</span>
        </div>
      )}
    </div>
  );
}
