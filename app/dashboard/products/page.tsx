"use client";

import React, { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import {
  DashboardProvider,
  useDashboard,
} from "../../../context/DashboardContext";
import { message } from "antd";
import { Plus, Edit2, Trash2, Package, Search, Filter } from "lucide-react";

function ProductsContent() {
  const { productsData, categoriesData, addProduct, updateProduct, deleteProduct } =
    useDashboard();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    originalPrice: "",
    stock: "",
    brand: "",
    image: "",
  });

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      categoryId: categoriesData[0]?.id.toString() || "",
      price: "",
      originalPrice: "",
      stock: "",
      brand: "",
      image: "",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    const category = categoriesData.find(c => c.name === product.category);
    setFormData({
      name: product.name,
      categoryId: category?.id.toString() || "",
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      stock: product.stock.toString(),
      brand: product.brand || "",
      image: product.image || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) {
      message.error("Please select a category.");
      return;
    }

    const productData = {
      name: formData.name,
      categoryId: parseInt(formData.categoryId),
      price: parseFloat(formData.price) || 0,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      stock: parseInt(formData.stock) || 0,
      brand: formData.brand,
      image: formData.image,
    };

    setLoading(true);
    let success = false;
    if (editingProduct) {
      success = await updateProduct(editingProduct.id, productData);
      if (success) message.success("Product updated successfully!");
    } else {
      success = await addProduct(productData);
      if (success) message.success("Product added successfully!");
    }

    setLoading(false);
    if (success) setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const success = await deleteProduct(id);
      if (success) message.success("Product deleted successfully!");
    }
  };

  const filteredProducts = productsData.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Sidebar />

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Product Management</h2>
            <p className="text-slate-500 mt-1">Maintain and update your product catalog.</p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center gap-2 font-bold"
          >
            <Plus size={20} />
            <span>Add Product</span>
          </button>
        </div>

        {/* Search & Stats */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
            />
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
            <Filter size={16} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total:</span>
            <span className="text-sm font-black text-slate-900">{filteredProducts.length}</span>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredProducts.map((product: any) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden"
            >
              {/* IMAGE */}
              <div className="relative w-full h-48 bg-slate-50 rounded-xl mb-4 flex items-center justify-center p-6 group-hover:bg-blue-50/30 transition-colors">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain drop-shadow-md"
                  />
                ) : (
                  <Package className="text-slate-200" size={48} />
                )}
                <div className="absolute top-2 right-2 flex gap-1 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                  <button onClick={() => handleEdit(product)} className="p-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition-all">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="p-2 bg-white text-red-600 rounded-lg shadow-md hover:bg-red-600 hover:text-white transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] bg-blue-50 text-blue-600 font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md">
                    {product.category}
                  </span>
                  {product.brand && (
                    <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-md">
                      {product.brand}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-50 p-2 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">Price</p>
                  <p className="text-sm font-black text-slate-900">Rs {product.price.toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">Stock</p>
                  <p className={`text-sm font-black ${product.stock < 20 ? 'text-red-600' : 'text-emerald-600'}`}>
                    {product.stock} <span className="text-[10px] font-bold opacity-60">U</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span>{product.sold} Sales</span>
                </div>
                <button 
                  onClick={() => handleEdit(product)}
                  className="text-blue-600 hover:text-blue-700 underline underline-offset-4"
                >
                  Manage
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-8 w-full max-w-xl shadow-2xl animate-fade-in border border-slate-100">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    {editingProduct ? "Edit Product" : "New Product"}
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">Fill in the details below to {editingProduct ? 'update' : 'add'} your product.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400">
                  <Plus size={24} className="rotate-45" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Product Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Galaxy S24"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Category</label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none"
                    >
                      <option value="">Select Category</option>
                      {categoriesData.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Brand</label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="e.g. Samsung"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Stock Quantity</label>
                    <input
                      type="number"
                      required
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      placeholder="0"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Price (Rs)</label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Sale Price (Rs)</label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      placeholder="Optional"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Product Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
                  >
                    {loading && <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
                    <span>{editingProduct ? "Save Changes" : "Create Product"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <DashboardProvider>
      <ProductsContent />
    </DashboardProvider>
  );
}
