import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '375px', // 모바일
      md: '744px', // 태블릿
      lg: '1440px', // 데스크탑
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        black: '#1B1B1B',
        'nomad-black': '#112211',
        gray: {
          900: '#4B4B4B',
          800: '#79747E',
          700: '#A1A1A1',
          600: '#A4A1AA',
          500: '#ADAEB8',
          400: '#CBC9CF',
          300: '#DDDDDD',
          200: '#EEEEEE',
          100: '#FAFAFA',
        },
        green: {
          3: '#0B3B2D',
          2: '#CED8D5',
          1: '#00AC07',
        },
        red: {
          3: '#FF472E',
          2: '#FFC2BA',
          1: '#FFE4E0',
        },
        orange: {
          2: '#FF7C1D',
          1: '#FFF4E8',
        },
        yellow: {
          1: '#FFC23D',
        },
        blue: {
          3: '#0085FF',
          2: '#2EB4FF',
          1: '#E5F3FF',
        },
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'], // CSS 변수 사용
      },
      fontSize: {
        '3xl': ['32px', { lineHeight: '42px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        xl: ['20px', { lineHeight: '32px' }],
        '2lg': ['18px', { lineHeight: '26px' }],
        lg: ['16px', { lineHeight: '26px' }],
        md: ['14px', { lineHeight: '24px' }],
        sm: ['13px', { lineHeight: '22px' }],
        xs: ['12px', { lineHeight: '18px' }],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
} satisfies Config;
