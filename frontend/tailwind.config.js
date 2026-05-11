/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 50:'#fff7ed', 100:'#ffedd5', 200:'#fed7aa', 300:'#fdba74', 400:'#fb923c', 500:'#f97316', 600:'#ea580c', 700:'#c2410c', 800:'#9a3412', 900:'#7c2d12' },
        juice: { green:'#22c55e', orange:'#f97316', yellow:'#eab308', pink:'#ec4899', purple:'#a855f7', red:'#ef4444', teal:'#14b8a6' }
      },
      fontFamily: { display: ['Poppins','sans-serif'], body: ['Inter','sans-serif'] },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s ease-out',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        slideIn: { from: { transform: 'translateX(-100%)' }, to: { transform: 'translateX(0)' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(30px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};
