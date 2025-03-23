import mt from '@matt-tingen/eslint-config';
import eslintPlugin from 'eslint-plugin-eslint-plugin';

export default [
  ...mt.configs.recommended,
  eslintPlugin.configs['flat/recommended'],
];
