/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "#1": " rgba(149, 157, 165, 0.2) 0px 8px 24px;",
        "#2": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      },
    },
  },
  plugins: [],
};
