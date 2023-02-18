/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          100: "hsla(var(--primary-hue), 100%, 3%, 1.0)",
          200: "hsla(var(--primary-hue), 100%, 10%, 1.0)",
          300: "hsla(var(--primary-hue), 100%, 25%, 1.0)",
          400: "hsla(var(--primary-hue), 100%, 35%, 1.0)",
          600: "hsla(var(--primary-hue), 100%, 50%, 1.0)",
          700: "hsla(var(--primary-hue), 100%, 70%, 1.0)",
          800: "hsla(var(--primary-hue), 100%, 90%, 1.0)",
          900: "hsla(var(--primary-hue), 100%, 97%, 1.0)"
        },
        secondary: {
          100: "hsla(var(--secondary-hue), 100%, 3%, 1.0)",
          200: "hsla(var(--secondary-hue), 100%, 10%, 1.0)",
          300: "hsla(var(--secondary-hue), 100%, 25%, 1.0)",
          400: "hsla(var(--secondary-hue), 100%, 35%, 1.0)",
          600: "hsla(var(--secondary-hue), 100%, 50%, 1.0)",
          700: "hsla(var(--secondary-hue), 100%, 70%, 1.0)",
          800: "hsla(var(--secondary-hue), 100%, 90%, 1.0)",
          900: "hsla(var(--secondary-hue), 100%, 97%, 1.0)"
        }
      }
    }
  },
  plugins: []
}
