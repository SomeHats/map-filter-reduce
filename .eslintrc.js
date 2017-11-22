module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  rules: {
    indent: 0,
    'linebreak-style': ['error', 'unix'],
    quotes: 0,
    semi: ['error', 'always'],
    'react/no-unescaped-entities': 0,
  },
};
