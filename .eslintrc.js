'use strict';

module.exports = {
  root: true,
  extends: [
    // https://github.com/eslint/eslint/blob/main/conf/eslint-recommended.js
    'eslint:recommended',
    // https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/lib/configs/recommended.js
    'plugin:eslint-comments/recommended',
    // https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js
    'plugin:import/recommended',
    // https://github.com/import-js/eslint-plugin-import/blob/main/config/react.js
    'plugin:import/react',
    // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/configs/recommended.js
    'plugin:unicorn/recommended',
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/index.js#L33
    'plugin:react/recommended',
    // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/index.js#L40
    'plugin:react/jsx-runtime',
    // https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/src/index.js#L14
    'plugin:react-hooks/recommended',
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/src/index.js#L43
    'plugin:jsx-a11y/recommended',
    // https://github.com/TanStack/query/blob/main/packages/eslint-plugin-query/src/configs/index.ts
    'plugin:@tanstack/eslint-plugin-query/recommended',
    // https://github.com/prettier/eslint-config-prettier/blob/main/index.js
    'prettier',
  ],
  plugins: ['@emotion'],
  env: {
    browser: true,
    es2022: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
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
    'unicorn/prevent-abbreviations': 'off',

    /**
     * Adjust recommended rules
     */
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }],
    'react/no-unknown-property': ['error', { ignore: ['css'] }],
    'react-hooks/exhaustive-deps': [
      'error',
      { additionalHooks: '(useRecoilCallback|useRecoilTransaction)' },
    ],

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
    'no-restricted-globals': ['error'].concat(require('confusing-browser-globals')),
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
      files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
      extends: [
        // https://github.com/testing-library/eslint-plugin-testing-library/blob/main/lib/configs/react.ts
        'plugin:testing-library/react',
        // https://github.com/testing-library/eslint-plugin-jest-dom/blob/main/src/index.js#L38
        'plugin:jest-dom/recommended',
      ],
      rules: {
        'testing-library/no-debugging-utils': 'off',
      },
    },
    {
      files: ['**/*.ts?(x)'],
      extends: [
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
        'plugin:@typescript-eslint/recommended',
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict.ts
        'plugin:@typescript-eslint/strict',
        // https://github.com/import-js/eslint-plugin-import/blob/main/config/typescript.js
        'plugin:import/typescript',
        // https://github.com/prettier/eslint-config-prettier/blob/main/index.js
        'prettier',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
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
        '@typescript-eslint/no-floating-promises': 'off',

        /**
         * 'tsc' already handles this (https://typescript-eslint.io/docs/linting/troubleshooting/#eslint-plugin-import)
         */
        'import/default': 'off',
        'import/namespace': 'off',
        'import/no-named-as-default-member': 'off',
        'default-case': 'off', // 'tsc' noFallthroughCasesInSwitch option is more robust

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

        /**
         * Use additional rules
         */
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-redeclare': 'error',
        'import/first': 'error',
        'import/no-anonymous-default-export': 'error',
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
  ],
};
