import React from 'react';

export type SaleItem = { id: number; name: string; sold: number };

interface SaleProps {
  salesData?: SaleItem[];
}

const DEFAULT_SALES: SaleItem[] = [
  { id: 1, name: 'Earbuds', sold: 420 },
  { id: 2, name: 'Adaptor', sold: 310 },
  { id: 3, name: 'Headphones', sold: 275 },
  { id: 4, name: 'Mobile Phone Case', sold: 520 },
];

export default function SaleComponent({ salesData = DEFAULT_SALES }: SaleProps) {
  const items = salesData;
  const maxSold = Math.max(...items.map((i) => i.sold), 1);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h3 className="font-bold text-lg text-slate-800">Top Categories</h3>
        <p className="text-xs text-slate-500 mt-1">Most popular product types</p>
      </div>
      <div className="space-y-6">
        {items.map((item) => {
          const percentage = Math.round((item.sold / maxSold) * 100);
          return (
            <div key={item.id} className="group">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center font-bold text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  {item.name.split(' ').map(s => s[0]).slice(0, 2).join('')}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-end">
                    <div className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">{item.name}</div>
                    <div className="text-xs font-extrabold text-slate-900">{item.sold} <span className="text-slate-400 font-medium">units</span></div>
                  </div>
                </div>
              </div>
              <div className="pl-14">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-500 group-hover:bg-blue-600 transition-all duration-500 shadow-sm"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{percentage}% of target</span>
                  <span className="text-[10px] font-bold text-emerald-500">+12% growth</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
