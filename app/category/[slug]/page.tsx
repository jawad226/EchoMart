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
    const isMobilePhoneCase = slug === 'MobilePhoneCase';
    const [products, setProducts] = useState<Product[]>([]);
    const [categoryName, setCategoryName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchCategoryAndProducts = async () => {
            try {
                // Fetch categories to get the name
                const catRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/categories`);
                const categories: Category[] = await catRes.json();
                const currentCat = categories.find(c => c.slug === slug);
                if (currentCat) setCategoryName(currentCat.name);

                // Fetch all products and filter by category slug
                const prodRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/products`);
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
                            <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-gray-100 relative">
                                <div className={`relative ${isMobilePhoneCase ? 'h-56 w-full' : 'aspect-square'}`}>
                                    <div className={`absolute ${isMobilePhoneCase ? 'inset-0' : 'inset-8'}`}>
                                        <Image
                                            src={product.image || "/EarFun.png"}
                                            alt={product.name}
                                            fill
                                            className={`${isMobilePhoneCase ? 'object-cover' : 'object-contain'} ${!isMobilePhoneCase ? 'group-hover:scale-110' : ''} transition-transform duration-500`}
                                        />
                                    </div>
                                    {product.originalPrice && product.originalPrice > product.price && (
                                        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10">
                                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                        </div>
                                    )}
                                    {/* View Detail Icon */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedProduct(product);
                                        }}
                                        className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
                                        title="View Details"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>
                                </div>

                                <div className={`${isMobilePhoneCase ? 'p-4' : 'p-6'}`}>
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
                                                qty: 1,
                                                category: product.category.name
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

            {/* Product Detail Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
                    <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] shadow-2xl flex flex-col md:flex-row relative" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-4 right-4 z-50 p-2 bg-white/80 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image Section with Zoom Effect */}
                        <div className="w-full md:w-1/2 bg-gray-50 relative group cursor-crosshair h-[400px] md:h-auto flex items-center justify-center"
                            onMouseMove={(e) => {
                                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - left;
                                const y = e.clientY - top;

                                // Lens dimensions
                                const lensSize = 100;
                                const halfLens = lensSize / 2;

                                // Clamp lens position
                                let lensX = x - halfLens;
                                let lensY = y - halfLens;

                                if (lensX < 0) lensX = 0;
                                if (lensY < 0) lensY = 0;
                                if (lensX > width - lensSize) lensX = width - lensSize;
                                if (lensY > height - lensSize) lensY = height - lensSize;

                                // Calculate zoom ratio
                                const fx = width / lensSize;
                                const fy = height / lensSize;

                                e.currentTarget.style.setProperty('--lens-x', `${lensX}px`);
                                e.currentTarget.style.setProperty('--lens-y', `${lensY}px`);
                                e.currentTarget.style.setProperty('--bg-x', `${-lensX * fx}px`);
                                e.currentTarget.style.setProperty('--bg-y', `${-lensY * fy}px`);
                            }}
                        >
                            <div className="relative w-full h-full p-8 flex items-center justify-center">
                                <Image
                                    src={selectedProduct.image || "/EarFun.png"}
                                    alt={selectedProduct.name}
                                    fill
                                    className="object-contain"
                                />
                                {/* Lens */}
                                <div className="absolute border-2 border-purple-500 bg-purple-200/20 hidden group-hover:block pointer-events-none"
                                    style={{
                                        left: 'var(--lens-x, 0)',
                                        top: 'var(--lens-y, 0)',
                                        width: '100px',
                                        height: '100px'
                                    }}
                                ></div>
                            </div>

                            {/* Zoom Result Window - Daraz Style (Side View) */}
                            <div className="absolute left-full top-0 w-full h-full bg-white z-20 border-l border-gray-100 hidden group-hover:block overflow-hidden shadow-lg"
                                style={{
                                    backgroundImage: `url(${selectedProduct.image || "/EarFun.png"})`,
                                    backgroundPosition: 'var(--bg-x) var(--bg-y)',
                                    backgroundSize: '400%', // 4x zoom (since container is roughly same size and lens is 1/4th approx)
                                    backgroundRepeat: 'no-repeat'
                                }}
                            ></div>
                        </div>

                        {/* Details Section */}
                        <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                            <div className="mb-2">
                                <span className="text-sm font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full uppercase tracking-wider">
                                    {selectedProduct.brand}
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h2>

                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-xl">
                                    <span className="font-bold text-yellow-700">{selectedProduct.rating}</span>
                                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <span className="text-gray-400">|</span>
                                <span className="text-gray-600">{selectedProduct.category.name}</span>
                            </div>

                            <div className="flex items-end gap-3 mb-8">
                                <span className="text-4xl font-black text-gray-900">Rs {selectedProduct.price}</span>
                                {selectedProduct.originalPrice && (
                                    <span className="text-xl text-gray-400 line-through mb-1">Rs {selectedProduct.originalPrice}</span>
                                )}
                            </div>

                            <div className="space-y-4">
                                <button
                                    onClick={() => {
                                        addToCart({
                                            id: selectedProduct.id.toString(),
                                            title: selectedProduct.name,
                                            price: selectedProduct.price,
                                            image: selectedProduct.image || "/EarFun.png",
                                            qty: 1,
                                            category: selectedProduct.category.name
                                        });
                                        setSelectedProduct(null);
                                    }}
                                    className="w-full bg-gray-900 hover:bg-purple-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-purple-200 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Add to Cart
                                </button>
                                <p className="text-xs text-center text-gray-500">
                                    Free shipping on all orders over Rs 5000
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
