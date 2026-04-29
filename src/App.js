import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFood } from './hooks/useFood';
import { useCart } from './context/CartContext';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import SortControl from './components/SortControl';
import ProductGrid from './components/ProductGrid';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

/**
 * Main App Component - Professional Wellness Marketplace
 */
function App() {
  const {
    products,
    categories,
    loading,
    error,
    page,
    totalPages,
    totalCount,
    searchQuery,
    selectedCategory,
    sortBy,
    handleSearch,
    searchByBarcode,
    handleCategoryChange,
    handleSortChange,
    goToPage,
    resetFilters,
  } = useFood();

  const { getTotalItems, toggleCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  const handleBarcodeSearch = async (barcode) => {
    const product = await searchByBarcode(barcode);
    if (product) {
      setSelectedProduct(product);
    }
  };

  const totalCartItems = getTotalItems();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Responsive Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] sticky top-0 z-40"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          {/* Desktop Layout: Logo + Search + Cart in one row */}
          <div className="hidden md:flex items-center gap-4 mb-3">
            {/* Logo */}
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-text tracking-tight flex-shrink-0"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                Wellness
              </span>
            </motion.h1>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <SearchBar
                onSearch={handleSearch}
                onBarcodeSearch={handleBarcodeSearch}
              />
            </div>

            {/* Cart Icon with Badge */}
            <motion.button
              onClick={toggleCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex-shrink-0 p-3 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalCartItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary to-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                >
                  {totalCartItems}
                </motion.span>
              )}
            </motion.button>

            {/* Reset Button */}
            {(searchQuery || selectedCategory || sortBy !== 'relevance') && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetFilters}
                className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-primary to-emerald-600 text-white rounded-full font-semibold text-xs hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all"
              >
                Reset
              </motion.button>
            )}
          </div>

          {/* Mobile Layout: Logo + Cart on first row, Search on second row */}
          <div className="md:hidden">
            {/* First Row: Logo + Cart */}
            <div className="flex items-center justify-between mb-3">
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-lg font-bold text-text tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <span className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                  Wellness
                </span>
              </motion.h1>

              <div className="flex items-center gap-2">
                {/* Reset Button - Mobile */}
                {(searchQuery || selectedCategory || sortBy !== 'relevance') && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetFilters}
                    className="px-3 py-2 bg-gradient-to-r from-primary to-emerald-600 text-white rounded-full font-semibold text-xs hover:shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-all"
                  >
                    Reset
                  </motion.button>
                )}

                {/* Cart Icon - Mobile */}
                <motion.button
                  onClick={toggleCart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2.5 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {totalCartItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-primary to-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                      {totalCartItems}
                    </motion.span>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Second Row: Search Bar - Full Width on Mobile */}
            <div className="mb-3">
              <SearchBar
                onSearch={handleSearch}
                onBarcodeSearch={handleBarcodeSearch}
              />
            </div>
          </div>

          {/* Categories + Sort Row - Responsive */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Categories - Scrollable on mobile */}
            <div className="flex-1 min-w-0">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            {/* Sort Control */}
            <div className="flex-shrink-0">
              <SortControl sortBy={sortBy} onSortChange={handleSortChange} />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm"
          >
            <p className="font-medium">{error}</p>
          </motion.div>
        )}

        {/* Results Count */}
        {!loading && products.length > 0 && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500 font-medium">
              {totalCount ? `${totalCount} total products` : `${products.length} products found`}
              {totalPages > 1 && ` • Page ${page} of ${totalPages}`}
            </p>
          </div>
        )}

        {/* Product Grid */}
        <ProductGrid
          products={products}
          loading={loading}
          totalPages={totalPages}
          currentPage={page}
          onPageChange={goToPage}
          onProductClick={handleProductClick}
        />
      </main>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Professional Footer */}
      <Footer />
    </div>
  );
}

export default App;
