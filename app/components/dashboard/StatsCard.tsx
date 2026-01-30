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
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-600 transition-colors duration-300">
          {IconComponent && <IconComponent size={20} className="text-blue-600 group-hover:text-white transition-colors" />}
        </div>
        {growth && (
          <div className="flex items-center gap-1">
            <span className={`text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
              {growth}
            </span>
            <svg className={`w-3 h-3 ${isPositive ? 'text-emerald-500' : 'text-red-500 rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
        )}
      </div>
      <div>
        <div className="text-sm font-medium text-slate-500 mb-1">{title}</div>
        <div className="text-2xl font-black text-slate-800 tracking-tight">{value}</div>
        <div className="text-[10px] text-slate-400 font-medium mt-1">vs. previous month</div>
      </div>
    </div>
  );
}
