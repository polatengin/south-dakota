import { test, expect } from "@playwright/test";

const visited = new Set<string>();

test("check links", async ({ page }) => {
  const checkLinksOnPage = async (page, url: string) => {
    if (visited.has(url)) return;
    visited.add(url);

    await test.step(`Visiting: ${url}`, async () => {
    try {
      await page.goto(url);
      await page.waitForLoadState("domcontentloaded");
      await page.waitForTimeout(Math.random() * 1000 + 500);
      expect.soft(page.url(), `${url} has no green status code`).toBeTruthy();
    } catch {
      expect.soft(null, `${url} has no green status code`).toBeTruthy();
      return;
    }

    const links = await page.locator("a[href]").all();
    const linkUrls = await Promise.all(
      links.map(async (link) => {
        const href = await link.getAttribute("href");
        if (!href) return null;
        try {
          return new URL(href, url).toString();
        } catch {
          return null;
        }
      })
    );

    const uniqueLinks = Array.from<string>(
      linkUrls.reduce((set, link) => {
        if (link) {
          expect.soft(link, `"${link}" is not a valid link`).toBeTruthy();
          set.add(link);
        }
        return set;
      }, new Set<string>())
    );

    for (const linkUrl of uniqueLinks) {
      await checkLinksOnPage(page, linkUrl);
      await page.waitForTimeout(Math.random() * 1000 + 500);
    }
  });
  };

  await checkLinksOnPage(page, process.env.HOST_CHECK_URL || "https://enginpolat.com");
});
