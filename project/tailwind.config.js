/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["var(--font-bebas)", "sans-serif"],
        ibmPlexItalic: ["var(--font-ibmPlexItalic)", "sans-serif"],
        ibmPlexVariable: ["var(--font-ibmPlexVariable)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
