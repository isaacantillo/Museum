/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#333333',
        accent: '#4a90e2',
        background: '#ffffff',
        text: '#222222',
        'museum-red': '#A7233B',
        'museum-dark': '#343333',
        'museum-gray': '#7C746E'
      },
      spacing: {
        '200px': '200px'
      },
      fontFamily: {
        sans: ['System'],
        serif: ['Georgia']
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '30px',
        '4xl': '36px'
      }
    },
  },
  plugins: [],
}