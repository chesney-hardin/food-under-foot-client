/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors : {
      "fuf-green": "#377450",
      "fuf-teal": "#AAE2DC"
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

