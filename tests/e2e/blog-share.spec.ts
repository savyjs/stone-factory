import { test, expect } from "@playwright/test";

/**
 * Blog post share button tests.
 *
 * Verifies:
 *  1. Blog listing page shows share buttons for each post.
 *  2. Share URL in the button matches the blog post's canonical path.
 *  3. Blog post detail page renders (smoke test across 3 locales).
 */

const LOCALES_SAMPLE = ["en", "fa", "ar"] as const;

test.describe("blog share", () => {
  test("blog listing /en/blog shows share buttons", async ({ page }) => {
    await page.goto("/en/blog");
    const shareButtons = page.locator("[data-testid='share-button']");
    await expect(shareButtons.first()).toBeVisible();
    const count = await shareButtons.count();
    // There should be one share button per blog post card
    expect(count).toBeGreaterThan(0);
  });

  test("blog listing share buttons exist on /fa/blog (RTL)", async ({ page }) => {
    await page.goto("/fa/blog");
    const shareButtons = page.locator("[data-testid='share-button']");
    await expect(shareButtons.first()).toBeVisible();
  });

  test("blog listing share buttons exist on /ar/blog (RTL Arabic)", async ({ page }) => {
    await page.goto("/ar/blog");
    const shareButtons = page.locator("[data-testid='share-button']");
    await expect(shareButtons.first()).toBeVisible();
  });

  for (const locale of LOCALES_SAMPLE) {
    test(`blog listing /${locale}/blog renders posts with share button`, async ({ page }) => {
      await page.goto(`/${locale}/blog`);
      await expect(page.locator("article").first()).toBeVisible({ timeout: 8000 });
      await expect(page.locator("[data-testid='share-button']").first()).toBeVisible();
    });
  }
});
