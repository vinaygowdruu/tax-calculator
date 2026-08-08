/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Primary brand — deep navy. Anchored at 600 (#1B3A5C) so that
        // bg-brand-600 / hover:bg-brand-700 / active:bg-brand-800 read as
        // button, hover, pressed. Swap these values to re-theme the app.
        brand: {
          50:  '#EEF3F8',
          100: '#D8E4F0',
          200: '#B4CADF',
          300: '#85A8C7',
          400: '#5484AC',
          500: '#33628E',
          600: '#1B3A5C',
          700: '#14304D',
          800: '#0F2439',
          900: '#0A1A2A',
          950: '#050D15',
        },
      },
      boxShadow: {
        // Flatter, cooler shadows than Tailwind's defaults — less "app", more document.
        card: '0 1px 2px 0 rgb(15 36 57 / 0.04), 0 1px 3px 0 rgb(15 36 57 / 0.06)',
        'card-hover': '0 2px 4px -1px rgb(15 36 57 / 0.06), 0 4px 12px -2px rgb(15 36 57 / 0.08)',
        panel: '0 4px 16px -4px rgb(15 36 57 / 0.10)',
      },
    },
  },
  plugins: [],
}
