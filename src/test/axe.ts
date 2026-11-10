import axe from 'axe-core'
import { expect } from 'vitest'

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']

/**
 * Runs axe-core against a rendered container and fails with a readable list of violations.
 * jsdom has no layout engine, so colour-contrast is disabled here; the Playwright
 * suite (e2e/a11y.spec.ts) covers it in a real browser.
 */
export async function expectNoA11yViolations(container: Element): Promise<void> {
  const results = await axe.run(container, {
    runOnly: { type: 'tag', values: WCAG_TAGS },
    rules: { 'color-contrast': { enabled: false } },
  })
  const summary = results.violations.map(
    (v) => `[${v.id}] ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`,
  )
  expect(summary, summary.join('\n\n')).toEqual([])
}
