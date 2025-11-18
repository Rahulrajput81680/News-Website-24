import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // TrendHandy Professional News Theme (Red + Black + White)
        primary: {
          DEFAULT: '#E50914',
          red: '#E50914',
          dark: '#C50812',
          light: '#FF1A24',
        },
        background: {
          DEFAULT: '#0A0A0A',
          dark: '#000000',
          card: '#1A1A1A',
          light: '#FFFFFF',
          article: '#F5F5F5',
        },
        text: {
          primary: '#FFFFFF',
          dark: '#0A0A0A',
          secondary: '#E0E0E0',
          muted: '#BFBFBF',
        },
        border: {
          DEFAULT: '#1A1A1A',
          card: '#2A2A2A',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
