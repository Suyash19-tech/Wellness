import React from 'react';
import { motion } from 'framer-motion';
import { getProductImageUrl, getProductName } from '../utils/api';

/**
 * ProductDetail Component - High-End Wellness Aesthetic
 * Glassmorphism slide-over from right with nutrient grid and icons
 */
const ProductDetail = ({ product, onClose }) => {
    const productName = getProductName(product);
    const imageUrl = getProductImageUrl(product);
    const nutriGrade = product.nutrition_grades?.toLowerCase();

    const backdrop = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const slideOver = {
        hidden: { x: '100%' },
        visible: {
            x: 0,
            transition: { type: 'spring', damping: 30, stiffness: 300 }
        },
        exit: {
            x: '100%',
            transition: { duration: 0.3 }
        }
    };

    const nutriScoreColors = {
        a: 'bg-emerald-100 text-emerald-700 shadow-[0_0_20px_rgba(16,185,129,0.2)]',
        b: 'bg-lime-100 text-lime-700 shadow-[0_0_20px_rgba(132,204,22,0.2)]',
        c: 'bg-yellow-100 text-yellow-700 shadow-[0_0_20px_rgba(234,179,8,0.2)]',
        d: 'bg-orange-100 text-orange-700 shadow-[0_0_20px_rgba(249,115,22,0.2)]',
        e: 'bg-red-100 text-red-700 shadow-[0_0_20px_rgba(239,68,68,0.2)]',
    };

    return (
        <>
            {/* Deep Blur Background */}
            <motion.div
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={onClose}
                className="fixed inset-0 bg-black/40 backdrop-blur-md z-50"
            />

            {/* Glassmorphism Slide-over from Right */}
            <motion.div
                variants={slideOver}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white/95 backdrop-blur-xl shadow-[-20px_0_60px_rgba(0,0,0,0.15)] z-50 overflow-y-auto"
                style={{ fontFamily: "'Outfit', 'Plus Jakarta Sans', sans-serif" }}
            >
                {/* Close Button */}
                <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed top-6 right-6 p-3 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)] transition-all z-10"
                >
                    <svg className="w-6 h-6 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </motion.button>

                {/* Content */}
                <div className="p-8 pt-20">
                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative h-80 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-[32px] mb-8 flex items-center justify-center p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                    >
                        <img
                            src={imageUrl}
                            alt={productName}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </motion.div>

                    {/* Product Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        {product.brands && (
                            <p className="text-sm font-bold text-primary uppercase tracking-widest mb-3">{product.brands}</p>
                        )}
                        <h2 className="text-4xl font-bold text-text tracking-tight mb-4">{productName}</h2>

                        {nutriGrade && (
                            <div className={`inline-flex px-5 py-2.5 rounded-full text-sm font-bold backdrop-blur-md ${nutriScoreColors[nutriGrade] || 'bg-gray-100 text-gray-700'}`}>
                                <span className="uppercase tracking-wider">Nutri-Score: {nutriGrade.toUpperCase()}</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Nutrient Grid with Icons */}
                    {product.nutriments && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mb-8"
                        >
                            <h3 className="text-2xl font-bold text-text tracking-tight mb-6">Nutrition Facts</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Energy */}
                                {product.nutriments.energy_100g && (
                                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <span className="text-xs font-bold text-orange-700 uppercase tracking-wider">Energy</span>
                                        </div>
                                        <p className="text-2xl font-bold text-orange-900">{product.nutriments.energy_100g} <span className="text-sm font-medium">kJ</span></p>
                                    </div>
                                )}

                                {/* Fat */}
                                {product.nutriments.fat_100g !== undefined && (
                                    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                                </svg>
                                            </div>
                                            <span className="text-xs font-bold text-yellow-700 uppercase tracking-wider">Fat</span>
                                        </div>
                                        <p className="text-2xl font-bold text-yellow-900">{product.nutriments.fat_100g} <span className="text-sm font-medium">g</span></p>
                                    </div>
                                )}

                                {/* Carbs */}
                                {product.nutriments.carbohydrates_100g !== undefined && (
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Carbs</span>
                                        </div>
                                        <p className="text-2xl font-bold text-blue-900">{product.nutriments.carbohydrates_100g} <span className="text-sm font-medium">g</span></p>
                                    </div>
                                )}

                                {/* Sugars */}
                                {product.nutriments.sugars_100g !== undefined && (
                                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-xs font-bold text-pink-700 uppercase tracking-wider">Sugars</span>
                                        </div>
                                        <p className="text-2xl font-bold text-pink-900">{product.nutriments.sugars_100g} <span className="text-sm font-medium">g</span></p>
                                    </div>
                                )}

                                {/* Protein */}
                                {product.nutriments.proteins_100g !== undefined && (
                                    <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Protein</span>
                                        </div>
                                        <p className="text-2xl font-bold text-purple-900">{product.nutriments.proteins_100g} <span className="text-sm font-medium">g</span></p>
                                    </div>
                                )}

                                {/* Salt */}
                                {product.nutriments.salt_100g !== undefined && (
                                    <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                                </svg>
                                            </div>
                                            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Salt</span>
                                        </div>
                                        <p className="text-2xl font-bold text-gray-900">{product.nutriments.salt_100g} <span className="text-sm font-medium">g</span></p>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-text-light mt-4 text-center font-medium">Per 100g serving</p>
                        </motion.div>
                    )}

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-6"
                    >
                        {/* Ingredients */}
                        {product.ingredients_text && (
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                                <h3 className="text-lg font-bold text-text tracking-tight mb-3">Ingredients</h3>
                                <p className="text-sm text-text-light leading-relaxed">{product.ingredients_text}</p>
                            </div>
                        )}

                        {/* Basic Info */}
                        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)]">
                            <h3 className="text-lg font-bold text-text tracking-tight mb-4">Product Details</h3>
                            <div className="space-y-3 text-sm">
                                {product.quantity && (
                                    <div className="flex justify-between">
                                        <span className="text-text-light font-medium">Quantity:</span>
                                        <span className="text-text font-bold">{product.quantity}</span>
                                    </div>
                                )}
                                {product.code && (
                                    <div className="flex justify-between">
                                        <span className="text-text-light font-medium">Barcode:</span>
                                        <span className="text-text font-mono font-bold">{product.code}</span>
                                    </div>
                                )}
                                {product.categories && (
                                    <div className="flex justify-between">
                                        <span className="text-text-light font-medium">Category:</span>
                                        <span className="text-text font-bold text-right">{product.categories.split(',')[0]}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </>
    );
};

export default ProductDetail;
