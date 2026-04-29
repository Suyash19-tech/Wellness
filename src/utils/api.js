import axios from 'axios';
import { mockProducts, mockCategories } from './mockData';

const BASE_URL = 'https://world.openfoodfacts.org';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const USE_PROXY = false; // Set to true if direct fetch fails

// Proper User-Agent as required by OpenFoodFacts
const USER_AGENT = 'WellnessMarket/1.0 (Student Project)';

// Global cache for API responses
const cache = {
    products: new Map(),
    categories: null,
    barcodes: new Map(),
};

// Abort controller for cancelling requests
let abortController = null;

// Create axios instance with SIMPLE headers (avoid preflight)
// Only use User-Agent - no Content-Type to keep it a "simple request"
const api = axios.create({
    baseURL: USE_PROXY ? CORS_PROXY + BASE_URL : BASE_URL,
    timeout: 20000,
    headers: {
        'User-Agent': USER_AGENT,
        // NO Content-Type or Accept headers - they trigger preflight checks
    },
});

/**
 * Generate cache key for product queries
 */
const getCacheKey = (page, pageSize, searchTerm, category) => {
    return `${page}-${pageSize}-${searchTerm}-${category}`;
};

/**
 * Get from sessionStorage cache
 */
const getFromSessionCache = (key) => {
    try {
        const cached = sessionStorage.getItem(key);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            // Cache valid for 30 minutes
            if (Date.now() - timestamp < 1800000) {
                console.log('✅ Returning from sessionStorage cache:', key);
                return data;
            }
        }
    } catch (e) {
        console.warn('Failed to read from sessionStorage:', e);
    }
    return null;
};

/**
 * Save to sessionStorage cache
 */
const saveToSessionCache = (key, data) => {
    try {
        sessionStorage.setItem(key, JSON.stringify({
            data,
            timestamp: Date.now(),
        }));
    } catch (e) {
        console.warn('Failed to save to sessionStorage:', e);
    }
};

/**
 * Check if input is a valid barcode (8 or 13 digits)
 */
export const isBarcode = (input) => {
    const cleaned = input.trim();
    return /^\d{8}$|^\d{13}$/.test(cleaned);
};

/**
 * Resilient fetch with retry logic
 */
const resilientFetch = async (url, params, retries = 2) => {
    for (let i = 0; i <= retries; i++) {
        try {
            const response = await api.get(url, {
                params,
                signal: abortController?.signal
            });
            return response;
        } catch (error) {
            if (error.name === 'CanceledError') {
                throw error; // Don't retry cancelled requests
            }

            if (i === retries) {
                throw error; // Last retry failed
            }

            console.log(`⚠️ Retry ${i + 1}/${retries} for ${url}`);
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
        }
    }
};

/**
 * Fetch products with caching and resilient fetch
 */
