"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDashboard } from '../../../../context/DashboardContext';
import Sidebar from '../../../components/dashboard/Sidebar';
import Link from 'next/link';
import {
    ArrowLeft,
    Package,
    User,
    MapPin,
    CreditCard,
    CheckCircle2,
    Clock,
    Truck,
    ShoppingBag,
    XCircle,
    Hash,
    Phone,
    Mail,
    Calendar,
    ChevronRight
} from 'lucide-react';

export default function OrderDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { ordersData, updateOrder } = useDashboard();
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        if (id && ordersData.length > 0) {
            const decodedId = decodeURIComponent(id as string);
            const foundOrder = ordersData.find(o => o.id === decodedId);
            setOrder(foundOrder);
        }
    }, [id, ordersData]);

    if (!order) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-bold animate-pulse">Retrieving Order Data...</p>
            </div>
        );
    }

    const handleStatusUpdate = async (newStatus: string) => {
        if (confirm(`Authorize status change to: ${newStatus}?`)) {
            await updateOrder(order.id, { status: newStatus as any });
            setOrder({ ...order, status: newStatus });
        }
    };

    const statusMap: Record<string, { color: string; icon: any }> = {
        Paid: { color: 'emerald', icon: CheckCircle2 },
        Pending: { color: 'amber', icon: Clock },
        Shipped: { color: 'blue', icon: Truck },
        Delivered: { color: 'purple', icon: ShoppingBag },
        Cancelled: { color: 'red', icon: XCircle },
    };

    const getStatusStyles = (status: string) => {
        const config = statusMap[status] || { color: 'slate', icon: Hash };
        const Icon = config.icon;
        return (
            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-2xl border text-[11px] font-black uppercase tracking-widest bg-${config.color}-50 text-${config.color}-700 border-${config.color}-100`}>
                <Icon size={14} className={`text-${config.color}-500`} />
                <span>{status}</span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex">
            <Sidebar />

            <main className="flex-1 p-6 md:p-8 overflow-auto">
                {/* Navigation & Header */}
                <div className="mb-10">
                    <Link href="/dashboard/orders" className="group inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest transition-all mb-4">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Ledger
                    </Link>

                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
                                    #{order.orderNumber || order.id.toString().slice(-6)}
                                </h1>
                                {getStatusStyles(order.status)}
                            </div>
                            <div className="flex items-center gap-4 text-slate-400">
                                <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-tight">
                                    <Calendar size={14} />
                                    Placed {order.date}
                                </div>
                                <div className="w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
                                <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-tight">
                                    <Hash size={14} />
                                    UID: {order.id.toString().slice(0, 12)}...
                                </div>
                            </div>
                        </div>

                        {/* Control Deck */}
                        <div className="flex flex-wrap gap-2">
                            {order.status === 'Pending' && (
                                <button
                                    onClick={() => handleStatusUpdate('Paid')}
                                    className="px-6 py-3 bg-white text-emerald-600 border border-emerald-100 hover:bg-emerald-600 hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-sm hover:shadow-emerald-100"
                                >
                                    Confirm Payment
                                </button>
                            )}
                            {['Pending', 'Paid'].includes(order.status) && (
                                <button
                                    onClick={() => handleStatusUpdate('Shipped')}
                                    className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-100"
                                >
                                    Dispatch Shipment
                                </button>
                            )}
                            {order.status === 'Shipped' && (
                                <button
                                    onClick={() => handleStatusUpdate('Delivered')}
                                    className="px-6 py-3 bg-purple-600 text-white hover:bg-purple-700 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-purple-100"
                                >
                                    Complete Cycle
                                </button>
                            )}
                            {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                                <button
                                    onClick={() => handleStatusUpdate('Cancelled')}
                                    className="px-6 py-3 bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
                                >
                                    Terminate
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Inventory Manifest */}
                    <div className="xl:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                                <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                                    <Package size={20} className="text-blue-600" />
                                    Order Manifest
                                </h3>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    {order.items?.length || 0} Entities
                                </span>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {order.items?.map((item: any, idx: number) => (
                                    <div key={idx} className="p-8 flex items-center justify-between group hover:bg-slate-50/50 transition-colors">
                                        <div className="flex items-center gap-6">
                                            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center p-3 border border-slate-100 shadow-sm group-hover:scale-105 transition-transform duration-500">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.productName} className="max-w-full max-h-full object-contain drop-shadow-md" />
                                                ) : (
                                                        <Package className="text-slate-200" size={32} />
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <p className="font-black text-slate-800 text-xl tracking-tight leading-none group-hover:text-blue-600 transition-colors">{item.productName}</p>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    SKU UNIT: <span className="text-slate-900">Rs {item.price ? item.price.toLocaleString() : 'N/A'}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-black text-slate-400 lowercase italic">qty</span>
                                                <span className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">×{item.quantity}</span>
                                            </div>
                                            <p className="font-bold text-slate-400 text-[10px] uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-md">
                                                Rs {(item.price * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-8 py-8 bg-slate-900 text-white flex justify-between items-center rounded-b-[2.5rem]">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">Revenue Impact</span>
                                    <span className="text-sm font-bold opacity-80">(Incl. Taxes & Logistics)</span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-xs font-black opacity-40 uppercase mb-1.5">Total:</span>
                                    <span className="text-5xl font-black tracking-tighter">
                                        <span className="text-xl mr-1">Rs</span>
                                        {order.amount.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Meta Analysis */}
                    <div className="space-y-8">
                        {/* Customer Intelligence */}
                        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <User size={80} />
                            </div>
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <User size={14} className="text-blue-600" />
                                Customer Record
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg">
                                        {order.customer.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-lg font-black text-slate-900 tracking-tight leading-none mb-1">{order.customer}</p>
                                        <div className="flex items-center gap-1.5 text-slate-400">
                                            <Mail size={12} />
                                            <span className="text-[11px] font-bold font-mono">{order.email || 'Ledger only'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-50 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                            <Phone size={12} /> Contact
                                        </div>
                                        <span className="text-xs font-black text-slate-700">{order.shippingAddress?.phone || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                            <MapPin size={12} /> Location
                                        </div>
                                        <span className="text-xs font-black text-slate-700">{order.shippingAddress?.city || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Logistics Coordinates */}
                        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 group overflow-hidden">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <MapPin size={14} className="text-blue-600" />
                                Delivery Points
                            </h3>
                            {order.shippingAddress ? (
                                <div className="space-y-6">
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/50">
                                        <p className="font-black text-slate-800 text-sm mb-2 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                                            Primary Receiver
                                        </p>
                                        <div className="space-y-1 text-slate-500 text-xs font-bold font-mono uppercase tracking-tight pl-3.5">
                                            <p className="text-slate-900 font-black mb-1">
                                                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                                            </p>
                                            <p>{order.shippingAddress.street}</p>
                                            {order.shippingAddress.apartment && <p>{order.shippingAddress.apartment}</p>}
                                            <p className="text-blue-600">
                                                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                                            </p>
                                            <p className="opacity-60">{order.shippingAddress.country === 'PK' ? 'Pakistan' : order.shippingAddress.country}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                    <div className="py-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                                        <p className="text-xs font-black text-slate-400">Logistics Data Missing</p>
                                    </div>
                            )}
                        </div>

                        {/* Financial Audit */}
                        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <CreditCard size={14} className="text-blue-600" />
                                Settlement
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol</p>
                                    <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                                        <div className="w-1 h-3 bg-blue-600 rounded-full"></div>
                                        {order.paymentMethod || 'CASH_ON_DELIVERY'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Audit State</p>
                                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${order.status === 'Paid' || order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                                        {order.status === 'Paid' || order.status === 'Delivered' ? 'Full Settlement' : 'Authorized Only'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
