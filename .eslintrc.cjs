require('@matt-tingen/eslint-config/patch');

module.exports = {
  root: true,
  extends: ['@matt-tingen/eslint-config/base'],
  settings: {
    jest: {
      version: 27,
    },
  },
  rules: {
    'jest/no-standalone-expect': 'off', // Doesn't work with jest-macros
    '@typescript-eslint/explicit-module-boundary-types': 'error',
  },
};
