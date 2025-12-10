import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  growth?: string;
  icon?: string;
}

export default function StatsCard({ title, value, growth, icon }: StatsCardProps) {
  return (
    <div className="bg-white/5 p-5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs opacity-70 uppercase tracking-wide">{title}</div>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <div className="text-3xl font-bold mt-2 mb-1">{value}</div>
      {growth && (
        <div className="flex items-center gap-1 text-xs text-green-400 mt-2">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          <span>{growth}</span>
          <span className="opacity-60 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
}
