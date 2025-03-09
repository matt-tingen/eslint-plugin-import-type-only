import { RuleTester } from '@typescript-eslint/rule-tester';
import { preferTypeImport } from './preferTypeImport';

const ruleTester = new RuleTester();

const options = ['type-fest'];

ruleTester.run('prefer-type-import', preferTypeImport, {
  valid: [
    { code: "import type { Except } from 'type-fest'", options },
    { code: "import type TypeFest from 'type-fest'", options },
    { code: "import type * as TypeFest from 'type-fest'", options },
    {
      code: "import type { Except, Primitive, Writable } from 'type-fest'",
      options,
    },

    { code: "import type foo from 'foo'" },
    { code: "import type * as foo from 'foo'" },
    { code: "import type { blah } from 'foo'" },
    { code: "import { type blah } from 'foo'" },
    { code: "import { blah } from 'foo'" },
  ],
  invalid: [
    {
      code: "import { Except } from 'type-fest'",
      options,
      errors: [{ messageId: 'prefer-type-import' }],
      output: "import type { Except } from 'type-fest'",
    },
    {
      code: "import { type Except } from 'type-fest'",
      options,
      errors: [{ messageId: 'prefer-type-import' }],
      output: "import type { Except } from 'type-fest'",
    },
    {
      code: "import { Except, Primitive, Writable } from 'type-fest'",
      options,
      errors: [{ messageId: 'prefer-type-import' }],
      output: "import type { Except, Primitive, Writable } from 'type-fest'",
    },
    {
      code: "import { Except, type Primitive, type Writable } from 'type-fest'",
      options,
      errors: [{ messageId: 'prefer-type-import' }],
      output: "import type { Except, Primitive, Writable } from 'type-fest'",
    },
    {
      code: "import TypeFest from 'type-fest'",
      options,
      errors: [{ messageId: 'prefer-type-import' }],
      output: "import type TypeFest from 'type-fest'",
    },
    {
      code: "import * as TypeFest from 'type-fest'",
      options,
      errors: [{ messageId: 'prefer-type-import' }],
      output: "import type * as TypeFest from 'type-fest'",
    },
  ],
});
