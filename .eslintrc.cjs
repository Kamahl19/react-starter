/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@eslint-community/eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:import/react',
    'plugin:unicorn/recommended',
    'plugin:sonarjs/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier',
  ],
  env: {
    browser: true,
    es2024: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    jsxPragma: null,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    /**
     * Turn-off recommended rules
     */
    'unicorn/filename-case': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',

    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/no-nested-template-literals': 'off',

    /**
     * Additional rules
     */
    'array-callback-return': 'error',
    curly: 'error',
    eqeqeq: 'error',
    'no-array-constructor': 'error',
    'no-caller': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-implied-eval': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-multi-str': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-object-constructor': 'error',
    'no-restricted-globals': ['error', ...require('confusing-browser-globals')],
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'error',
    'no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true },
    ],
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',

    'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
    'react/no-array-index-key': 'error',
    'react/style-prop-object': 'error',

    'import/first': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      extends: [
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:import/typescript',
        'plugin:tailwindcss/recommended',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
        tailwindcss: {
          callees: ['clsx', 'cva', 'cn'],
          config: 'tailwind.config.ts',
        },
      },
      rules: {
        curly: 'error', // Prettier disables this https://github.com/prettier/eslint-config-prettier/tree/main?tab=readme-ov-file#curly

        /**
         * Turn-off recommended rules
         */
        'tailwindcss/classnames-order': 'off', // covered by prettier-plugin-tailwindcss
        'tailwindcss/migration-from-tailwind-2': 'off',
        'tailwindcss/no-custom-classname': 'off',

        /**
         * 'tsc' already handles this (https://typescript-eslint.io/linting/troubleshooting/performance-troubleshooting#eslint-plugin-import)
         */
        'import/default': 'off',
        'import/namespace': 'off',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',

        /**
         * Adjust recommended rules
         */
        '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/no-confusing-void-expression': [
          'error',
          { ignoreArrowShorthand: true },
        ],
        '@typescript-eslint/no-misused-promises': [
          'error',
          { checksVoidReturn: { attributes: false } },
        ],
        '@typescript-eslint/prefer-nullish-coalescing': [
          'error',
          { ignoreMixedLogicalExpressions: true },
        ],

        /**
         * Additional rules
         */
        'no-loop-func': 'off',
        '@typescript-eslint/no-loop-func': 'error',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true },
        ],
        '@typescript-eslint/consistent-type-imports': 'error',
      },
    },
    {
      // Shadcn-UI
      files: ['src/common/components/ui/**/*.ts?(x)'],
      rules: {
        'react/prop-types': 'off',
        'tailwindcss/enforces-shorthand': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
      },
    },
    {
      files: ['**/*.{spec,test}.*'],
      extends: [
        'plugin:vitest/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
      ],
    },
    {
      files: ['vite.config.ts', 'i18next-parser.config.ts', 'tailwind.config.ts'],
      parserOptions: {
        project: ['./tsconfig.node.json'],
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: './tsconfig.node.json',
          },
        },
      },
    },
  ],
};
