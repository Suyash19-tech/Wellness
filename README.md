# Wellness Market — A Premium Food Product Explorer

> **Empowering healthy choices through open data and exceptional user experience**

A sophisticated React-based web application that transforms food product discovery into an intuitive, mobile-first experience. Built with modern web technologies and powered by the comprehensive OpenFoodFacts database.

![Wellness Market](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4.19-38B2AC) ![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🌟 Project Overview

**Wellness Market** is a premium food product explorer that leverages the OpenFoodFacts API to deliver a seamless product discovery experience. The application features a clean, organic UI design with mobile-first responsiveness, enabling users to search, filter, and manage food products with unprecedented ease.

The project emphasizes performance, accessibility, and user experience through carefully crafted components, intelligent caching strategies, and responsive design patterns that work flawlessly across all devices.

### Key Highlights
- **🎨 Clean Organic UI**: Minimalist design with natural color palettes and smooth animations
- **📱 Mobile-First**: Responsive design optimized for touch interactions and small screens
- **⚡ Performance Optimized**: Advanced caching and debouncing for lightning-fast responses
- **🔍 Intelligent Search**: Multi-modal search supporting both product names and barcodes
- **🛒 Smart Cart System**: Context-driven cart management with persistent state

---

## ✨ Core Features

### 🔍 **Advanced Search Capabilities**
- **Text Search**: Intelligent product name and brand searching with real-time suggestions
- **Automatic Barcode Detection**: Instantly recognizes and searches 8 or 13-digit barcodes upon entry
- **Debounced Input**: Optimized search with 300ms debouncing for responsive user experience
- **Multi-Field Matching**: Searches across product names, brands, and categories simultaneously

### 🏷️ **Dynamic Category Filtering**
- **API-Driven Categories**: Real-time category fetching from OpenFoodFacts database
- **Horizontal Scrolling**: Mobile-optimized category pills with smooth scrolling
- **Smart Filtering**: Seamless category switching with maintained search context

### 📊 **Nutri-Score Visualization**
- **Color-Coded Badges**: Intuitive A-E nutrition grade display
- **Smart Sorting**: Client-side sorting by nutrition quality (best to worst)
- **Visual Indicators**: Gradient backgrounds and clear typography for easy recognition

### 🔄 **Client-Side Sorting**
- **Multiple Sort Options**: Name (A-Z, Z-A), Nutri-Score (Best/Worst), Relevance
- **Instant Results**: No API calls required for sorting operations
- **Persistent State**: Sort preferences maintained across navigation

### 🛒 **Bonus: Advanced Cart System**
- **Context API Integration**: Centralized cart state management
- **Persistent Storage**: Cart contents preserved across browser sessions
- **Responsive Drawer**: Full-screen mobile cart with desktop slide-out
- **Quantity Management**: Intuitive increment/decrement controls
- **Visual Feedback**: Real-time cart badge updates and animations

### 📱 **Infinite Scroll & Load More**
- **Seamless Pagination**: Automatic loading on scroll with manual "Load More" option
- **Performance Optimized**: Intersection Observer API for efficient scroll detection
- **User Control**: Choice between automatic and manual content loading

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **React.js** | Frontend Framework | 19.2.5 |
| **Tailwind CSS** | Utility-First Styling | 3.4.19 |
| **Framer Motion** | Animation Library | 12.38.0 |
| **Lucide React** | Icon System | 1.14.0 |
| **Axios** | HTTP Client | 1.15.2 |

### Additional Tools
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixing
- **React Context API**: Global state management for cart functionality
- **Intersection Observer API**: Efficient infinite scroll implementation
- **Session Storage**: Client-side caching for improved performance

---

## 🚀 Technical Challenges & Solutions

### **CORS & API Reliability**
**Challenge**: OpenFoodFacts API requires proper identification and has strict CORS policies.

**Solution**: Implemented custom User-Agent headers (`WellnessMarket/1.0 (Student Project)`) to comply with OpenFoodFacts usage policies. Added comprehensive error handling with graceful fallback to mock data when API is unavailable, ensuring uninterrupted user experience.

```javascript
const api = axios.create({
    baseURL: 'https://world.openfoodfacts.org',
    headers: {
        'User-Agent': 'WellnessMarket/1.0 (Student Project)',
    },
});
```

### **Performance Optimization**
**Challenge**: Frequent API calls and large datasets could impact performance.

**Solution**: 
- **SessionStorage Caching**: 30-minute cache for API responses with intelligent invalidation
- **Request Debouncing**: 800ms delay on search input to prevent excessive API calls
- **Lazy Loading**: Intersection Observer for efficient infinite scroll implementation
- **Component Memoization**: Strategic use of React.memo and useCallback for render optimization

### **State Management**
**Challenge**: Complex cart state needed to be shared across multiple components.

**Solution**: Implemented React Context API with custom hooks for cart management, providing centralized state with localStorage persistence. This approach eliminates prop drilling while maintaining performance through selective re-renders.

```javascript
const CartContext = createContext();
export const useCart = () => useContext(CartContext);
```

### **Mobile Responsiveness**
**Challenge**: Creating a seamless experience across all device sizes.

**Solution**: Mobile-first design approach with:
- Responsive grid layouts (1/2/3/4 columns based on screen size)
- Touch-optimized interactions with proper tap targets (44px minimum)
- Horizontal scrolling category filters for mobile
- Full-screen cart drawer on mobile, slide-out on desktop

---

## 🏗️ Methodology

### **Component-Driven Architecture**
Built using a modular approach in React.js, separating logic into custom hooks (`useFood`) and UI into reusable components (`ProductCard`, `CartDrawer`). This architecture ensures maintainability, testability, and scalability while promoting code reuse across the application.

```javascript
// Custom Hook for Business Logic
const useFood = () => {
    // Handles API calls, state management, and data processing
    return { products, loading, handleSearch, loadMore };
};

// Reusable UI Components
<ProductCard product={item} onClick={handleClick} />
<CartDrawer items={cartItems} onClose={handleClose} />
```

### **API Resilience Strategy**
Solved the 503/CORS issue by implementing a strict User-Agent header policy and simple request headers to bypass unnecessary preflight checks. This approach ensures reliable communication with the OpenFoodFacts API while maintaining compliance with their usage policies.

```javascript
const api = axios.create({
    baseURL: 'https://world.openfoodfacts.org',
    headers: {
        'User-Agent': 'WellnessMarket/1.0 (Student Project)',
    },
});
```

### **Performance Logic**
Used an Internal Cache Object to store API responses, preventing redundant network calls and making the app feel 'instant' during navigation. Combined with sessionStorage persistence, users experience lightning-fast interactions even after page refreshes.

```javascript
// Multi-layer caching strategy
const cache = {
    products: new Map(),     // Memory cache for instant access
    sessionStorage: {},      // Persistent cache across sessions
    categories: null         // Static data caching
};
```

### **State Management**
Leveraged the React Context API to handle the cart logic globally, ensuring data consistency across the Navbar, Product Grid, and Detail Modal. This eliminates prop drilling while maintaining performance through selective re-renders.

```javascript
// Global cart state management
const CartContext = createContext();
export const useCart = () => useContext(CartContext);
```

### **Mobile-First Styling**
Utilized Tailwind CSS with a mobile-first approach, implementing a horizontally scrollable category bar and a responsive drawer for the mobile cart. Every component is designed to work flawlessly on touch devices before being enhanced for desktop.

```css
/* Mobile-first responsive design */
.category-bar { @apply flex overflow-x-auto scrollbar-hide; }
.cart-drawer { @apply w-full sm:w-96; }
.product-grid { @apply grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4; }
```

---

## ⏱️ Development Timeline

### **Total Development Time: 2.5 Hours**

| Phase | Duration | Focus Areas |
|-------|----------|-------------|
| **Architecture & API Setup** | 45 mins | • OpenFoodFacts API integration<br>• CORS handling and User-Agent setup<br>• Custom hooks architecture<br>• Error handling and fallback systems |
| **UI Development & Responsiveness** | 45 mins | • Component design and layout<br>• Mobile-first responsive implementation<br>• Tailwind CSS styling<br>• Cross-device compatibility testing |
| **Feature Implementation** | 30 mins | • Search functionality (text + barcode)<br>• Cart system with Context API<br>• Infinite scroll and pagination<br>• Category filtering and sorting |
| **Optimization & Documentation** | 30 mins | • Performance optimization<br>• Caching implementation<br>• Code documentation<br>• README and final polish |

### **Key Milestones**
- ✅ **0-45 mins**: Core architecture and API connectivity established
- ✅ **45-90 mins**: Responsive UI components completed
- ✅ **90-120 mins**: Full feature set implemented and tested
- ✅ **120-150 mins**: Production-ready with documentation

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Suyash19-tech/Assignment.git
   cd Assignment/food-product-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Build for Production
```bash
npm run build
```

### Environment Configuration (Optional)
Create a `.env` file based on `.env.example` to customize API settings:
```env
REACT_APP_API_BASE_URL=https://world.openfoodfacts.org
REACT_APP_USER_AGENT=WellnessMarket/1.0 (your@email.com)
```

---

## 📱 Features in Action

### Search & Discovery
- Type product names or scan barcodes for instant results
- Browse categories with smooth horizontal scrolling
- Sort by nutrition quality or alphabetical order

### Cart Management
- Add products with a single tap
- Manage quantities with intuitive controls
- Persistent cart across browser sessions
- Responsive drawer interface

### Mobile Experience
- Touch-optimized interactions
- Infinite scroll for seamless browsing
- Full-screen cart on mobile devices
- Fast loading with intelligent caching

---


## 🔮 Future Enhancements

- **PWA Support**: Offline functionality and app-like experience
- **Advanced Filters**: Allergen filtering and dietary preferences
- **User Accounts**: Personalized recommendations and favorites
- **Nutrition Analysis**: Detailed nutritional breakdowns and comparisons
- **Multi-language Support**: Internationalization for global users

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Credits

**Developed by [Suyash Rawat](https://github.com/Suyash19-tech)**

*Made by Suyash Rawat - Passionate about creating exceptional user experiences through modern web technologies*


- 💼 **LinkedIn**: [linkedin.com/in/suyash-rawat-a41b27287](https://www.linkedin.com/in/suyash-rawat-a41b27287)
- 📧 **GitHub**: [github.com/Suyash19-tech](https://github.com/Suyash19-tech)

---

## 🙏 Acknowledgments

- **OpenFoodFacts**: For providing the comprehensive food product database
- **React Team**: For the excellent framework and documentation
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For smooth and performant animations

---

<div align="center">

**Built with ❤️ and modern web technologies**

*Wellness Market - Empowering healthy choices through exceptional user experience*

</div>
