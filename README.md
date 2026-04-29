# 🥗 Food Product Explorer

A premium food product discovery application built with React.js, featuring a "Fresh Organic Modernism" design philosophy.

## Design Philosophy

**Fresh Organic Modernism**
- Background: `#F8FAF9` (Soft mint white)
- Primary: `#10B981` (Emerald green)
- Text: `#1F2937` (Dark gray)
- Pure white cards with soft shadows
- Large rounded corners (24px)
- Generous white space
- Smooth Framer Motion animations

## Features

### ✨ Core Functionality
- **Smart Search**: Debounced text search with instant results
- **Barcode Scanner**: Direct product lookup by barcode
- **Category Filters**: Browse by food categories from Open Food Facts
- **Sort Options**: Sort by relevance, name (A-Z), or Nutri-Score (A-E)
- **Infinite Scroll**: Seamless loading of 20 products at a time
- **Responsive Design**: Mobile-first approach with adaptive layouts

### 🎨 UI Components
- **ProductCard**: Clean white cards with hover effects
- **SearchBar**: Dual-mode search (text/barcode)
- **CategoryFilter**: Animated filter chips
- **NutriScoreBadge**: Color-coded nutritional grades
- **ProductDetail**: Modal with comprehensive product information
- **Loading Skeletons**: Smooth loading states

### 🔧 Technical Architecture
- **Data Layer**: `src/utils/api.js` - OpenFoodFacts API integration
- **State Management**: `src/hooks/useFood.js` - Custom hook for data management
- **Animations**: Framer Motion for smooth transitions
- **Styling**: Tailwind CSS with custom theme

## Installation

```bash
# Navigate to project directory
cd food-product-explorer

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
food-product-explorer/
├── src/
│   ├── components/
│   │   ├── CategoryFilter.js      # Category filter chips
│   │   ├── NutriScoreBadge.js     # Nutri-Score display
│   │   ├── ProductCard.js         # Product card component
│   │   ├── ProductDetail.js       # Product detail modal
│   │   ├── ProductGrid.js         # Grid with infinite scroll
│   │   ├── SearchBar.js           # Dual-mode search
│   │   └── SortControl.js         # Sort dropdown
│   ├── hooks/
│   │   └── useFood.js             # Custom data management hook
│   ├── utils/
│   │   └── api.js                 # OpenFoodFacts API layer
│   ├── App.js                     # Main application
│   ├── index.css                  # Tailwind imports
│   └── index.js                   # React entry point
├── tailwind.config.js             # Custom theme configuration
└── package.json
```

## API Integration

The app uses the [Open Food Facts API](https://world.openfoodfacts.org) with proper User-Agent headers as required by their documentation.

### Key API Functions

- `fetchProducts(page, pageSize, searchTerm, category)` - Get paginated products
- `fetchProductByBarcode(barcode)` - Get specific product by barcode
- `fetchCategories()` - Get available food categories
- `getNutriScoreColor(grade)` - Get color for Nutri-Score badge
- `getProductImageUrl(product)` - Get product image with fallback
- `getProductName(product)` - Get product name with fallback

## Usage

### Search Products
1. Type in the search bar for text-based search (debounced)
2. Click "Barcode" button to switch to barcode mode
3. Enter barcode and click "Search"

### Filter & Sort
1. Click category chips to filter by category
2. Use the sort dropdown to change sort order
3. Click "Reset Filters" to clear all filters

### View Details
1. Click any product card to view detailed information
2. See nutrition facts, ingredients, labels, and more
3. Click outside or the X button to close

### Infinite Scroll
- Scroll down to automatically load more products
- Loading skeletons appear while fetching
- "End of list" message when all products are loaded

## Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  background: '#F8FAF9',
  primary: '#10B981',
  // Add your custom colors
}
```

### API Configuration
Edit `src/utils/api.js` to modify API settings:

```javascript
const BASE_URL = 'https://world.openfoodfacts.org';
const USER_AGENT = 'FoodProductExplorer/1.0 (your@email.com)';
```

## Technologies

- **React 18** - UI library
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Open Food Facts API** - Product data source

## Performance Optimizations

- Debounced search (500ms delay)
- Intersection Observer for infinite scroll
- Image lazy loading with error fallbacks
- Memoized callbacks in custom hooks
- Staggered animations for smooth entry

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Credits

- Data provided by [Open Food Facts](https://world.openfoodfacts.org)
- Design: Fresh Organic Modernism
- Built with ❤️ using React
