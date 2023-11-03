'use strict';

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
    'plugin:react-prefer-function-component/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'prettier',
  ],
  plugins: ['@emotion'],
  env: {
    browser: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
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
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-autofocus': 'off',

    'react/display-name': 'off',
    'react/prop-types': 'off',

    'unicorn/filename-case': 'off',
    'unicorn/no-array-callback-reference': 'off',
    'unicorn/no-await-expression-member': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/prefer-top-level-await': 'off', // TODO enable once top-level-await is supported by default in Vite

    'sonarjs/no-duplicate-string': 'off',

    /**
     * Adjust recommended rules
     */
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],

    'react/no-unknown-property': ['error', { ignore: ['css'] }],

    /**
     * Use additional rules
     */
    'array-callback-return': 'error',
    'default-case': 'error',
    eqeqeq: ['error'],
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
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-restricted-globals': [
      'error',
      'addEventListener',
      'blur',
      'close',
      'closed',
      'confirm',
      'defaultstatus',
      'defaultStatus',
      'error',
      'event',
      'external',
      'find',
      'focus',
      'frameElement',
      'frames',
      'history',
      'innerHeight',
      'innerWidth',
      'isFinite',
      'isNaN',
      'length',
      'location',
      'locationbar',
      'menubar',
      'moveBy',
      'moveTo',
      'name',
      'onblur',
      'onerror',
      'onfocus',
      'onload',
      'onresize',
      'onunload',
      'open',
      'opener',
      'opera',
      'outerHeight',
      'outerWidth',
      'pageXOffset',
      'pageYOffset',
      'parent',
      'print',
      'removeEventListener',
      'resizeBy',
      'resizeTo',
      'screen',
      'screenLeft',
      'screenTop',
      'screenX',
      'screenY',
      'scroll',
      'scrollbars',
      'scrollBy',
      'scrollTo',
      'scrollX',
      'scrollY',
      'self',
      'status',
      'statusbar',
      'stop',
      'toolbar',
      'top',
    ],
    'no-script-url': 'error',
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
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    strict: ['error', 'never'],

    'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
    'react/no-array-index-key': 'error',
    'react/no-typos': 'error',
    'react/style-prop-object': 'error',

    '@emotion/syntax-preference': ['error', 'object'],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      extends: [
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:import/typescript',
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
        jsxPragma: null,
      },
      settings: {
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
          },
        },
      },
      rules: {
        /**
         * Turn-off recommended rules
         */
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/no-floating-promises': 'off',

        /**
         * 'tsc' already handles this (https://typescript-eslint.io/linting/troubleshooting/performance-troubleshooting#eslint-plugin-import)
         */
        'default-case': 'off', // 'tsc' noFallthroughCasesInSwitch option is more robust

        'import/default': 'off',
        'import/namespace': 'off',
        'import/no-named-as-default-member': 'off',

        /**
         * Adjust recommended rules
         */
        '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/no-misused-promises': [
          'error',
          { checksVoidReturn: { arguments: false, attributes: false } },
        ],
        '@typescript-eslint/no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
        '@typescript-eslint/restrict-template-expressions': ['error', { allowNever: true }],
        '@typescript-eslint/prefer-nullish-coalescing': [
          'error',
          { ignoreMixedLogicalExpressions: true },
        ],

        /**
         * Use additional rules
         */
        'import/first': 'error',
        'import/no-anonymous-default-export': 'error',

        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-redeclare': 'error',
        '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],

        /**
         * Replace additional rules
         */
        'no-loop-func': 'off',
        '@typescript-eslint/no-loop-func': 'error',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': [
          'error',
          { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true },
        ],
      },
    },
    {
      files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
      extends: [
        'plugin:vitest/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
      ],
      rules: {
        'testing-library/no-debugging-utils': 'off',
      },
    },
    {
      files: ['vite.config.ts'],
      parserOptions: {
        project: ['./tsconfig.node.json'],
      },
    },
    {
      files: ['.eslintrc.cjs'],
      env: {
        node: true,
      },
      rules: {
        strict: 'off',
        'unicorn/no-null': 'off',
      },
    },
  ],
};
