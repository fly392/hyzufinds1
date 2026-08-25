/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#0a0a0a',
        'dark-card': '#1a1a1a',
        'dark-hover': '#252525',
        'red-accent': '#ff0000',
        'red-hover': '#cc0000',
      },
    },
  },
  plugins: [],
}
