const globals = require('globals');
const typescriptEslint = require('typescript-eslint');

module.exports = [
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2015,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      semi: ['error', 'always']
    }
  },
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      ecmaVersion: 2015,
      sourceType: 'script',
      parser: typescriptEslint.parser,
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      semi: ['error', 'always']
    }
  }
];
