/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oswald: "Oswald-SemiBold",
        fascinate: "Fascinate",
      },
    },
  },
  plugins: [require("daisyui")],
  darkMode: ["selector", '[data-theme="dark"]'],
};
