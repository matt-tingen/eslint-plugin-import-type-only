import type { ESLint, Linter, Rule } from 'eslint';
import { name, version } from '../package.json';
import { preferTypeImport } from './preferTypeImport';

const plugin = {
  meta: {
    name,
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
    'prefer-type-import': ['error', 'type-fest'],
  },
});

// eslint-disable-next-line import/no-default-export
export default plugin;
