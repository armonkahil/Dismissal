module.exports = {
  plugins: ['prettier', 'jest'],
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/react',
    'airbnb'
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    node: true,
    es6: true,
    mongo: true,
    commonjs: true
  },
  rules: {
    'prettier/prettier': 'error',
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'no-underscore-dangle': ['error', { allow: ['_id', '_bar'] }]
  }
}
