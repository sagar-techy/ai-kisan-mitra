import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";


// https://vite.dev/config/
export default defineConfig({
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1f7a3a", // green
        accent: "#f6c84c", // yellow
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
