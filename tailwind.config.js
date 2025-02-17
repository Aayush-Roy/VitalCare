/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        secondary: '#00CC99',
        error: '#FF3B30',
        success: '#34C759',
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        'open-sans': ['Open Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '8px',
      },
      boxShadow: {
        card: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};