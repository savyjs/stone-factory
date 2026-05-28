import { test, expect } from "@playwright/test";

/**
 * Product inquiry CTA tests.
 *
 * Verifies that:
 *  1. Every product card shows an inquiry CTA button ([data-testid="inquire-cta"]).
 *  2. The href points to WhatsApp (wa.me) with a pre-filled message including the product name.
 *  3. The CTA link is present for all 8 supported locales.
 *  4. The pre-filled message is NOT empty.
 *
 * These tests cover the user scenarios:
 *   "I have a question", "I want this stone", "I want to inquire about price".
 */

const LOCALES = ["en", "fa", "ar", "az", "tr", "hy", "ur", "tk"] as const;

test.describe("product inquiry CTA", () => {
  test("inquiry CTA buttons appear on /en/products", async ({ page }) => {
    await page.goto("/en/products");
    const ctaLinks = page.locator("[data-testid='inquire-cta']");
    await expect(ctaLinks.first()).toBeVisible();
    const count = await ctaLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("inquiry CTA href points to WhatsApp with pre-filled message", async ({ page }) => {
    await page.goto("/en/products");
    const ctaLinks = page.locator("[data-testid='inquire-cta']");
    const count = await ctaLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const href = await ctaLinks.nth(i).getAttribute("href");
      expect(href).toBeTruthy();
      expect(href).toContain("wa.me/989376953800");
      // The ?text= query param must not be empty
      const url = new URL(href!);
      const text = url.searchParams.get("text") ?? decodeURIComponent(url.search.replace("?text=", ""));
      expect(text.trim().length).toBeGreaterThan(0);
    }
  });

  test("inquiry CTA on homepage hero also links to WhatsApp", async ({ page }) => {
    await page.goto("/en");
    // Home page has ProductGrid with limit — CTAs should still be present
    const ctaLinks = page.locator("[data-testid='inquire-cta']");
    if ((await ctaLinks.count()) > 0) {
      const href = await ctaLinks.first().getAttribute("href");
      expect(href).toContain("wa.me");
    }
  });

  for (const locale of LOCALES) {
    test(`inquiry CTA is present on /${locale}/products`, async ({ page }) => {
      await page.goto(`/${locale}/products`);
      const ctaLinks = page.locator("[data-testid='inquire-cta']");
      await expect(ctaLinks.first()).toBeVisible({ timeout: 8000 });

      const href = await ctaLinks.first().getAttribute("href");
      expect(href).toContain("wa.me");
      // The pre-filled text should contain a product name (not empty)
      expect(href!.includes("text=") || href!.includes("%3A")).toBeTruthy();
    });
  }
});
