/** @type {import('tailwindcss').Config} */
export default {
  content: ['./public/index.html', './src/**/*.{svelte,js,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light"],
  },
}

