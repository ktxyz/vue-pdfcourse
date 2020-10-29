module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'comma-dangle': [
      'error',
      'always-multiline'
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        'max': 3,
      }
    ],
    "space-before-function-paren": ["error", "never"],
    "@typescript-eslint/no-this-alias": ["error", {
      "allowDestructuring": true, // Allow `const { props, state } = this`; false by default
      "allowedNames": ["ref"] // Allow `const self = this`; `[]` by default
    }],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
