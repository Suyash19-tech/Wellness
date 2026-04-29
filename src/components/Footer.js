import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

/**
 * Footer Component - Professional High-End Design
 * Clean layout with mission, credits, and social links
 * Features: Light background, emerald accents, responsive design
 */
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-slate-100 mt-auto" style={{ backgroundColor: '#F8FAF9' }}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content - Responsive Layout */}
                <div className="py-6 sm:py-10 flex flex-col space-y-6 md:space-y-0 md:flex-row md:items-center md:justify-between">
                    {/* Left Side - Mini Logo & Mission */}
                    <div className="text-center md:text-left">
                        <h3
                            className="text-base font-bold mb-1.5"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                                Wellness Market
                            </span>
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto md:mx-0">
                            Empowering healthy choices through open data.
                        </p>
                    </div>

                    {/* Center - Credits */}
                    <div className="text-center order-last md:order-none">
                        <p className="text-sm text-gray-700">
                            Designed & Developed by{' '}
                            <span
                                className="font-bold text-emerald-600"
                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                                Suyash Rawat
                            </span>
                        </p>
                    </div>

                    {/* Right Side - Social Links */}
                    <div className="flex items-center justify-center md:justify-end gap-3">
                        {/* GitHub */}
                        <motion.a
                            href="https://github.com/Suyash19-tech"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:text-emerald-600 transition-colors duration-200 border border-gray-200 hover:border-emerald-200"
                            aria-label="GitHub"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </motion.a>

                        {/* LinkedIn */}
                        <motion.a
                            href="https://www.linkedin.com/in/suyash-rawat-a41b27287"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:text-emerald-600 transition-colors duration-200 border border-gray-200 hover:border-emerald-200"
                            aria-label="LinkedIn"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </motion.a>

                        {/* Portfolio/External Link */}
                        <motion.a
                            href="https://suyashrawat.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-2.5 rounded-full bg-gray-50 text-gray-600 hover:text-emerald-600 transition-colors duration-200 border border-gray-200 hover:border-emerald-200"
                            aria-label="Portfolio"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </motion.a>
                    </div>
                </div>

                {/* Bottom Bar - Copyright */}
                <div className="border-t border-slate-100 py-3 sm:py-4">
                    <p className="text-xs text-gray-500 text-center">
                        © {currentYear} Wellness Market. Powered by{' '}
                        <a
                            href="https://world.openfoodfacts.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
                        >
                            OpenFoodFacts API
                        </a>
                        .
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
