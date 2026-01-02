"use client";

import React, { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import {
  DashboardProvider,
  useDashboard,
} from "../../../context/DashboardContext";

function ProductsContent() {
  const { productsData, categoriesData, addProduct, updateProduct, deleteProduct } =
    useDashboard();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

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
    // Find the category id from the name
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

    const productData = {
      name: formData.name,
      categoryId: parseInt(formData.categoryId),
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      stock: parseInt(formData.stock),
      brand: formData.brand,
      image: formData.image,
    };

    if (editingProduct) {
      await updateProduct(editingProduct.id, productData);
    } else {
      await addProduct(productData);
    }

    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-800 text-white flex">
      <Sidebar />

      <main className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">Product Management</h2>
            <p className="text-sm opacity-70 mt-1">
              Manage your product catalog
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            + Add Product
          </button>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {productsData.map((product: any) => (
            <div
              key={product.id}
              className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all"
            >
              {/* IMAGE */}
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-contain rounded mb-3"
                />
              )}

              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs opacity-60 uppercase">
                    {product.category}
                  </p>
                </div>
                {product.brand && (
                  <span className="text-xs bg-white/10 px-2 py-1 rounded">
                    {product.brand}
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-lg text-blue-400">
                    Rs {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs opacity-50 line-through">
                      Rs {product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-70">Stock:</span>
                  <span
                    className={
                      product.stock < 20
                        ? "text-red-400"
                        : "text-green-400"
                    }
                  >
                    {product.stock} units
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="opacity-70">Sold:</span>
                  <span className="font-mono">{product.sold}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded text-sm transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded text-sm transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md border border-white/10">
              <h3 className="text-xl font-bold mb-4">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm opacity-70 mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    className="w-full bg-white text-black border border-white rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm opacity-70 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        categoryId: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-white rounded text-black px-3 py-2"
                  >
                    <option value="">Select Category</option>
                    {categoriesData.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm opacity-70 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        brand: e.target.value,
                      })
                    }
                    className="w-full bg-white text-black border border-white rounded px-3 py-2"
                  />
                </div>

                {/* IMAGE INPUT */}
                <div>
                  <label className="block text-sm opacity-70 mb-1">
                    Product Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        image: e.target.value,
                      })
                    }
                    className="w-full bg-white text-black border border-white rounded px-3 py-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm opacity-70 mb-1">
                      Price (Rs)
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: e.target.value,
                        })
                      }
                      className="w-full bg-white text-black border border-white rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm opacity-70 mb-1">
                      Sale Price (Rs)
                    </label>
                    <input
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          originalPrice: e.target.value,
                        })
                      }
                      className="w-full bg-white text-black border border-white rounded px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm opacity-70 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stock: e.target.value,
                      })
                    }
                    className="w-full bg-white text-black border border-white rounded px-3 py-2"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                  >
                    {editingProduct ? "Update" : "Add"} Product
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-white/10 hover:bg-white/20 px-4 py-2 rounded"
                  >
                    Cancel
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
