module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-plusplus': ['error',
      {
        allowForLoopAfterthoughts: true,
      }],
    'no-use-before-define': ['error',
      {
        functions: false,
      }],
    'import/extensions': 'warn',
    'max-len': ['error', { code: 120 }],
  },
};
