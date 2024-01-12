/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: "#5A5959",
        yellow: "#FFEAAE",
        darkYellow: "#FCCA3F",
        orange: "#F6820C",
        red:"red"
      },
    },
  },
  plugins: [],
};
