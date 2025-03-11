import type { ESLint, Linter, Rule } from 'eslint';
import { name as fullName, version } from '../package.json';
import { preferTypeImport } from './preferTypeImport';

const name = fullName.replace('eslint-plugin-', '');

const plugin = {
  meta: {
    name: fullName,
    version,
  },
  configs: {
    recommended: {} as Linter.FlatConfig,
  },
  rules: {
    'prefer-type-import': preferTypeImport as unknown as Rule.RuleModule,
  },
} satisfies ESLint.Plugin;

Object.assign(plugin.configs.recommended, {
  name,
  plugins: { [name]: plugin },
  rules: {
    [`${name}/prefer-type-import`]: ['error', 'type-fest'],
  },
});

// eslint-disable-next-line import/no-default-export
export default plugin;
