import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { getProductName, getProductImageUrl, getProductInitials } from '../utils/api';

/**
 * CartDrawer Component - Slide-out cart with items and total
 */
const CartDrawer = () => {
    const {
        cartItems,
        isCartOpen,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        setIsCartOpen,
    } = useCart();

    const backdrop = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const drawer = {
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

    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    ];

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        variants={backdrop}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        variants={drawer}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed right-0 top-0 h-full w-full sm:w-96 sm:max-w-md bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.15)] z-50 flex flex-col"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100">
                            <h2 className="text-lg sm:text-xl font-bold text-text">Your Cart</h2>
                            <motion.button
                                onClick={() => setIsCartOpen(false)}
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
                                aria-label="Close cart"
                            >
                                <svg className="w-6 h-6 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </motion.button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-12">
                                    <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <p className="text-gray-500 font-medium">Your cart is empty</p>
                                    <p className="text-sm text-gray-400 mt-1">Add some wellness products!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item, index) => {
                                        const imageUrl = getProductImageUrl(item);
                                        const productName = getProductName(item);
                                        const initials = getProductInitials(item);
                                        const gradientIndex = item.code ? parseInt(item.code.slice(-1)) % gradients.length : 0;

                                        return (
                                            <motion.div
                                                key={item.code}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="flex gap-3 sm:gap-4 bg-gray-50 rounded-2xl p-3 sm:p-4"
                                            >
                                                {/* Product Image */}
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                                    {imageUrl ? (
                                                        <img
                                                            src={imageUrl}
                                                            alt={productName}
                                                            referrerPolicy="no-referrer"
                                                            className="w-full h-full object-contain"
                                                            onError={(e) => {
                                                                e.target.style.display = 'none';
                                                                e.target.parentElement.style.background = gradients[gradientIndex];
                                                                e.target.parentElement.innerHTML = `<span class="flex items-center justify-center h-full text-white font-bold text-lg">${initials}</span>`;
                                                            }}
                                                        />
                                                    ) : (
                                                        <div
                                                            className="w-full h-full flex items-center justify-center text-white font-bold text-lg"
                                                            style={{ background: gradients[gradientIndex] }}
                                                        >
                                                            {initials}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-semibold text-text line-clamp-2 mb-1">{productName}</h3>
                                                    <p className="text-xs text-gray-500 mb-2">{item.brands || 'Unknown Brand'}</p>
                                                    <p className="text-sm font-bold text-primary">${item.price.toFixed(2)}</p>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex flex-col items-end justify-between">
                                                    <button
                                                        onClick={() => removeFromCart(item.code)}
                                                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>

                                                    <div className="flex items-center gap-2 bg-white rounded-lg px-2 py-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.code, item.quantity - 1)}
                                                            className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                            </svg>
                                                        </button>
                                                        <span className="text-sm font-bold text-text w-6 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.code, item.quantity + 1)}
                                                            className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-primary transition-colors"
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-100 p-4 sm:p-6 space-y-4">
                                {/* Total */}
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-text">Total</span>
                                    <span className="text-2xl font-bold text-primary">${getTotalPrice().toFixed(2)}</span>
                                </div>

                                {/* Buttons */}
                                <div className="space-y-2">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full py-3 bg-gradient-to-r from-primary to-emerald-600 text-white rounded-xl font-bold hover:shadow-[0_8px_24px_rgba(16,185,129,0.3)] transition-all"
                                    >
                                        Checkout
                                    </motion.button>
                                    <button
                                        onClick={clearCart}
                                        className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm"
                                    >
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
