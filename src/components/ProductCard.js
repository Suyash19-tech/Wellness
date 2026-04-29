import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getProductImageUrl, getProductName, getProductInitials, getNutriScoreColor } from '../utils/api';
import { useCart } from '../context/CartContext';

/**
 * ProductCard Component - Professional Compact Design with Cart
 */
const ProductCard = ({ product, onClick, index }) => {
    const productName = getProductName(product);
    const imageUrl = getProductImageUrl(product);
    const brands = product.brands || 'Unknown Brand';
    const nutriGrade = product.nutrition_grades?.toLowerCase();
    const initials = getProductInitials(product);

    const [imageError, setImageError] = useState(false);
    const { addToCart, isInCart, getItemQuantity } = useCart();

    // Handle image loading errors - show SVG with Nutri-Score color
    const handleImageError = () => {
        setImageError(true);
    };

    // Get Nutri-Score color for SVG placeholder
    const nutriScoreColor = getNutriScoreColor(nutriGrade);

    // Handle add to cart
    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent card click
        addToCart(product);
    };

    // Soft-colored Nutri-Score pill styles
    const nutriScoreStyles = {
        a: 'bg-emerald-50 text-emerald-700',
        b: 'bg-lime-50 text-lime-700',
        c: 'bg-yellow-50 text-yellow-700',
        d: 'bg-orange-50 text-orange-700',
        e: 'bg-red-50 text-red-700',
    };

    const inCart = isInCart(product.code);
    const quantity = getItemQuantity(product.code);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.03, duration: 0.3 }}
            whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
            onClick={() => onClick(product)}
            className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.15)] transition-all duration-300 cursor-pointer overflow-hidden group"
        >
            {/* Compact Image Container */}
            <div className="relative h-40 sm:h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center p-3 sm:p-4">
                {!imageError && imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={productName}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        onError={handleImageError}
                    />
                ) : (
                    // SVG placeholder with Nutri-Score color gradient
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id={`gradient-${product.code}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: nutriScoreColor, stopOpacity: 0.8 }} />
                                <stop offset="100%" style={{ stopColor: nutriScoreColor, stopOpacity: 0.4 }} />
                            </linearGradient>
                        </defs>
                        <rect width="200" height="200" fill={`url(#gradient-${product.code})`} rx="16" />
                        <text
                            x="100"
                            y="110"
                            fontSize="64"
                            fontWeight="bold"
                            fill="white"
                            textAnchor="middle"
                            fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                            {initials}
                        </text>
                    </svg>
                )}

                {/* Compact Nutri-Score Pill */}
                {nutriGrade && (
                    <div className="absolute top-2 right-2">
                        <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold backdrop-blur-sm ${nutriScoreStyles[nutriGrade] || 'bg-gray-50 text-gray-700'}`}>
                            {nutriGrade.toUpperCase()}
                        </div>
                    </div>
                )}

                {/* Cart Badge */}
                {inCart && (
                    <div className="absolute top-2 left-2">
                        <div className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary text-white backdrop-blur-sm">
                            {quantity} in cart
                        </div>
                    </div>
                )}
            </div>

            {/* Compact Product Info */}
            <div className="p-3 sm:p-4">
                {/* Brand - text-xs text-slate-400 */}
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1.5 line-clamp-1 font-medium">
                    {brands}
                </p>

                {/* Product Name - text-sm font-semibold */}
                <h3 className="text-sm font-semibold text-text mb-3 line-clamp-2 leading-snug min-h-[2.5rem]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {productName}
                </h3>

                {/* Buttons Row - Larger touch targets on mobile */}
                <div className="flex gap-2">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-2.5 sm:py-2 px-3 bg-gray-100 text-gray-700 rounded-lg font-semibold text-xs hover:bg-gray-200 transition-all duration-300"
                    >
                        View
                    </motion.button>

                    <motion.button
                        onClick={handleAddToCart}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 py-2.5 sm:py-2 px-3 rounded-lg font-semibold text-xs transition-all duration-300 ${inCart
                            ? 'bg-emerald-100 text-primary'
                            : 'bg-gradient-to-r from-primary to-emerald-600 text-white hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)]'
                            }`}
                    >
                        {inCart ? '+ Add More' : '+ Add to Cart'}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
