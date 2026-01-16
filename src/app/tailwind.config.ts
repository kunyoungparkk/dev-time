import type {Config} from 'tailwindcss';
import { colors } from '../styles/tokens/colors';
import { fontSize } from '../styles/tokens/typography';

const config: Config = {
  content: [
    '../src/app/**/*.{ts,tsx}',
    '../src/components/**/*.{ts,tsx}',
    '../src/styles/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors,
      fontSize,
    },
  },
  plugins: [],
};

export default config;
