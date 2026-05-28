import { test, expect } from "@playwright/test";

/**
 * Contact form → Telegram + GTM event tests.
 *
 * The test intercepts the /api/contact route so it never hits real Telegram or
 * email servers.  It verifies:
 *  1. The form is visible and all required fields are present.
 *  2. A successful submission shows the success message.
 *  3. A window.dataLayer event is pushed after a successful submission.
 *  4. A server-side error shows the error message.
 */

const LOCALES = ["en", "fa", "ar", "az", "tr", "hy", "ur", "tk"] as const;

test.describe("contact form", () => {
  test("form renders on /en/contact", async ({ page }) => {
    await page.goto("/en/contact");
    await expect(page.locator("form#order-form")).toBeVisible();
    await expect(page.locator("input[required]").first()).toBeVisible();
    await expect(page.locator("button[type='submit']")).toBeVisible();
  });

  test("successful submission sends to /api/contact and shows success, pushes GTM event", async ({ page }) => {
    // Mock /api/contact to return 200 OK
    await page.route("/api/contact", (route) =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) }),
    );

    // Track dataLayer pushes
    const dataLayerEvents: unknown[] = [];
    await page.addInitScript(() => {
      (window as Window & { dataLayer?: unknown[] }).dataLayer = [];
    });
    await page.exposeFunction("__captureDataLayer", (event: unknown) => {
      dataLayerEvents.push(event);
    });

    await page.goto("/en/contact");

    await page.fill("input[name='name'], input:nth-of-type(1)", "Test User");
    await page.fill("input[name='phone'], input:nth-of-type(2)", "+1234567890");
    // Fill required project field (3rd visible required input or textarea)
    const inputs = page.locator("form#order-form input[required]");
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
      await inputs.nth(i).fill("Test Value");
    }
    await page.fill("textarea[required]", "Test project description for e2e test.");

    await page.click("button[type='submit']");

    // Success message should appear
    await expect(page.locator("text=Your request was sent successfully.")).toBeVisible({ timeout: 5000 });

    // Check dataLayer was populated
    const dataLayer = await page.evaluate(() => (window as Window & { dataLayer?: unknown[] }).dataLayer ?? []);
    const contactEvent = dataLayer.find(
      (e: unknown) => typeof e === "object" && e !== null && (e as Record<string, unknown>)["event"] === "contact_form_submitted",
    );
    expect(contactEvent).toBeTruthy();
    expect((contactEvent as Record<string, unknown>)["locale"]).toBe("en");
  });

  test("failed submission shows error message", async ({ page }) => {
    await page.route("/api/contact", (route) =>
      route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ error: "fail" }) }),
    );

    await page.goto("/en/contact");

    const inputs = page.locator("form#order-form input[required]");
    const count = await inputs.count();
    for (let i = 0; i < count; i++) {
      await inputs.nth(i).fill("Test Value");
    }
    await page.fill("textarea[required]", "Test message");
    await page.click("button[type='submit']");

    await expect(page.locator("text=The request could not be sent.").or(page.locator("p.text-red-700"))).toBeVisible({ timeout: 5000 });
  });

  for (const locale of LOCALES) {
    test(`contact form renders for locale: ${locale}`, async ({ page }) => {
      await page.goto(`/${locale}/contact`);
      await expect(page.locator("form#order-form")).toBeVisible();
    });
  }
});
