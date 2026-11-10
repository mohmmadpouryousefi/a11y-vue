import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { existsSync, readFileSync } from 'node:fs'

/**
 * Runs axe-core in a real browser against EVERY Storybook story.
 * New components are covered automatically as soon as they have a story.
 * Opt a story out (rarely!) with the tag `!a11y-test`.
 */
interface IndexEntry {
  id: string
  title: string
  name: string
  type: 'story' | 'docs'
  tags?: string[]
}

const indexPath = 'storybook-static/index.json'
if (!existsSync(indexPath)) {
  throw new Error(`${indexPath} not found. Run "pnpm build-storybook" before "pnpm test:e2e".`)
}

const index = JSON.parse(readFileSync(indexPath, 'utf8')) as { entries: Record<string, IndexEntry> }
const stories = Object.values(index.entries).filter(
  (e) => e.type === 'story' && !e.tags?.includes('!a11y-test'),
)

test('Storybook has stories to check', () => {
  expect(stories.length).toBeGreaterThan(0)
})

for (const story of stories) {
  test(`a11y: ${story.title} › ${story.name}`, async ({ page }) => {
    await page.goto(`/iframe.html?id=${story.id}&viewMode=story`)
    await page.locator('#storybook-root > *').first().waitFor({ state: 'attached' })

    const results = await new AxeBuilder({ page })
      .include('#storybook-root')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()

    const summary = results.violations.map(
      (v) =>
        `[${v.impact}] ${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.target.join(' ')).join('\n  ')}`,
    )
    expect(summary, summary.join('\n\n')).toEqual([])
  })
}
