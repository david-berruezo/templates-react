/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Clash Display', 'sans-serif'],
      },
      colors: {
        ink: '#1a1a2e',
        paper: '#faf9f7',
        accent: '#e94560',
        muted: '#8b8ba3',
        surface: '#ffffff',
        'surface-alt': '#f4f3f0',
      }
    },
  },
  plugins: [],
}
