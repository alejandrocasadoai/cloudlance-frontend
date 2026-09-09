/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: 'var(--orange)',
        'orange-dark': 'var(--orange-dark)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        brown: 'var(--brown)',
        cream: 'var(--cream)',
        surface: 'var(--surface)',
        line: 'var(--line)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        info: 'var(--info)',
      },
      fontFamily: {
        sans: ['Hanken Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}