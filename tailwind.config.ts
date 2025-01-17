import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bluePrimary: "#0079FF", 
        grayPrimary: "#434343", 
        grayDark: "#9D9D9D",  
        grayLight: "#EAEAEA", 
        grayHover: "#4F606F", 
        grayMuted: "#CCCCCC", 
      },
    },
  },
  plugins: [],
};
export default config;
