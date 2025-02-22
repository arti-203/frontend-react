//
// postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      config: './tailwind.config.cjs' // Also ensure Tailwind config is .cjs if needed
    },
    autoprefixer: {}
  }
};
