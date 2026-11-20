import AxeBuilder from '@axe-core/playwright';
import { expect, test, type APIRequestContext } from '@playwright/test';

const themes = ['light', 'dark'] as const;

// The Foundation token showcase renders raw Aura severity swatches. Aura's
// default emerald palette does not meet WCAG AA at body-text size, so contrast
// is reported by design rather than treated as a product regression.
const A11Y_EXEMPT = new Set(['foundation-theme--tokens']);

async function storyIds(request: APIRequestContext) {
  const response = await request.get('/index.json');
  expect(response.ok()).toBeTruthy();

  const index = (await response.json()) as {
    entries: Record<string, { type: string }>;
  };

  return Object.entries(index.entries)
    .filter(([, entry]) => entry.type === 'story')
    .map(([id]) => id);
}

test('@a11y every story has no serious or critical violations', async ({ page, request }) => {
  const ids = (await storyIds(request)).filter((id) => !A11Y_EXEMPT.has(id));
  expect(ids.length).toBeGreaterThan(0);

  for (const theme of themes) {
    for (const id of ids) {
      await page.goto(`/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`);
      await page.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page }).analyze();
      const blocking = results.violations.filter(
        (violation) => violation.impact === 'serious' || violation.impact === 'critical',
      );

      expect(
        blocking,
        `${id} (${theme}) failed axe: ${blocking.map((violation) => violation.id).join(', ')}`,
      ).toEqual([]);
    }
  }
});

test('@visual every story matches its light and dark snapshot', async ({ page, request }) => {
  const ids = await storyIds(request);
  expect(ids.length).toBeGreaterThan(0);

  for (const theme of themes) {
    for (const id of ids) {
      await page.goto(`/iframe.html?id=${id}&viewMode=story&globals=theme:${theme}`);
      await page.waitForLoadState('networkidle');

      const name = `${id}-${theme}`.replace(/[^a-z0-9-]/gi, '_').toLowerCase();
      await expect(page).toHaveScreenshot(`${name}.png`, {
        animations: 'disabled',
        fullPage: true,
      });
    }
  }
});
