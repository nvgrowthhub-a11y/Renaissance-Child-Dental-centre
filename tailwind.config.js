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
        primary: "#006a65",
        "primary-container": "#1fa8a0",
        "primary-teal": "#1FA8A0",
        "primary-mint": "#2BB5AA",
        "primary-fixed": "#80f6ec",
        "primary-fixed-dim": "#61d9d0",
        "on-primary": "#ffffff",
        "on-primary-container": "#003633",

        secondary: "#006a63",
        "secondary-container": "#78f4e7",
        "secondary-fixed": "#7bf6ea",
        "secondary-fixed-dim": "#5cdace",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#006f67",

        tertiary: "#3e646d",
        "tertiary-container": "#779da7",
        "tertiary-fixed": "#c1e9f4",
        "on-tertiary": "#ffffff",

        surface: "#f7f9ff",
        "surface-dim": "#c3ddf6",
        "surface-bright": "#f7f9ff",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#ecf4ff",
        "surface-container": "#e1efff",
        "surface-container-high": "#d6ebff",
        "surface-container-highest": "#cce6ff",
        "surface-variant": "#cce6ff",

        "on-surface": "#011e30",
        "navy-dark": "#0F2A3D",
        "on-surface-variant": "#3d4948",
        "inverse-surface": "#193346",
        "inverse-on-surface": "#e7f2ff",
        outline: "#6d7a78",
        "outline-variant": "#bcc9c7",

        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",

        background: "#f7f9ff",
        "on-background": "#011e30"
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "-apple-system", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "sans-serif"]
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        'full': '9999px',
      },
      spacing: {
        'margin': '1.25rem',
        'gutter': '1rem',
        'space-xs': '0.25rem',
        'space-sm': '0.5rem',
        'space-md': '1rem',
        'space-lg': '1.5rem',
        'space-xl': '2rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 168, 160, 0.08)',
        'glass-glow': '0 8px 24px -4px rgba(31, 168, 160, 0.35)',
        'glass-hover': '0 12px 36px 0 rgba(31, 168, 160, 0.16)',
        'soft': '0 4px 20px -2px rgba(15, 42, 61, 0.06)',
      },
      animation: {
        'float-slow': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 0.9, transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
