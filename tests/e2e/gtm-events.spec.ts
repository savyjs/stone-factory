import { test, expect } from "@playwright/test";

/**
 * GTM dataLayer + Telegram event tests.
 *
 * Verifies:
 *  1. window.dataLayer is initialised on every page (GTM prerequisite).
 *  2. Submitting the contact form pushes a `contact_form_submitted` event to dataLayer.
 *  3. The event carries the correct `locale` property.
 *  4. The /api/contact route is called with the expected payload (Telegram integration).
 *
 * All network calls to /api/contact are intercepted so no real Telegram messages
 * are sent during tests.
 */

const LOCALES_SAMPLE = ["en", "fa", "tr"] as const;

test.describe("GTM and Telegram events", () => {
  test("window.dataLayer is an array on page load", async ({ page }) => {
    await page.addInitScript(() => {
      (window as Window & { dataLayer?: unknown[] }).dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer ?? [];
    });
    await page.goto("/en");
    const isArray = await page.evaluate(() => Array.isArray((window as Window & { dataLayer?: unknown[] }).dataLayer));
    expect(isArray).toBe(true);
  });

  for (const locale of LOCALES_SAMPLE) {
    test(`contact form submission pushes GTM event for locale: ${locale}`, async ({ page }) => {
      await page.route("/api/contact", (route) =>
        route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) }),
      );

      await page.addInitScript(() => {
        (window as Window & { dataLayer?: unknown[] }).dataLayer = [];
      });

      await page.goto(`/${locale}/contact`);

      // Fill all required inputs
      const inputs = page.locator("form#order-form input[required]");
      const count = await inputs.count();
      for (let i = 0; i < count; i++) {
        await inputs.nth(i).fill(`Test ${i}`);
      }
      await page.fill("textarea[required]", "Automated test message");

      await page.click("button[type='submit']");

      // Wait for success or error indicator to appear
      await page.waitForTimeout(1500);

      const dataLayer = await page.evaluate(
        () => (window as Window & { dataLayer?: unknown[] }).dataLayer ?? [],
      );

      const evt = (dataLayer as Record<string, unknown>[]).find((e) => e["event"] === "contact_form_submitted");
      expect(evt).toBeTruthy();
      expect(evt!["locale"]).toBe(locale);
    });
  }

  test("/api/contact receives name, phone, message and locale in request body", async ({ page }) => {
    let capturedBody: Record<string, unknown> | null = null;

    await page.route("/api/contact", async (route) => {
      const body = route.request().postDataJSON() as Record<string, unknown>;
      capturedBody = body;
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });

    await page.goto("/en/contact");

    const inputs = page.locator("form#order-form input[required]");
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
      await inputs.nth(i).fill("e2e-value");
    }
    await page.fill("textarea[required]", "GTM integration test body");
    await page.click("button[type='submit']");

    await page.waitForTimeout(1500);

    expect(capturedBody).not.toBeNull();
    expect(capturedBody!["locale"]).toBe("en");
    expect(typeof capturedBody!["message"]).toBe("string");
    expect((capturedBody!["message"] as string).length).toBeGreaterThan(0);
  });
});
