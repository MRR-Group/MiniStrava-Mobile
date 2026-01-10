/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,tsx}",
    "./src/**/*.{js,ts,tsx}",
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        bg: "#0b0d12",
        card: "#141822",
        card2: "#0f131b",
        text: "#e8ebf1",
        muted: "#9aa3b2",
        primary: "#7c5cff",
        primary2: "#54e0ff",
        accent: "#ff4db7",
        ok: "#2de38a",
        warn: "#ffb84d",
        danger: "#ff4d6d",
      },
      boxShadow: {
        custom: "0 10px 30px rgba(0, 0, 0, .35)",
      },
      borderRadius: {
        custom: "18px",
      },
      backgroundImage: {
        black1: "radial-gradient(1200px 700px at 80% -10%, rgba(124,92,255,0.18), transparent 60%), radial-gradient(900px 500px at -10% 100%, rgba(84,224,255,0.15), transparent 60%), #0b0d12",
      },
    },
  },
  plugins: [],
};