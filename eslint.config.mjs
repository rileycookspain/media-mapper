import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      "semi": ["error"],
      "quotes": ["error", "double"],
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE',
        },
        {
          // ignore the middle extensions of the filename to support filename like bable.config.js or smoke.spec.ts
          ignoreMiddleExtensions: true,
        },
      ],
      'check-file/folder-naming-convention': [
        'error',
        {
          // all folders within src (except __tests__)should be named in kebab-case
          'src/**/!(__tests__)': 'KEBAB_CASE',
        },
      ],
    }
  }),
];

export default eslintConfig;
