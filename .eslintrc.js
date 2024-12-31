module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-console': 2,
    'no-debugger': 2,
    'prettier/prettier': 2,
    '@typescript-eslint/no-explicit-any': 2,
    '@typescript-eslint/no-unused-vars': 2,
    '@typescript-eslint/ban-ts-comment': 2,
    '@typescript-eslint/ban-types': 0,
    'preferred-spread': 0,
    '@typescript-eslint/no-non-null-assertion': 2,
    '@typescript-eslint/no-var-requires': 0,
  },
};
