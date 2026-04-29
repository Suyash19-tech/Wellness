import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';

/**
 * ProductGrid Component - With High-End Skeleton Loaders
 */
const ProductGrid = ({ products, loading, hasMore, onLoadMore, onProductClick }) => {
    const observerTarget = useRef(null);

    // Infinite scroll observer
    useEffect(() => {
        const currentTarget = observerTarget.current;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    onLoadMore();
                }
            },
            { threshold: 0.1 }
        );

        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [hasMore, loading, onLoadMore]);

    // Empty state
    if (products.length === 0 && !loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
            >
                <svg
                    className="w-24 h-24 mx-auto text-gray-300 mb-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h3 className="text-xl font-bold text-text mb-2">No products found</h3>
                <p className="text-sm text-gray-500 mb-6">Try adjusting your search or filters</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-emerald-600 text-white rounded-full font-semibold text-sm hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all"
                >
                    Clear All Filters
                </motion.button>
            </motion.div>
        );
    }

    // Single product result (e.g., barcode search) - centered container
    if (products.length === 1 && !loading) {
        return (
            <div className="flex justify-center">
                <div className="w-full max-w-sm">
                    <AnimatePresence mode="wait">
                        <ProductCard
                            key={products[0].code}
                            product={products[0]}
                            index={0}
                            onClick={onProductClick}
                        />
                    </AnimatePresence>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Product Grid with AnimatePresence for smooth transitions */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={products.map(p => p.code).join('-')}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
                >
                    {products.map((product, index) => (
                        <ProductCard
                            key={product._id || product.code || index}
                            product={product}
                            index={index}
                            onClick={onProductClick}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* High-End Skeleton Loader - At least 6 cards */}
            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mt-4">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden"
                        >
                            {/* Image Skeleton with Shimmer */}
                            <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%]"></div>

                            {/* Content Skeleton */}
                            <div className="p-4 space-y-3">
                                {/* Brand */}
                                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-1/3"></div>

                                {/* Product Name */}
                                <div className="space-y-2">
                                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded"></div>
                                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded w-2/3"></div>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2">
                                    <div className="flex-1 h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded-lg"></div>
                                    <div className="flex-1 h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%] rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Infinite Scroll Trigger */}
            <div ref={observerTarget} className="h-10 mt-4"></div>

            {/* End Message */}
            {!hasMore && products.length > 1 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8 text-gray-400 text-sm font-medium"
                >
                    You've reached the end
                </motion.div>
            )}
        </div>
    );
};

export default ProductGrid;
