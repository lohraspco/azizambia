import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        roseGold: '#E7BFB4',
        lavender: '#BFAEE3',
        deepNavy: '#1B1B3A',
        warmGray: '#F3EDE8'
      },
      backgroundImage: {
        'soft-gradient': 'linear-gradient(135deg, #E7BFB4 0%, #BFAEE3 100%)'
      },
      boxShadow: {
        glow: '0 10px 40px rgba(231, 191, 180, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
