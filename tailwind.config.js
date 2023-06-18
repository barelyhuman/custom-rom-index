module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './containers/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        base: 'var(--base)',
        surface: 'var(--surface)',
        overlay: 'var(--overlay)',
        dimmer: 'var(--dimmer)',
        dim: 'var(--dim)',
        text: 'var(--text)',
        success: 'var(--success)',
        error: 'var(--error)',
        warn: 'var(--warn)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
