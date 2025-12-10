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
    <div className="bg-white/5 rounded-lg p-4">
      <h3 className="font-semibold mb-3">Top Categories</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded flex items-center justify-center font-bold">{item.name.split(' ').map(s=>s[0]).slice(0,2).join('')}</div>
            <div className="flex-1">
              <div className="flex justify-between text-sm">
                <div>{item.name}</div>
                <div className="font-mono">{item.sold}</div>
              </div>
              <div className="mt-2">
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-2 rounded-full bg-white" style={{ width: `${Math.round((item.sold / maxSold) * 100)}%` }} />
                </div>
                <div className="text-xs opacity-80 mt-1">{Math.round((item.sold / maxSold) * 100)}% of top</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
