import React from 'react';
import { motion } from 'framer-motion';

/**
 * CategoryFilter Component - Mobile-First Scrollable Pills
 */
const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
    return (
        <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 pb-2 min-w-max">
                {/* All Products Option */}
                <motion.button
                    onClick={() => onCategoryChange('')}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${selectedCategory === ''
                        ? 'bg-gradient-to-r from-primary to-emerald-600 text-white shadow-[0_4px_12px_rgba(16,185,129,0.25)]'
                        : 'bg-white text-gray-700 shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
                        }`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    All
                </motion.button>

                {/* Category Pills */}
                {categories.map((category) => (
                    <motion.button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex-shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${selectedCategory === category.id
                            ? 'bg-gradient-to-r from-primary to-emerald-600 text-white shadow-[0_4px_12px_rgba(16,185,129,0.25)]'
                            : 'bg-white text-gray-700 shadow-[0_2px_6px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]'
                            }`}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        {category.name}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
