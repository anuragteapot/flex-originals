module.exports = {
  root: true,

  env: {
    browser: true,
    es6: true,
  },

  extends: ['plugin:vue/essential', 'eslint:recommended', 'prettier'],

  plugins: ['vue'],

  parserOptions: {
    parser: 'babel-eslint',
  },

  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.config.js',
      },
    },
  },

  rules: {
    // Add custom rules below
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
  },
};