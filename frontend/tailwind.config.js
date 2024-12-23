export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
  theme: {
    extend: { 
      screens: {
        'xs': '414px', 
      },   
      colors: {
      googleGreen: "#4BAF47",
    },
  },

    fontFamily: {
      roboto: ['Roboto', "sans-serif"],
      poppins: ['Poppins', "sans-serif"],
      covered: ["Covered By Your Grace", 'sans-serif'],
      manrope: ['Manrope', 'sans-serif'],

    },
    backgroundImage: {
      'contact-bg': "url('./src/images/contact_bg.webp')", 
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}
 
