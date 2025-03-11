import {} from '@typescript-eslint/utils';
import * as fs from 'fs';
import type { ESLint, Linter, Rule } from 'eslint';
import { preferTypeImport } from './preferTypeImport';

const pkg = JSON.parse(
  fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
);

const plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  configs: {
    recommended: {} as Linter.FlatConfig,
  },
  rules: {
    'prefer-type-import': preferTypeImport as unknown as Rule.RuleModule,
  },
} satisfies ESLint.Plugin;

Object.assign(plugin.configs.recommended, {
  name: pkg.name,
  plugins: { [pkg.name]: plugin },
  rules: {
    'prefer-type-import': ['error', 'type-fest'],
  },
});

// eslint-disable-next-line import/no-default-export
export default plugin;
