/** @type {import('tailwindcss').Config} */

import daisyui from './node_modules/daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}