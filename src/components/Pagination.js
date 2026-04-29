import React from 'react';
import { motion } from 'framer-motion';

/**
 * Pagination Component - Traditional page numbers with navigation
 */
const Pagination = ({ currentPage, totalPages, onPageChange, loading }) => {
    // Don't show pagination if there's only one page or no pages
    if (totalPages <= 1) return null;

    // Calculate which page numbers to show
    const getVisiblePages = () => {
        const delta = 2; // Number of pages to show on each side of current page
        const range = [];
        const rangeWithDots = [];

        // Always show first page
        range.push(1);

        // Calculate start and end of middle range
        const start = Math.max(2, currentPage - delta);
        const end = Math.min(totalPages - 1, currentPage + delta);

        // Add dots after first page if needed
        if (start > 2) {
            rangeWithDots.push(1);
            rangeWithDots.push('...');
        } else {
            rangeWithDots.push(1);
        }

        // Add middle range
        for (let i = start; i <= end; i++) {
            if (i !== 1 && i !== totalPages) {
                rangeWithDots.push(i);
            }
        }

        // Add dots before last page if needed
        if (end < totalPages - 1) {
            rangeWithDots.push('...');
            rangeWithDots.push(totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        // Remove duplicates and return unique pages
        return [...new Set(rangeWithDots)];
    };

    const visiblePages = getVisiblePages();

    const handlePageClick = (page) => {
        if (page !== currentPage && page !== '...' && !loading) {
            onPageChange(page);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1 && !loading) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages && !loading) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="flex items-center justify-center mt-8 mb-4">
            <nav className="flex items-center space-x-1 sm:space-x-2">
                {/* Previous Button */}
                <motion.button
                    onClick={handlePrevious}
                    disabled={currentPage === 1 || loading}
                    whileHover={{ scale: currentPage === 1 || loading ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === 1 || loading ? 1 : 0.95 }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === 1 || loading
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        }`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </motion.button>

                {/* Page Numbers */}
                {visiblePages.map((page, index) => {
                    if (page === '...') {
                        return (
                            <span
                                key={`dots-${index}`}
                                className="px-3 py-2 text-gray-400 text-sm font-medium"
                            >
                                ...
                            </span>
                        );
                    }

                    const isActive = page === currentPage;

                    return (
                        <motion.button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.05 }}
                            whileTap={{ scale: loading ? 1 : 0.95 }}
                            className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 min-w-[40px] ${isActive
                                    ? 'bg-gradient-to-r from-primary to-emerald-600 text-white shadow-[0_4px_12px_rgba(16,185,129,0.3)]'
                                    : loading
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-700 hover:text-primary hover:bg-gray-50 bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]'
                                }`}
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            {page}
                        </motion.button>
                    );
                })}

                {/* Next Button */}
                <motion.button
                    onClick={handleNext}
                    disabled={currentPage === totalPages || loading}
                    whileHover={{ scale: currentPage === totalPages || loading ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === totalPages || loading ? 1 : 0.95 }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${currentPage === totalPages || loading
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                        }`}
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </motion.button>
            </nav>

            {/* Page Info - Mobile Friendly */}
            <div className="ml-4 text-xs sm:text-sm text-gray-500 font-medium">
                Page {currentPage} of {totalPages}
            </div>
        </div>
    );
};

export default Pagination;