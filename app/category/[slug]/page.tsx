"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

type Category = {
    id: number;
    name: string;
    slug: string;
};

type Product = {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    brand: string;
    rating: number;
    category: Category;
};

export default function CategoryPage() {
    const { slug } = useParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [categoryName, setCategoryName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchCategoryAndProducts = async () => {
            try {
                // Fetch categories to get the name
                const catRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production-176a.up.railway.app"}/categories`);
                const categories: Category[] = await catRes.json();
                const currentCat = categories.find(c => c.slug === slug);
                if (currentCat) setCategoryName(currentCat.name);

                // Fetch all products and filter by category slug
                const prodRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production-176a.up.railway.app"}/products`);
                const allProducts: Product[] = await prodRes.json();
                const filtered = allProducts.filter(p => p.category.slug === slug);
                setProducts(filtered);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (slug) fetchCategoryAndProducts();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900">{categoryName || "Category"}</h1>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Discover our collection of {categoryName?.toLowerCase() || "products"}.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-medium text-gray-600">No products found in this category yet.</h3>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map(product => (
                            <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100">
                                <div className="relative aspect-square">
                                    <Image
                                        src={product.image || "/EarFun.png"}
                                        alt={product.name}
                                        fill
                                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {product.originalPrice && product.originalPrice > product.price && (
                                        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">{product.brand}</span>
                                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                            <span className="text-xs font-bold text-yellow-700">{product.rating}</span>
                                            <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-gray-900 mb-4 line-clamp-1 group-hover:text-purple-600 transition-colors">{product.name}</h3>

                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-2xl font-black text-gray-900">Rs {product.price}</span>
                                            {product.originalPrice && (
                                                <span className="text-sm text-gray-400 line-through">Rs {product.originalPrice}</span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => addToCart({
                                                id: product.id.toString(),
                                                title: product.name,
                                                price: product.price,
                                                image: product.image || "/EarFun.png",
                                                qty: 1
                                            })}
                                            className="bg-gray-900 hover:bg-purple-600 text-white p-3 rounded-xl transition-all hover:scale-110 shadow-lg"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
