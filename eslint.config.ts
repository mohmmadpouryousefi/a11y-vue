import { globalIgnores } from 'eslint/config'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfigWithVueTs(
  globalIgnores([
    'dist/**',
    'coverage/**',
    'storybook-static/**',
    'playwright-report/**',
    'test-results/**',
  ]),

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommendedTypeChecked,

  // Catches missing labels, invalid ARIA, non-interactive click handlers, etc.
  ...pluginVueA11y.configs['flat/recommended'],

  {
    name: 'project/rules',
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      'vue/block-lang': ['error', { script: { lang: 'ts' } }],
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/define-macros-order': 'error',
      'vue/no-unused-refs': 'error',
      'vue/require-explicit-emits': 'error',
    },
  },

  // Prettier owns formatting; turn off conflicting ESLint style rules.
  skipFormatting,
)
