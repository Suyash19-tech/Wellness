/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Outfit', 'Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
                jakarta: ['Plus Jakarta Sans', 'sans-serif'],
            },
            colors: {
                background: '#F8FAF9',
                primary: '#10B981',
                emerald: {
                    DEFAULT: '#10B981',
                    light: '#34D399',
                    dark: '#059669',
                },
                text: {
                    DEFAULT: '#1F2937',
                    light: '#6B7280',
                }
            },
            borderRadius: {
                'card': '28px',
            },
            boxShadow: {
                'card': '0 8px 30px rgb(0 0 0 / 0.04)',
                'card-hover': '0 20px 60px rgb(0 0 0 / 0.08)',
                'glow-emerald': '0 8px 30px rgba(16, 185, 129, 0.35)',
            }
        },
    },
    plugins: [],
}
