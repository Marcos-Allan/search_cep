/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-primary': '#0BBF7D',
        'my-secondary': '#147350',
        'my-terciary': '#f2f2f2',
        'my-quartenary': '#595959',
        'my-quintenary': '#0d0d0d'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

