/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {
    fontFamily: {
      sans: ['Pretendard', 'sans-serif'],
    },
    colors: {
      'point': '#5E936C',
      'main1': '#B0DB9C',
      'main2': '#CAE8BD',
      'main3': '#DDF6D2',
      'main4': '#ECFAE5',
      'gray1': '#EAEAEA',
      'gray2': '#D9D9D9',
      'gray3': '#767676',
      'gray4': '#505050',
      'black': '#222222',
      'white': '#FFFFFF',
      'red': '#E55B5B',
      'error': '#5B86E5',
      'background': '#FBFEFA',
    }
  },},
  plugins: [],
  }

