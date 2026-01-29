"use client";

import React, { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import {
    DashboardProvider,
    useDashboard,
} from "../../../context/DashboardContext";
import { Plus, Trash2, Tag, Link as LinkIcon, AlertCircle } from "lucide-react";

function CategoriesContent() {
    const { categoriesData, addCategory, deleteCategory } = useDashboard();
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategorySlug, setNewCategorySlug] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName || !newCategorySlug) return;
        await addCategory({ name: newCategoryName, slug: newCategorySlug });
        setNewCategoryName("");
        setNewCategorySlug("");
    };

    const generateSlug = (name: string) => {
        return name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]/g, "");
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setNewCategoryName(name);
        setNewCategorySlug(generateSlug(name));
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex">
            <Sidebar />

            <main className="flex-1 p-6 md:p-8 overflow-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Category Management</h2>
                    <p className="text-slate-500 mt-1">Organize your products into meaningful groups.</p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* ADD CATEGORY FORM */}
                    <div className="xl:col-span-1">
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm sticky top-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                    <Plus size={24} />
                                </div>
                                <h3 className="text-xl font-black text-slate-900">New Category</h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                                        <Tag size={12} /> Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Smart Watches"
                                        value={newCategoryName}
                                        onChange={handleNameChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                                        <LinkIcon size={12} /> Slug (URL)
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. smart-watches"
                                        value={newCategorySlug}
                                        onChange={(e) => setNewCategorySlug(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                                    />
                                    <p className="text-[10px] text-slate-400 font-bold px-1 italic">Generated automatically from name.</p>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-slate-900 hover:bg-blue-600 text-white font-extrabold py-5 rounded-2xl transition-all shadow-xl shadow-slate-100 flex items-center justify-center gap-2"
                                >
                                    <span>Create Category</span>
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* CATEGORIES LIST */}
                    <div className="xl:col-span-2">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-slate-800">Available Categories</h3>
                                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">
                                    {categoriesData.length} Total
                                </span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                            <th className="px-8 py-5">Label & Icon</th>
                                            <th className="px-8 py-5">Url Path</th>
                                            <th className="px-8 py-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {categoriesData.map((cat) => (
                                            <tr key={cat.id} className="hover:bg-slate-50/30 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-bold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                            {cat.name.charAt(0)}
                                                        </div>
                                                        <span className="font-bold text-slate-700">{cat.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <code className="text-[11px] font-bold bg-slate-100/50 text-slate-500 px-2 py-1 rounded-md">
                                                        /{cat.slug}
                                                    </code>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <button
                                                        onClick={() => confirm(`Delete ${cat.name}?`) && deleteCategory(cat.id)}
                                                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                        title="Delete Category"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {categoriesData.length === 0 && (
                                <div className="text-center py-20">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                        <AlertCircle size={32} />
                                    </div>
                                    <p className="text-sm font-bold text-slate-400">No categories added yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default function CategoriesPage() {
    return (
        <DashboardProvider>
            <CategoriesContent />
        </DashboardProvider>
    );
}
