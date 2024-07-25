import type { Config } from "tailwindcss";

const config: Config = {
  // tell to TailwindCSS's JIT (Just-In-Time) what paths exist
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        "sex-on-the-beach": "69px",
      },
    },
  },
  plugins: [],
};
export default config;
