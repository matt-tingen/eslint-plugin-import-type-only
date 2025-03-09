import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { createRule } from './createRule';

export const preferTypeImport = createRule({
  name: 'prefer-type-import',
  defaultOptions: [] as string[],
  meta: {
    docs: {
      description: 'Prefer type imports for type-only packages',
    },
    fixable: 'code',
    type: 'suggestion',
    messages: {
      'prefer-type-import': 'Prefer type imports for type-only packages',
    },
    schema: {
      description: 'A list of type-only package names',
      type: 'array',
      items: { type: 'string' },
    },
  },
  create: (ctx) => {
    const packages = new Set(ctx.options);

    return {
      ImportDeclaration: (node) => {
        if (!packages.has(node.source.value) || node.importKind === 'type')
          return;

        ctx.report({
          messageId: 'prefer-type-import',
          node,
          fix: (fixer) => [
            fixer.replaceTextRange(
              [node.range[0], node.range[0] + 'import'.length],
              'import type',
            ),
            ...node.specifiers
              .filter(
                (spec) =>
                  spec.type === AST_NODE_TYPES.ImportSpecifier &&
                  spec.importKind === 'type',
              )
              .map((spec) =>
                fixer.replaceTextRange(
                  [spec.range[0], spec.range[0] + 'type '.length],
                  '',
                ),
              ),
          ],
        });
      },
    };
  },
});
