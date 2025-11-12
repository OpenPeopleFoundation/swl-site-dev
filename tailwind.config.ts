import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#2A63FF",
        space: "#0a0f1a",
      },
      backgroundImage: {
        "space-gradient":
          "radial-gradient(circle at 20% 20%, #0a0f1a, #020409 70%)",
      },
      boxShadow: {
        glass: "0 0 40px rgba(42,99,255,0.1)",
      },
      backdropBlur: {
        xl: "20px",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
