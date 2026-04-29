import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { isBarcode } from '../utils/api';

/**
 * SearchBar Component - Omni-Search with Auto Barcode Detection
 * Automatically triggers barcode search when 13 digits are entered
 */
const SearchBar = ({ onSearch, onBarcodeSearch }) => {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const barcodeTimerRef = useRef(null);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        // Clear previous barcode timer
        if (barcodeTimerRef.current) {
            clearTimeout(barcodeTimerRef.current);
        }

        // Check if it's a barcode
        if (isBarcode(value)) {
            // Auto-trigger barcode search after brief delay or if 13 digits
            if (value.length === 13) {
                // Immediately search for 13-digit barcodes
                onBarcodeSearch(value);
            } else if (value.length === 8) {
                // Brief delay for 8-digit barcodes
                barcodeTimerRef.current = setTimeout(() => {
                    onBarcodeSearch(value);
                }, 800);
            }
        } else {
            // Regular text search
            onSearch(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputValue.trim()) {
            if (isBarcode(inputValue.trim())) {
                onBarcodeSearch(inputValue.trim());
            }
        }
    };

    const handleBarcodeClick = () => {
        if (inputValue.trim() && isBarcode(inputValue.trim())) {
            onBarcodeSearch(inputValue.trim());
        }
    };

    // Cleanup timer on unmount
    useEffect(() => {
        return () => {
            if (barcodeTimerRef.current) {
                clearTimeout(barcodeTimerRef.current);
            }
        };
    }, []);

    const isBarcodeInput = isBarcode(inputValue);

    return (
        <form onSubmit={handleSubmit} className="relative w-full">
            {/* Sleek White Pill Search Bar */}
            <div className={`flex items-center bg-white rounded-full transition-all duration-200 ${isFocused
                ? 'ring-2 ring-primary shadow-[0_4px_20px_rgba(16,185,129,0.15)]'
                : 'ring-1 ring-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                }`}>
                {/* Search Icon */}
                <div className="pl-5 pr-3">
                    <svg
                        className={`w-5 h-5 transition-colors ${isFocused ? 'text-primary' : 'text-gray-400'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                {/* Input Field */}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search by name or enter barcode..."
                    className="flex-1 h-12 px-2 text-sm font-medium text-text placeholder-gray-400 outline-none bg-transparent"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                />

                {/* Barcode Icon Toggle (inside search bar) */}
                <motion.button
                    type="button"
                    onClick={handleBarcodeClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`mr-2 p-2.5 rounded-full transition-all duration-200 ${isBarcodeInput
                        ? 'bg-primary text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)]'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                    title={isBarcodeInput ? 'Barcode detected - auto-searching' : 'Enter 8 or 13 digit barcode'}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                </motion.button>
            </div>
        </form>
    );
};

export default SearchBar;
