/** @type {import('tailwindcss').Config} */

import daisyui from './node_modules/daisyui'

const backgroundImageUrl = "https://img.freepik.com/free-vector/stylish-hexagonal-line-pattern-background_1017-19742.jpg";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'body-pattern': `url(${backgroundImageUrl})`
      },
      spacing: {
        '90': '22rem'
      }
    },
  },
  plugins: [
    daisyui,
  ],
}