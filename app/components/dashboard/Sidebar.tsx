"use client";

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-white/5 min-h-screen p-4 border-r border-white/10">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <p className="text-xs opacity-60 mt-1">ElectroMart</p>
      </div>
      
      <nav className="space-y-1 text-sm">
        <div className="mb-4">
          <p className="text-xs uppercase opacity-50 px-3 py-2">Main</p>
          <Link 
            href="/dashboard" 
            className={`block px-3 py-2 rounded transition-colors ${
              isActive('/dashboard') ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
            }`}
          >
            Dashboard
          </Link>
        </div>

        <div className="mb-4">
          <p className="text-xs uppercase opacity-50 px-3 py-2">Management</p>
          <Link 
            href="/dashboard/products" 
            className={`block px-3 py-2 rounded transition-colors ${
              isActive('/dashboard/products') ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
            }`}
          >
            Products
          </Link>
          <Link 
            href="/dashboard/orders" 
            className={`block px-3 py-2 rounded transition-colors ${
              isActive('/dashboard/orders') ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
            }`}
          >
            Orders
          </Link>
          <Link 
            href="/dashboard/customers" 
            className={`block px-3 py-2 rounded transition-colors ${
              isActive('/dashboard/customers') ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
            }`}
          >
            Customers
          </Link>
          <Link 
            href="/dashboard/inventory" 
            className={`block px-3 py-2 rounded transition-colors ${
              isActive('/dashboard/inventory') ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
            }`}
          >
            Inventory
          </Link>
        </div>

        <div className="mb-4">
          <p className="text-xs uppercase opacity-50 px-3 py-2">Store</p>
          <Link 
            href="/shop-all" 
            className={`block px-3 py-2 rounded transition-colors ${
              isActive('/shop-all') ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
            }`}
          >
            Shop All
          </Link>
          <Link 
            href="/category/Earbuds" 
            className={`block px-3 py-2 rounded transition-colors ${
              isActive('/category/Earbuds') ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
            }`}
          >
            Earbuds
          </Link>
          <Link 
            href="/category/Adaptor" 
            className={`block px-3 py-2 rounded transition-colors ${
              isActive('/category/Adaptor') ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
            }`}
          >
            Adaptor
          </Link>
          <Link 
            href="/category/Headphones" 
            className={`block px-3 py-2 rounded transition-colors ${
              isActive('/category/Headphones') ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
            }`}
          >
            Headphones
          </Link>
          <Link 
            href="/category/MobilePhoneCase" 
            className={`block px-3 py-2 rounded transition-colors ${
              isActive('/category/MobilePhoneCase') ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
            }`}
          >
            Phone Cases
          </Link>
          <Link 
            href="/Sale" 
            className={`block px-3 py-2 rounded transition-colors ${
              isActive('/Sale') ? 'bg-white/20 font-semibold' : 'hover:bg-white/10'
            }`}
          >
            Sale
          </Link>
        </div>

        <div className="mb-4">
          <p className="text-xs uppercase opacity-50 px-3 py-2">Account</p>
          <Link 
            href="/" 
            className="block px-3 py-2 rounded hover:bg-white/10 transition-colors"
          >
            View Store
          </Link>
          <Link 
            href="/auth/login" 
            className="block px-3 py-2 rounded hover:bg-white/10 transition-colors"
          >
            Logout
          </Link>
        </div>
      </nav>
    </aside>
  );
}
