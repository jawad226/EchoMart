"use client";

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Tag,
  ShoppingCart,
  Users,
  Warehouse,
  Store,
  LogOut,
  ExternalLink
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navGroups = [
    {
      label: 'Main',
      items: [
        { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      ]
    },
    {
      label: 'Management',
      items: [
        { label: 'Products', href: '/dashboard/products', icon: ShoppingBag },
        { label: 'Categories', href: '/dashboard/categories', icon: Tag },
        { label: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
        { label: 'Customers', href: '/dashboard/customers', icon: Users },
        { label: 'Inventory', href: '/dashboard/inventory', icon: Warehouse },
      ]
    },
    {
      label: 'Store',
      items: [
        { label: 'Shop All', href: '/Shop-all', icon: Store },
        { label: 'Sale', href: '/Sale', icon: Tag },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white min-h-screen flex flex-col border-r border-slate-200">
      <div className="p-6 border-b border-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-blue-200 shadow-lg">
            E
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 leading-tight">Admin</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">ElectroMart</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 mb-2">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${active
                        ? 'bg-blue-50 text-blue-600 font-bold shadow-sm'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                  >
                    <item.icon size={18} className={`${active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'} transition-colors`} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-50 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all group"
        >
          <ExternalLink size={18} className="text-slate-400 group-hover:text-slate-600" />
          <span className="text-sm font-medium">View Store</span>
        </Link>
        <Link
          href="/auth/login"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all group"
        >
          <LogOut size={18} className="text-red-400 group-hover:text-red-500" />
          <span className="text-sm font-medium">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
