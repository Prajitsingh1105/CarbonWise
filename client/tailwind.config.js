export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#16a34a",
        emerald: "#22c55e",
        accentBlue: "#0ea5e9",
        darkBg: "#0f172a",
        lightBg: "#f8fafc"
      },
      borderRadius: {
        "2xl": "1.5rem"
      }
    }
  },
  plugins: []
};