import { test, expect } from '@playwright/test';

const routes = ['home', 'about', 'products', 'wishlist', 'recommendations', 'creations', 'quotes', 'projects', 'writings'];
for (const width of [375, 768, 1024, 1440]) {
  test(`all routes render without overflow or runtime errors at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of routes) {
      await page.goto(`/#/${route === 'home' ? '' : route}`);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('main h1, main h2').first()).toBeVisible();
      await page.waitForTimeout(350);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(await page.locator('main').innerText()).not.toBe('');
    }
    expect(errors).toEqual([]);
  });
}
test('section cards support keyboard navigation and browser history', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('a[href="#/about"]');
  await card.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#\/about/);
  await page.goBack();
  await expect(page.locator('.hero-bio h1')).toHaveText('Dan Truong');
  await page.goto('/#/projects');
  await expect(page.locator('main')).toContainText("Things");
});
test('mobile menu dismisses with Escape, restores focus, and closes after navigation', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open navigation menu' });
  await toggle.click();
  await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('button', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/#\/about/);
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});
test('theme persists; audio controls and quote rotation remain usable', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Toggle theme mode' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await page.getByTitle('Play Lofi', { exact: true }).click();
  await expect(page.getByTitle('Pause Lofi', { exact: true })).toBeVisible();
  await page.getByTitle('Mute', { exact: true }).click();
  await expect(page.getByTitle('Unmute', { exact: true })).toBeVisible();
  await page.getByTitle('Next Track', { exact: true }).click();
  await page.getByTitle('Pause Lofi', { exact: true }).click();
  await page.getByTitle('Rotate favorite quote').click();
  await expect(page.locator('.hero-intro')).toContainText('favorite saying');
});
test('home images load and screenshots cover both themes and sizes', async ({ page }) => {
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map(img => img.decode().catch(() => {})));
    });
    expect(await page.locator('main img').evaluateAll(images => images.every(img => img.naturalWidth > 0))).toBe(true);
    for (const theme of ['light', 'dark']) {
      await page.evaluate(theme => document.documentElement.classList.toggle('dark', theme === 'dark'), theme);
      // Reveal below-fold cards before taking a full-page screenshot.
      for (const card of await page.locator('.cozy-link').all()) await card.scrollIntoViewIfNeeded();
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `artifacts/after-${width}-${theme}.png`, fullPage: true });
    }
  }
});

test('skip link keeps the current route and focuses main content', async ({ page }) => {
  await page.goto('/#/about');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#\/about/);
  await expect(page.locator('main')).toBeFocused();
});
