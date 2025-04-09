module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wijn-rood': '#e63946',
        'wijn-blauw': '#457b9d',
        'wijn-lichtgroen': '#a8dadc',
        'wijn-donkergroen': '#1d3557',
        'wijn-beige': '#f1faee',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
