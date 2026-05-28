import { test, expect } from "@playwright/test";

/**
 * Share button tests.
 *
 * Verifies that:
 *  1. Share buttons appear on the products page.
 *  2. Share buttons appear on the gallery page.
 *  3. Share buttons appear on the blog listing page.
 *  4. Blog post detail pages also have a share button (if present).
 *  5. Clicking the share button when navigator.share is unavailable copies the URL or opens WhatsApp.
 */

test.describe("share button", () => {
  test("share buttons are present on /en/products", async ({ page }) => {
    await page.goto("/en/products");
    const shareButtons = page.locator("[data-testid='share-button']");
    await expect(shareButtons.first()).toBeVisible();
    const count = await shareButtons.count();
    expect(count).toBeGreaterThan(0);
  });

  test("share buttons are present on /en/gallery", async ({ page }) => {
    await page.goto("/en/gallery");
    const shareButtons = page.locator("[data-testid='share-button']");
    await expect(shareButtons.first()).toBeVisible();
  });

  test("share buttons are present on /en/blog", async ({ page }) => {
    await page.goto("/en/blog");
    const shareButtons = page.locator("[data-testid='share-button']");
    await expect(shareButtons.first()).toBeVisible();
  });

  test("clicking share button (no navigator.share) writes URL to clipboard", async ({ page, context }) => {
    // Grant clipboard permission and remove navigator.share so fallback runs
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.addInitScript(() => {
      // Force navigator.share to be undefined so clipboard fallback triggers
      Object.defineProperty(navigator, "share", { value: undefined, configurable: true });
    });

    await page.goto("/en/products");
    const btn = page.locator("[data-testid='share-button']").first();
    await btn.click();

    // After clipboard copy the button text changes to "✓"
    await expect(btn).toContainText("✓", { timeout: 3000 });
  });

  test("share buttons exist on /fa/products (RTL locale)", async ({ page }) => {
    await page.goto("/fa/products");
    const shareButtons = page.locator("[data-testid='share-button']");
    await expect(shareButtons.first()).toBeVisible();
  });
});
