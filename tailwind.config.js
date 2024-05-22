/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        black: 'hsl(var(--black))',
        grey: {
          1: 'hsl(var(--grey-1))',
          2: 'hsl(var(--grey-2))',
          3: 'hsl(var(--grey-3))',
          4: 'hsl(var(--grey-4))',
          5: 'hsl(var(--grey-5))',
          6: 'hsl(var(--grey-6))',
          7: 'hsl(var(--grey-7))',
          8: 'hsl(var(--grey-8))',
          9: 'hsl(var(--grey-9))',
          10: 'hsl(var(--grey-10))',
          11: 'hsl(var(--grey-11))',
          12: 'hsl(var(--grey-12))',
          13: 'hsl(var(--grey-13))',
        },
        orange: {
          1: 'hsl(var(--orange-1))',
          2: 'hsl(var(--orange-2))',
          3: 'hsl(var(--orange-3))',
          4: 'hsl(var(--orange-4))',
          5: 'hsl(var(--orange-5))',
          6: 'hsl(var(--orange-6))',
          7: 'hsl(var(--orange-7))',
          8: 'hsl(var(--orange-8))',
          9: 'hsl(var(--orange-9))',
          10: 'hsl(var(--orange-10))',
        },
        red: {
          1: 'hsl(var(--red-1))',
          2: 'hsl(var(--red-2))',
          3: 'hsl(var(--red-3))',
          4: 'hsl(var(--red-4))',
          5: 'hsl(var(--red-5))',
          6: 'hsl(var(--red-6))',
          7: 'hsl(var(--red-7))',
          8: 'hsl(var(--red-8))',
          9: 'hsl(var(--red-9))',
          10: 'hsl(var(--red-10))',
        },
        green: {
          1: 'hsl(var(--green-1))',
          2: 'hsl(var(--green-2))',
          3: 'hsl(var(--green-3))',
          4: 'hsl(var(--green-4))',
          5: 'hsl(var(--green-5))',
          6: 'hsl(var(--green-6))',
          7: 'hsl(var(--green-7))',
          8: 'hsl(var(--green-8))',
          9: 'hsl(var(--green-9))',
          10: 'hsl(var(--green-10))',
        },
        blue: {
          1: 'hsl(var(--blue-1))',
          2: 'hsl(var(--blue-2))',
          3: 'hsl(var(--blue-3))',
          4: 'hsl(var(--blue-4))',
          5: 'hsl(var(--blue-5))',
          6: 'hsl(var(--blue-6))',
          7: 'hsl(var(--blue-7))',
          8: 'hsl(var(--blue-8))',
          9: 'hsl(var(--blue-9))',
          10: 'hsl(var(--blue-10))',
        },
        teal: {
          1: 'hsl(var(--teal-1))',
          2: 'hsl(var(--teal-2))',
          3: 'hsl(var(--teal-3))',
          4: 'hsl(var(--teal-4))',
          5: 'hsl(var(--teal-5))',
          6: 'hsl(var(--teal-6))',
          7: 'hsl(var(--teal-7))',
          8: 'hsl(var(--teal-8))',
          9: 'hsl(var(--teal-9))',
          10: 'hsl(var(--teal-10))',
        },
        purple: {
          1: 'hsl(var(--purple-1))',
          2: 'hsl(var(--purple-2))',
          3: 'hsl(var(--purple-3))',
          4: 'hsl(var(--purple-4))',
          5: 'hsl(var(--purple-5))',
          6: 'hsl(var(--purple-6))',
          7: 'hsl(var(--purple-7))',
          8: 'hsl(var(--purple-8))',
          9: 'hsl(var(--purple-9))',
          10: 'hsl(var(--purple-10))',
        },
        yellow: {
          1: 'hsl(var(--yellow-1))',
          2: 'hsl(var(--yellow-2))',
          3: 'hsl(var(--yellow-3))',
          4: 'hsl(var(--yellow-4))',
          5: 'hsl(var(--yellow-5))',
          6: 'hsl(var(--yellow-6))',
          7: 'hsl(var(--yellow-7))',
          8: 'hsl(var(--yellow-8))',
          9: 'hsl(var(--yellow-9))',
          10: 'hsl(var(--yellow-10))',
        },
        cyan: {
          1: 'hsl(var(--cyan-1))',
          2: 'hsl(var(--cyan-2))',
          3: 'hsl(var(--cyan-3))',
          4: 'hsl(var(--cyan-4))',
          5: 'hsl(var(--cyan-5))',
          6: 'hsl(var(--cyan-6))',
          7: 'hsl(var(--cyan-7))',
          8: 'hsl(var(--cyan-8))',
          9: 'hsl(var(--cyan-9))',
          10: 'hsl(var(--cyan-10))',
        },
        magenta: {
          1: 'hsl(var(--magenta-1))',
          2: 'hsl(var(--magenta-2))',
          3: 'hsl(var(--magenta-3))',
          4: 'hsl(var(--magenta-4))',
          5: 'hsl(var(--magenta-5))',
          6: 'hsl(var(--magenta-6))',
          7: 'hsl(var(--magenta-7))',
          8: 'hsl(var(--magenta-8))',
          9: 'hsl(var(--magenta-9))',
          10: 'hsl(var(--magenta-10))',
        },

        background: {
          DEFAULT: 'hsl(var(--background))',
          second: 'hsl(var(--background-second))',
        },
        foreground: 'hsl(var(--foreground))',
        shadow: {
          neutral70: 'hsl(var(--shadow-neutral70))',
          neutral100: 'hsl(var(--shadow-neutral100))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          hover: 'hsl(var(--teal-5))',
          border: 'hsl(var(--teal-6))',
          outline: 'hsl(var(--teal-3))',
          light: 'hsl(var(--teal-1))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          hover: 'hsl(var(--red-5))',
          border: 'hsl(var(--red-6))',
          outline: 'hsl(var(--red-3))',
          light: 'hsl(var(--red-1))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
          hover: 'hsl(var(--orange-5))',
          border: 'hsl(var(--orange-6))',
          outline: 'hsl(var(--orange-3))',
          light: 'hsl(var(--orange-1))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
          hover: 'hsl(var(--green-5))',
          border: 'hsl(var(--green-6))',
          outline: 'hsl(var(--green-3))',
          light: 'hsl(var(--green-1))',
        },
        info: {
          DEFAULT: 'hsl(var(--info))',
          foreground: 'hsl(var(--info-foreground))',
          hover: 'hsl(var(--blue-5))',
          border: 'hsl(var(--blue-6))',
          outline: 'hsl(var(--blue-3))',
          light: 'hsl(var(--blue-1))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        login: "url('./images/img_login.png')",
        forgot_password: "url('./images/pattern.png')",
      },
    },
  },
  darkMode: ['class'],
  plugins: [require('tailwindcss-animate')],
};
