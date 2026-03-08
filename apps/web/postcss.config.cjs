// PostCSS configuration (CommonJS) for the `web` app.
// Ensures Tailwind CSS and Autoprefixer run during Vite builds and dev server.
//
// This file is CommonJS because some tools expect `postcss.config.cjs` to export via module.exports.
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
