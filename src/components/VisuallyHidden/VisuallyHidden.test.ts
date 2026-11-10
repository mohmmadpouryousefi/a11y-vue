import { render, screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from '../../test/axe'
import VisuallyHidden from './VisuallyHidden.vue'

describe('VisuallyHidden', () => {
  it('renders a span by default', () => {
    render(VisuallyHidden, { slots: { default: 'Hidden text' } })
    const el = screen.getByText('Hidden text')
    expect(el.tagName).toBe('SPAN')
    expect(el).toHaveClass('ui-visually-hidden')
  })

  it('renders the element given in "as"', () => {
    render(VisuallyHidden, { props: { as: 'div' }, slots: { default: 'Hidden text' } })
    expect(screen.getByText('Hidden text').tagName).toBe('DIV')
  })

  it('provides an accessible name to an icon-only button', async () => {
    const { container } = render({
      components: { VisuallyHidden },
      template: `<button type="button"><span aria-hidden="true">✕</span><VisuallyHidden>Close</VisuallyHidden></button>`,
    })
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
    await expectNoA11yViolations(container)
  })
})
