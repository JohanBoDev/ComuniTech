module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        texto: ['Poppins', 'sans-serif'], // Tipografía para títulos
        titulo: ['Montserrat', 'sans-serif'], // Tipografía para texto
      },
    },
  },
  plugins: [],
};
