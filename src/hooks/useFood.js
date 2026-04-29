import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchProducts, fetchCategories, fetchProductByBarcode, sortProducts } from '../utils/api';

/**
 * Custom hook for managing food product data
 * Handles search, filtering, sorting, and infinite scrolling
 */
export const useFood = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    // Search and filter state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortBy, setSortBy] = useState('relevance');

    // Debug searchQuery changes
    useEffect(() => {
        console.log('🔍 searchQuery changed to:', searchQuery);
    }, [searchQuery]);

    // Pagination state
    const [page, setPage] = useState(1);

    // Debounce timer ref
    const debounceTimer = useRef(null);

    // Barcode search result ref
    const [isBarcodeResult, setIsBarcodeResult] = useState(false);

    /**
     * Load categories on mount
     */
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const cats = await fetchCategories();
                setCategories(cats);
            } catch (err) {
                console.error('Failed to load categories:', err);
            }
        };
        loadCategories();
    }, []);

    /**
     * Load products with current filters
     */
    const loadProducts = useCallback(async (pageNum = 1, append = false) => {
        console.log('🔄 loadProducts called with:', { pageNum, append, searchQuery, selectedCategory });
        setLoading(true);
        setError(null);
        setIsBarcodeResult(false);

        try {
            const data = await fetchProducts(
                pageNum,
                20,
                searchQuery,
                selectedCategory
            );

            console.log('📊 fetchProducts returned:', data);

            // Apply client-side sorting
            let sortedProducts = sortProducts(data.products, sortBy);

            if (append) {
                setProducts(prev => {
                    console.log('📝 Appending products:', prev.length, '+', sortedProducts.length);
                    return [...prev, ...sortedProducts];
                });
            } else {
                console.log('📝 Setting products:', sortedProducts.length);
                setProducts(sortedProducts);
            }

            setPage(pageNum);
            setTotalPages(data.totalPages);
            setTotalCount(data.count);
            setHasMore(pageNum < data.totalPages && data.products.length > 0);
        } catch (err) {
            // Don't show error for cancelled requests (user is still typing)
            if (err.name !== 'CanceledError') {
                setError(err.message || 'Failed to load products');
                console.error('Error loading products:', err);
            }
        } finally {
            setLoading(false);
        }
    }, [searchQuery, selectedCategory, sortBy]);

    /**
     * Initial load and reload on filter changes
     */
    useEffect(() => {
        loadProducts(1, false);
    }, [loadProducts]);

    /**
     * Debounced search handler (immediate for better UX)
     */
    const handleSearch = useCallback((query) => {
        console.log('🔍 handleSearch called with:', query);

        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Immediate update for empty search
        if (!query || query.trim() === '') {
            console.log('🔍 Empty search - resetting');
            setSearchQuery('');
            setPage(1);
            return;
        }

        // Debounced update for non-empty search
        debounceTimer.current = setTimeout(() => {
            console.log('🔍 Search triggered for:', query);
            setSearchQuery(query.trim());
            setPage(1);
        }, 300);
    }, []);

    /**
     * Search by barcode - opens detail modal directly
     */
    const searchByBarcode = useCallback(async (barcode) => {
        setLoading(true);
        setError(null);
        setIsBarcodeResult(true);

        try {
            const product = await fetchProductByBarcode(barcode);
            setProducts([product]);
            setHasMore(false);
            return product; // Return product to open modal
        } catch (err) {
            // Don't show error for cancelled requests
            if (err.name !== 'CanceledError') {
                setError('Product not found with this barcode');
                setProducts([]);
            }
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Load more products (infinite scroll / load more)
     */
    const loadMore = useCallback(() => {
        if (!loading && hasMore && !isBarcodeResult) {
            loadProducts(page + 1, true);
        }
    }, [loading, hasMore, page, loadProducts, isBarcodeResult]);

    /**
     * Go to specific page (for traditional pagination if needed)
     */
    const goToPage = useCallback((pageNum) => {
        if (!loading && pageNum !== page && !isBarcodeResult) {
            loadProducts(pageNum, false);
            // Scroll to top when changing pages
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [loading, page, loadProducts, isBarcodeResult]);

    /**
     * Change category filter
     */
    const handleCategoryChange = useCallback((category) => {
        setSelectedCategory(category);
        setPage(1);
    }, []);

    /**
     * Change sort order
     */
    const handleSortChange = useCallback((sort) => {
        setSortBy(sort);
        // Re-sort existing products immediately
        setProducts(prev => sortProducts([...prev], sort));
    }, []);

    /**
     * Reset all filters
     */
    const resetFilters = useCallback(() => {
        setSearchQuery('');
        setSelectedCategory('');
        setSortBy('relevance');
        setPage(1);
        setIsBarcodeResult(false);
    }, []);

    return {
        // Data
        products,
        categories,

        // State
        loading,
        error,
        hasMore,

        // Pagination
        page,
        totalPages,
        totalCount,

        // Current filters
        searchQuery,
        selectedCategory,
        sortBy,

        // Actions
        handleSearch,
        searchByBarcode,
        handleCategoryChange,
        handleSortChange,
        loadMore,
        goToPage,
        resetFilters,
    };
};
