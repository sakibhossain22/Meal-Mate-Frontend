import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // তোমার দেওয়া কালার প্যালেট
        primary: "#F39200",    // Orange
        secondary: "#006747",  // Green
        dark: "#0a0a0a",       // Deep Black background
        card: "#161616",       // Slightly lighter black for cards
      },
      // গ্লাসমরফিজমের জন্য বর্ডার আর্টার গ্লো
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(110deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
      },
    },
  },
  plugins: [],
};
export default config;