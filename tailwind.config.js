/** @type {import('tailwindcss').Config} */

import daisyui from './node_modules/daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'body-pattern': "url('https://img.freepik.com/free-vector/vintage-ornamental-flowers-background_52683-28040.jpg')"
      }
    },
  },
  plugins: [
    daisyui,
  ],
}