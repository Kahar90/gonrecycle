/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-green': '#7FCA27',
        'dark-green': '#0C6000',
        'light-green-hover': '#74B723',
        'dark-green-hover': '#084200',
      } 
    },
  },
  plugins: [require("daisyui")],
}
