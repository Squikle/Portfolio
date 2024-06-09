module.exports = {
  root: true,
  env: {browser: true, es2020: true, node: true},
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'configs', 'node_modules', 'public'],
  parserOptions: {ecmaVersion: 'latest', sourceType: 'module', project: ['./tsconfig.json']},
  settings: {react: {version: '18.2'}},
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx', '.ts', '.tsx']}],
    "@typescript-eslint/no-explicit-any": "off",
    "react/no-unescaped-entities": "off"
  }
}
