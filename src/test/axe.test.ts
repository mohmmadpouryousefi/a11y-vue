import { render } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import { expectNoA11yViolations } from './axe'

// Guards the guard: make sure the helper really fails on inaccessible markup.
describe('expectNoA11yViolations', () => {
  it('fails for a button without an accessible name', async () => {
    const { container } = render({ template: '<button type="button"></button>' })
    await expect(expectNoA11yViolations(container)).rejects.toThrow(/button-name/)
  })
})
