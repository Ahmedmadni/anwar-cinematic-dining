import { test, expect, type Page } from "@playwright/test";

const PAGES = ["/", "/menu", "/offers", "/gallery", "/reviews", "/branches", "/reservation", "/about", "/cart"];

async function ensureRTL(page: Page) {
  await page.addInitScript(() => {
    try { localStorage.setItem("aam.lang", "ar"); localStorage.setItem("aam.theme", "dark"); } catch {}
  });
}

test.describe("RTL mobile layout", () => {
  for (const path of PAGES) {
    test(`no horizontal overflow on ${path}`, async ({ page }) => {
      await ensureRTL(page);
      await page.goto(path, { waitUntil: "networkidle" });
      await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

      // No horizontal scroll on document
      const overflow = await page.evaluate(() => {
        const de = document.documentElement;
        return { sw: de.scrollWidth, cw: de.clientWidth };
      });
      expect(overflow.sw, `scrollWidth ${overflow.sw} > clientWidth ${overflow.cw}`)
        .toBeLessThanOrEqual(overflow.cw + 1);

      // No element overflows the viewport horizontally on either side
      const bleed = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const bad: { tag: string; cls: string; left: number; right: number }[] = [];
        const nodes = document.body.querySelectorAll<HTMLElement>("*");
        nodes.forEach((el) => {
          const cs = getComputedStyle(el);
          if (cs.position === "fixed") return; // FABs/nav are allowed
          if (cs.display === "none" || cs.visibility === "hidden") return;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          if (r.left < -1 || r.right > vw + 1) {
            bad.push({ tag: el.tagName, cls: (el.className || "").toString().slice(0, 60), left: r.left, right: r.right });
          }
        });
        return { vw, bad: bad.slice(0, 5), count: bad.length };
      });
      expect(bleed.count, `${bleed.count} elements bleed past viewport ${bleed.vw}: ${JSON.stringify(bleed.bad)}`)
        .toBe(0);
    });
  }

  test("mobile nav opens without overlap", async ({ page }) => {
    await ensureRTL(page);
    await page.goto("/", { waitUntil: "networkidle" });
    await page.getByLabel("القائمة").click();

    // Overlay menu links visible and within viewport
    const link = page.getByRole("link", { name: "المنيو" }).last();
    await expect(link).toBeVisible();
    const box = await link.boundingBox();
    const vw = await page.evaluate(() => document.documentElement.clientWidth);
    expect(box, "link has bounding box").not.toBeNull();
    expect(box!.x).toBeGreaterThanOrEqual(-1);
    expect(box!.x + box!.width).toBeLessThanOrEqual(vw + 1);
  });
});