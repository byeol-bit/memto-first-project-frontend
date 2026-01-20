import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      //'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // 코드 상 안쓰는 변수에 대한 처리를 안함.
      "no-unused-vars": "off",
      // prop-types 검사 규칙을 비활성화하는 기능
      //"react/prop-types": "off",
      // 컴포넌트 파일 내에서 기본 내보내기(default export) 외에 다른 것도
      // 내보내도 경고나 오류를 발생시키지 않도록 하여 개발 편의성을 높이는 기능
      "react-refresh/only-export-components": "off",
    },
  },
])
