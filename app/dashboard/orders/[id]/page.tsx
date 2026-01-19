"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDashboard } from '../../../../context/DashboardContext';
import Sidebar from '../../../components/dashboard/Sidebar';
import Link from 'next/link';

export default function OrderDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { ordersData, updateOrder } = useDashboard();
    const [order, setOrder] = useState<any>(null);

    useEffect(() => {
        if (id && ordersData.length > 0) {
            // Find order by ID (strict ID match now since we use DB ID in URL)
            const decodedId = decodeURIComponent(id as string);
            const foundOrder = ordersData.find(o => o.id === decodedId);
            setOrder(foundOrder);
        }
    }, [id, ordersData]);

    if (!order) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
                <p>Loading order details...</p>
            </div>
        );
    }

    const handleStatusUpdate = async (newStatus: string) => {
        if (confirm(`Are you sure you want to mark this order as ${newStatus}?`)) {
            await updateOrder(order.id, { status: newStatus as any });
            setOrder({ ...order, status: newStatus });
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Paid': return 'bg-green-500/20 text-green-400 border-green-500/50';
            case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
            case 'Shipped': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
            case 'Delivered': return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
            case 'Cancelled': return 'bg-red-500/20 text-red-400 border-red-500/50';
            default: return 'bg-slate-700 text-slate-300';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 text-white flex">
            <Sidebar />

            <main className="flex-1 p-8 overflow-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <Link href="/dashboard/orders" className="text-sm text-blue-400 hover:underline mb-2 block">
                            &larr; Back to Orders
                        </Link>
                        <h1 className="text-3xl font-bold flex items-center gap-4">
                            Order {order.orderNumber || order.id}
                            <span className={`text-base px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                                {order.status}
                            </span>
                        </h1>
                        <p className="text-slate-400 mt-1">Placed on {order.date}</p>
                    </div>

                    {/* Workflow Actions */}
                    <div className="flex gap-3">
                        {order.status === 'Pending' && (
                            <button
                                onClick={() => handleStatusUpdate('Paid')}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
                            >
                                Mark as Paid/Confirmed
                            </button>
                        )}
                        {['Pending', 'Paid'].includes(order.status) && (
                            <button
                                onClick={() => handleStatusUpdate('Shipped')}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
                            >
                                Mark as Shipped
                            </button>
                        )}
                        {order.status === 'Shipped' && (
                            <button
                                onClick={() => handleStatusUpdate('Delivered')}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors"
                            >
                                Mark as Delivered
                            </button>
                        )}
                        {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                            <button
                                onClick={() => handleStatusUpdate('Cancelled')}
                                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg font-medium transition-colors"
                            >
                                Cancel Order
                            </button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Order Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                            <div className="px-6 py-4 border-b border-white/10">
                                <h3 className="text-lg font-semibold">Order Items</h3>
                            </div>
                            <div className="divide-y divide-white/5">
                                {order.items?.map((item: any, idx: number) => (
                                    <div key={idx} className="p-6 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center text-2xl overflow-hidden shrink-0">
                                                {item.image ? (
                                                    <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span>📦</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium text-lg">{item.productName}</p>
                                                <p className="text-slate-400">
                                                    Unit Price: Rs {item.price ? item.price.toLocaleString() : 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-semibold">x{item.quantity}</p>
                                            <p className="text-sm opacity-60">Rs {(item.price * item.quantity).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex justify-between items-center">
                                <span className="text-slate-400">Total Amount</span>
                                <span className="text-2xl font-bold">{order.amount}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Customer & Shipping Info */}
                    <div className="space-y-6">
                        {/* Customer Details */}
                        <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                            <h3 className="text-lg font-semibold mb-4 border-b border-white/10 pb-2">Customer Details</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs uppercase text-slate-500 font-semibold">Name</label>
                                    <p className="text-lg">{order.customer}</p>
                                </div>
                                <div>
                                    <label className="text-xs uppercase text-slate-500 font-semibold">Email</label>
                                    <p className="text-slate-300">{order.email || 'N/A'}</p>
                                </div>
                                <div>
                                    <label className="text-xs uppercase text-slate-500 font-semibold">Phone</label>
                                    <p className="text-slate-300">{order.shippingAddress?.phone || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                            <h3 className="text-lg font-semibold mb-4 border-b border-white/10 pb-2">Shipping Address</h3>
                            {order.shippingAddress ? (
                                <div className="space-y-1 text-slate-300">
                                    <p className="font-medium text-white">
                                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                                    </p>
                                    <p>{order.shippingAddress.street}</p>
                                    {order.shippingAddress.apartment && <p>{order.shippingAddress.apartment}</p>}
                                    <p>
                                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                                    </p>
                                    <p>{order.shippingAddress.country === 'PK' ? 'Pakistan' : order.shippingAddress.country}</p>
                                </div>
                            ) : (
                                <p className="text-slate-500 italic">No shipping address provided</p>
                            )}
                        </div>

                        {/* Payment Info */}
                        <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                            <h3 className="text-lg font-semibold mb-4 border-b border-white/10 pb-2">Payment Info</h3>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-400">Method</span>
                                <span className="font-mono font-medium">{order.paymentMethod || 'COD'}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Payment Status</span>
                                <span className={`px-2 py-0.5 rounded text-xs border ${order.status === 'Paid' || order.status === 'Delivered' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'}`}>
                                    {order.status === 'Paid' || order.status === 'Delivered' ? 'Paid' : 'Pending'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

