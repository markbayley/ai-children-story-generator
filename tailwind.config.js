/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      fontFamily: { 
        antiqua: ["var(--font-antiqua)"],
      },
      screens: {
        //'2xl': '1537px',
        '3xl': '2560px',
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  plugins: [],
}
