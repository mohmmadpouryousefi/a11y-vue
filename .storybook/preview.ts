import type { Preview } from '@storybook/vue3-vite'
import '../src/styles/tokens.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'error' makes axe violations fail Storybook's test runs, not just show in the panel.
      test: 'error',
      options: {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
      },
    },
  },
  tags: ['autodocs'],
}

export default preview
