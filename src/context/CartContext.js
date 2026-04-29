import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * CartContext - Global cart state management
 * Manages cart items, quantities, and persistence
 */
const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('wellness_cart');
            if (savedCart) {
                setCartItems(JSON.parse(savedCart));
            }
        } catch (e) {
            console.warn('Failed to load cart from localStorage:', e);
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('wellness_cart', JSON.stringify(cartItems));
        } catch (e) {
            console.warn('Failed to save cart to localStorage:', e);
        }
    }, [cartItems]);

    /**
     * Add item to cart or increase quantity if already exists
     */
    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.code === product.code);

            if (existingItem) {
                // Increase quantity
                return prevItems.map(item =>
                    item.code === product.code
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add new item with quantity 1 and mock price
                return [...prevItems, {
                    ...product,
                    quantity: 1,
                    price: 5.00, // Mock price since API doesn't provide it
                }];
            }
        });
    };

    /**
     * Remove item from cart
     */
    const removeFromCart = (productCode) => {
        setCartItems(prevItems => prevItems.filter(item => item.code !== productCode));
    };

    /**
     * Update item quantity
     */
    const updateQuantity = (productCode, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(productCode);
            return;
        }

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.code === productCode
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    /**
     * Clear entire cart
     */
    const clearCart = () => {
        setCartItems([]);
    };

    /**
     * Get total number of items in cart
     */
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    /**
     * Get total price of cart
     */
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    /**
     * Check if product is in cart
     */
    const isInCart = (productCode) => {
        return cartItems.some(item => item.code === productCode);
    };

    /**
     * Get quantity of specific product in cart
     */
    const getItemQuantity = (productCode) => {
        const item = cartItems.find(item => item.code === productCode);
        return item ? item.quantity : 0;
    };

    /**
     * Toggle cart drawer
     */
    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };

    const value = {
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isInCart,
        getItemQuantity,
        toggleCart,
        setIsCartOpen,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
