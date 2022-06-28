const typeScriptRules = {
  'spaced-comment': ['error', 'always', { markers: ['/'] }], // TODO remove
  '@typescript-eslint/no-floating-promises': 'off',
  '@typescript-eslint/no-shadow': 'off',
  '@typescript-eslint/no-throw-literal': 'off',
  '@typescript-eslint/no-use-before-define': 'off',
  '@typescript-eslint/return-await': 'off',
  '@typescript-eslint/sort-type-union-intersection-members': 'off',
  '@typescript-eslint/triple-slash-reference': 'off',
  'typescript-sort-keys/interface': 'off',
  'typescript-sort-keys/string-enum': 'off',
};

module.exports = {
  root: true,
  extends: ['canonical', 'canonical/browser', 'canonical/module', 'canonical/prettier'],
  rules: {
    'arrow-body-style': 'off',
    'canonical/destructuring-property-newline': 'off', // TODO remove
    'canonical/export-specifier-newline': 'off', // TODO remove
    'canonical/filename-match-exported': 'off',
    'canonical/filename-match-regex': 'off',
    'canonical/id-match': 'off',
    'canonical/import-specifier-newline': 'off', // TODO remove
    'canonical/sort-keys': 'off',
    'id-length': 'off',
    'import/no-unassigned-import': 'off',
    'import/order': 'off',
    'line-comment-position': 'off',
    'no-console': 'off',
    'no-empty': 'off',
    'no-implicit-coercion': 'off',
    'no-inline-comments': 'off',
    'no-warning-comments': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'import/extensions': [
      2,
      'never',
      {
        ignorePackages: true,
        pattern: {
          less: 'always',
          json: 'always',
          svg: 'always',
        },
      },
    ],
  },
  overrides: [
    {
      files: '*.ts',
      extends: ['canonical/typescript', 'canonical/prettier'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        ...typeScriptRules,
      },
      overrides: [
        {
          files: 'vite.config.ts',
          parserOptions: {
            project: './tsconfig.vite.json',
          },
          rules: {
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-unnecessary-condition': 'off',
            'unicorn/prefer-module': 'off',
          },
        },
      ],
    },
    {
      files: '*.tsx',
      extends: [
        'canonical/react',
        'canonical/jsx-a11y',
        'canonical/typescript',
        'canonical/prettier',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        ...typeScriptRules,
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'react/forbid-component-props': 'off',
        'react/jsx-sort-props': 'off',
        'react-hooks/exhaustive-deps': [
          'error',
          { additionalHooks: '(useRecoilCallback|useRecoilTransaction)' },
        ],
      },
    },
    {
      files: ['.eslintrc.js', 'i18next-parser.config.js'],
      extends: ['canonical/node'],
      rules: {
        'unicorn/prefer-module': 'off',
      },
    },
  ],
};
