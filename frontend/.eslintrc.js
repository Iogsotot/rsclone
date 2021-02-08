module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    // "airbnb-typescript/base"
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    // 'exceptAfterSingleLine': 0,
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

// module.exports = {
//   env: {
//     browser: true,
//     es6: true,
//   },
//   extends: ['eslint:recommended', 'airbnb-base', 'plugin:@typescript-eslint/recommended'],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaVersion: 12,
//     sourceType: 'module',
//   },
//   plugins: ['@typescript-eslint'],
//   rules: {
//     'import/extensions': [
//       'error',
//       'ignorePackages',
//       {
//         ts: 'never',
//         tsx: 'never',
//       },
//     ],
//     'max-len': ['error', { code: 120 }],
//   },
//   settings: {
//     'import/resolver': {
//       typescript: {},
//     },
//   },
// };
