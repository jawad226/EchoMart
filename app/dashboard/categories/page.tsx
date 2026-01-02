"use client";

import React, { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import {
    DashboardProvider,
    useDashboard,
} from "../../../context/DashboardContext";

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
        <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 text-white flex">
            <Sidebar />

            <main className="flex-1 p-6 overflow-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold">Category Management</h2>
                    <p className="text-sm opacity-70 mt-1">
                        Manage your store categories
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* ADD CATEGORY FORM */}
                    <div className="lg:col-span-1">
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h3 className="text-xl font-bold mb-6">Create New Category</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm opacity-70 mb-1">Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. Smart Watches"
                                        value={newCategoryName}
                                        onChange={handleNameChange}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm opacity-70 mb-1">Slug (URL)</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. smart-watches"
                                        value={newCategorySlug}
                                        onChange={(e) => setNewCategorySlug(e.target.value)}
                                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg"
                                >
                                    Create Category
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* CATEGORIES LIST */}
                    <div className="lg:col-span-2">
                        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 border-b border-white/10">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">Name</th>
                                        <th className="px-6 py-4 font-bold">Slug</th>
                                        <th className="px-6 py-4 font-bold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {categoriesData.map((cat) => (
                                        <tr key={cat.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 font-medium">{cat.name}</td>
                                            <td className="px-6 py-4 opacity-70">{cat.slug}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => confirm(`Delete ${cat.name}?`) && deleteCategory(cat.id)}
                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
