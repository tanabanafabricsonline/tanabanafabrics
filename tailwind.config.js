/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#000000",
        "on-primary": "#ffffff",
        "primary-container": "#1c1b1a",
        "on-primary-container": "#868382",
        "primary-fixed": "#e6e2df",
        "primary-fixed-dim": "#cac6c4",
        "on-primary-fixed": "#1c1b1a",
        "on-primary-fixed-variant": "#484645",
        
        "secondary": "#725b38",
        "on-secondary": "#ffffff",
        "secondary-container": "#fedeb2",
        "on-secondary-container": "#78603e",
        "secondary-fixed": "#fedeb2",
        "secondary-fixed-dim": "#e0c298",
        "on-secondary-fixed": "#281800",
        "on-secondary-fixed-variant": "#584323",
        
        "tertiary": "#000000",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#141e16",
        "on-tertiary-container": "#7b877b",
        "tertiary-fixed": "#dae6d8",
        "tertiary-fixed-dim": "#becabd",
        "on-tertiary-fixed": "#141e16",
        "on-tertiary-fixed-variant": "#3f4940",

        "background": "#fbf9f5",
        "on-background": "#1b1c1a",

        "surface": "#fbf9f5",
        "on-surface": "#1b1c1a",
        "surface-dim": "#dbdad6",
        "surface-bright": "#fbf9f5",
        "surface-variant": "#e4e2de",
        "on-surface-variant": "#4a4640",
        "surface-tint": "#605e5c",

        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3ef",
        "surface-container": "#efeeea",
        "surface-container-high": "#eae8e4",
        "surface-container-highest": "#e4e2de",

        "inverse-surface": "#30312e",
        "inverse-on-surface": "#f2f0ed",
        "inverse-primary": "#cac6c4",

        "outline": "#7c766f",
        "outline-variant": "#ccc5bd",

        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "space-3xs": "0.125rem",
        "space-2xs": "0.25rem",
        "space-xs": "0.5rem",
        "space-sm": "0.75rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2rem",
        "space-2xl": "3rem",
        "space-3xl": "4rem",
        "space-4xl": "6rem",
        "gutter-mobile": "1rem",
        "gutter-desktop": "2rem",
        "max-width-content": "1440px"
      },
      fontFamily: {
        "display-lg": ["'Playfair Display'", "serif"],
        "display-md": ["'Playfair Display'", "serif"],
        "display-lg-mobile": ["'Playfair Display'", "serif"],
        "display-md-mobile": ["'Playfair Display'", "serif"],
        "headline-lg": ["'Playfair Display'", "serif"],
        "headline-md": ["'Playfair Display'", "serif"],
        "headline-sm": ["'Playfair Display'", "serif"],
        "price-lg": ["'Playfair Display'", "serif"],
        "price-md": ["'Playfair Display'", "serif"],
        "body-lg": ["'Plus Jakarta Sans'", "sans-serif"],
        "body-md": ["'Plus Jakarta Sans'", "sans-serif"],
        "body-sm": ["'Plus Jakarta Sans'", "sans-serif"],
        "label-caps": ["'Plus Jakarta Sans'", "sans-serif"],
        "label-md": ["'Plus Jakarta Sans'", "sans-serif"]
      }
    }
  },
  plugins: [],
}
