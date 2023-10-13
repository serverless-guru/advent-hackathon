/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {  colors: {
        // TODO: wait for Ian to add colors and their names to style guide, and start adding them here
        green: {
          default: '#72DE94',
          hover: '#56A76F'

        },
        red: {
          default: '#FF3F3F',
          hover: '#BF2F2F'

        },
        black: {
          darker: '#020409'

        },
        gray: {
          light: '#7E858F'
        }

      }},
  },
  plugins: [],
}

