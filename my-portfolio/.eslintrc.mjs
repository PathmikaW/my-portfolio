const config = {
  root: true,
  extends: ['next/core-web-vitals', 'prettier'],
  plugins: ['tailwindcss'],
  rules: {
    'tailwindcss/no-custom-classname': 'off',
  },
};

export default config;
