/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
      maxWidth: {
        '1/2': '50%',
    }
  },
  plugins: [
    // require('flowbite/plugin')
]
}
