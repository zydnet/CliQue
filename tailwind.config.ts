import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#660033",
          dark: "#5A002A",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#E673AC",
          dark: "#C35A8B",
          foreground: "#000000",
          'dark-foreground': "#FFFFFF"
        },
        accent: {
          DEFAULT: "#469110",
          dark: "#3A770E",
          foreground: "#FFFFFF"
        },
        success: {
          DEFAULT: "#00520A",
          dark: "#003E08",
          foreground: "#FFFFFF"
        },
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#121212"
        },
        text: {
          primary: "#000000",
          secondary: "#666666",
          'dark-primary': "rgba(255,255,255,0.87)",
          'dark-secondary': "rgba(255,255,255,0.60)"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        purple: {
          50: "#faf7ff",
          100: "#f3ecff",
          200: "#e6d9ff",
          300: "#d4c0ff",
          400: "#b899ff",
          500: "#9966ff",
          600: "#723480", // Deep purple from palette
          700: "#5f2a6b",
          800: "#4f2356",
          900: "#421d47",
        },
        cream: {
          50: "#fffffe",
          100: "#fffffc",
          200: "#fffff9",
          300: "#ffffe3", // Light cream from palette
          400: "#ffffcc",
          500: "#ffffb3",
          600: "#f5f5a3",
          700: "#ebeb93",
          800: "#e1e183",
          900: "#d7d773",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        progress: "progress 2s ease-in-out",
        countdown: "pulse 1s ease-in-out infinite",
        urgency: "urgency 0.5s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "cart-bounce": "cartBounce 0.6s ease-in-out",
        "cart-shake": "cartShake 0.3s ease-in-out",
        "gradient-shift": "gradientShift 8s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "bounce-slow": "bounce 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
      },
      keyframes: {
        progress: {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width)" },
        },
        urgency: {
          "0%": { backgroundColor: "#723480" },
          "100%": { backgroundColor: "#9966ff" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        cartBounce: {
          "0%, 20%, 50%, 80%, 100%": { transform: "translateY(0)" },
          "40%": { transform: "translateY(-4px)" },
          "60%": { transform: "translateY(-2px)" },
        },
        cartShake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-1px)" },
          "75%": { transform: "translateX(1px)" },
        },
        gradientShift: {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
            transform: "rotate(0deg)",
          },
          "50%": {
            backgroundPosition: "100% 50%",
            transform: "rotate(180deg)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
