import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { VisuallyHidden } from '.'

const meta = {
  title: 'Utilities/VisuallyHidden',
  component: VisuallyHidden,
  parameters: {
    docs: {
      description: {
        component:
          'Hides content visually while keeping it available to screen readers. ' +
          'Use it for icon-only buttons and live-region announcements.',
      },
    },
  },
} satisfies Meta<typeof VisuallyHidden>

export default meta
type Story = StoryObj<typeof meta>

export const IconButton: Story = {
  render: () => ({
    components: { VisuallyHidden },
    template: `
      <button type="button" style="font-size: 1.25rem; padding: 0.25rem 0.5rem">
        <span aria-hidden="true">✕</span>
        <VisuallyHidden>Close dialog</VisuallyHidden>
      </button>`,
  }),
}

export const AsDiv: Story = {
  args: { as: 'div' },
  render: (args) => ({
    components: { VisuallyHidden },
    setup: () => ({ args }),
    template: `
      <p>The text below is in the DOM but not visible. Inspect the element to see it.</p>
      <VisuallyHidden v-bind="args">Only screen readers will read this.</VisuallyHidden>`,
  }),
}