export const fetchProducts = async (page = 1, pageSize = 20, searchTerm = '', category = '') => {
    // Check sessionStorage cache first
    const cacheKey = `products_${getCacheKey(page, pageSize, searchTerm, category)}`;
    const cachedData = getFromSessionCache(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    // Check memory cache
    if (cache.products.has(cacheKey)) {
        console.log('✅ Returning from memory cache');
        return cache.products.get(cacheKey);
    }

    // Cancel previous request if exists
    if (abortController) {
        abortController.abort();
    }
    abortController = new AbortController();

    try {
        // If search term is a barcode, don't use it in general search
        if (searchTerm && isBarcode(searchTerm)) {
            return {
                products: [],
                count: 0,
                page: 1,
                pageSize: 0,
                totalPages: 0,
            };
        }

        const params = {
            action: 'process',
            json: 1,
            page,
            page_size: pageSize,
            sort_by: 'unique_scans_n',
            fields: 'code,product_name,brands,image_url,image_front_url,image_front_small_url,nutrition_grades,quantity,categories,nutriments,ingredients_text,labels',
        };

        if (searchTerm) {
            params.search_terms = searchTerm;
        }

        if (category) {
            params.tagtype_0 = 'categories';
            params.tag_contains_0 = 'contains';
            params.tag_0 = category;
        }

        console.log('🌐 Fetching products from API...');
        const response = await resilientFetch('/cgi/search.pl', params);

        const result = {
            products: response.data.products || [],
            count: response.data.count || 0,
            page: response.data.page || page,
            pageSize: response.data.page_size || pageSize,
            totalPages: Math.ceil((response.data.count || 0) / pageSize),
        };

        // Cache the result
        cache.products.set(cacheKey, result);
        saveToSessionCache(cacheKey, result);

        console.log('✅ Products fetched successfully:', result.products.length);
        return result;
    } catch (error) {
        if (error.name === 'CanceledError') {
            console.log('⏸️ Request cancelled (user typing)');
            throw error;
        }

        console.error('❌ OpenFoodFacts API error:', error.message);
        console.log('🔄 Using mock data as fallback...');

        // Fallback to mock data
        let filteredProducts = [...mockProducts];

        if (searchTerm) {
            filteredProducts = filteredProducts.filter(p =>
                p.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.brands.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        const result = {
            products: filteredProducts,
            count: filteredProducts.length,
            page: 1,
            pageSize: filteredProducts.length,
            totalPages: 1,
        };

        // Cache mock data too
        cache.products.set(cacheKey, result);
        saveToSessionCache(cacheKey, result);

        return result;
    }
};

/**
 * Fetch product by barcode with caching
 */
export const fetchProductByBarcode = async (barcode) => {
    // Check sessionStorage cache first
    const cacheKey = `barcode_${barcode}`;
    const cachedData = getFromSessionCache(cacheKey);
    if (cachedData) {
        return cachedData;
    }

    // Check memory cache
    if (cache.barcodes.has(barcode)) {
        console.log('✅ Returning cached barcode product');
        return cache.barcodes.get(barcode);
    }

    try {
        console.log('🌐 Fetching product by barcode:', barcode);
        const response = await resilientFetch(`/api/v0/product/${barcode}.json`, {
            fields: 'code,product_name,brands,image_url,image_front_url,image_front_small_url,nutrition_grades,quantity,categories,nutriments,ingredients_text,labels,countries',
        });

        if (response.data.status === 1) {
            const product = response.data.product;

            // Cache the result
            cache.barcodes.set(barcode, product);
            saveToSessionCache(cacheKey, product);

            console.log('✅ Product found:', product.product_name);
            return product;
        } else {
            throw new Error('Product not found');
        }
    } catch (error) {
        console.error('❌ Error fetching product by barcode:', error);

        // Fallback to mock data
        const product = mockProducts.find(p => p.code === barcode);
        if (product) {
            console.log('🔄 Using mock product');
            return product;
        }
        throw new Error('Product not found with this barcode');
    }
};

/**
 * Fetch available categories with caching
 */
export const fetchCategories = async () => {
    // Check sessionStorage cache first
    const cachedData = getFromSessionCache('categories');
    if (cachedData) {
        return cachedData;
    }

    // Check memory cache
    if (cache.categories) {
        console.log('✅ Returning cached categories');
        return cache.categories;
    }

    try {
        console.log('🌐 Fetching categories from API...');
        const response = await resilientFetch('/categories.json', { json: 1 });

        // Get top 10 categories sorted by product count
        const categories = response.data.tags || [];
        const result = categories
            .filter(cat => cat.products > 1000)
            .sort((a, b) => b.products - a.products)
            .slice(0, 10)
            .map(cat => ({
                id: cat.id,
                name: cat.name,
                products: cat.products,
            }));

        // Cache the result
        cache.categories = result;
        saveToSessionCache('categories', result);

        console.log('✅ Categories fetched successfully:', result.length);
        return result;
    } catch (error) {
        console.error('❌ Error fetching categories:', error);
        console.log('🔄 Using mock categories as fallback...');

        const result = mockCategories;
        cache.categories = result;
        saveToSessionCache('categories', result);

        return result;
    }
};

/**
 * Clear all caches
 */
export const clearCache = () => {
    cache.products.clear();
    cache.categories = null;
    cache.barcodes.clear();

    // Clear sessionStorage cache
    try {
        const keys = Object.keys(sessionStorage);
        keys.forEach(key => {
            if (key.startsWith('products_') || key.startsWith('barcode_') || key === 'categories') {
                sessionStorage.removeItem(key);
            }
        });
        console.log('🗑️ Cache cleared');
    } catch (e) {
        console.warn('Failed to clear sessionStorage:', e);
    }
};

/**
 * Get Nutri-Score color
 */
export const getNutriScoreColor = (grade) => {
    const colors = {
        a: '#038141',
        b: '#85BB2F',
        c: '#FECB02',
        d: '#EE8100',
        e: '#E63E11',
    };
    return colors[grade?.toLowerCase()] || '#9CA3AF';
};

/**
 * Format product image URL
 */
export const getProductImageUrl = (product) => {
    return product?.image_url ||
        product?.image_front_url ||
        product?.image_front_small_url ||
        null;
};

/**
 * Get product name with fallback
 */
export const getProductName = (product) => {
    return product?.product_name ||
        product?.product_name_en ||
        product?.generic_name ||
        'Unknown Product';
};

/**
 * Get product initials for fallback
 */
export const getProductInitials = (product) => {
    const name = getProductName(product);
    const words = name.split(' ').filter(w => w.length > 0);
    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

/**
 * Client-side sorting functions
 */
export const sortProducts = (products, sortBy) => {
    const sorted = [...products];

    switch (sortBy) {
        case 'name-asc':
            return sorted.sort((a, b) => {
                const nameA = getProductName(a).toLowerCase();
                const nameB = getProductName(b).toLowerCase();
                return nameA.localeCompare(nameB);
            });

        case 'name-desc':
            return sorted.sort((a, b) => {
                const nameA = getProductName(a).toLowerCase();
                const nameB = getProductName(b).toLowerCase();
                return nameB.localeCompare(nameA);
            });

        case 'nutriscore-best':
            return sorted.sort((a, b) => {
                const gradeA = a.nutrition_grades || 'z';
                const gradeB = b.nutrition_grades || 'z';
                return gradeA.localeCompare(gradeB);
            });

        case 'nutriscore-worst':
            return sorted.sort((a, b) => {
                const gradeA = a.nutrition_grades || 'a';
                const gradeB = b.nutrition_grades || 'a';
                return gradeB.localeCompare(gradeA);
            });

        default:
            return sorted;
    }
};
