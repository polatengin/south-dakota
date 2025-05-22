import { writeFileSync } from "node:fs"
import { test, expect } from "@playwright/test";

test("login and save session", async ({ page }) => {
  await page.goto("https://jsonbin.io/login");
  await page.getByRole("textbox", { name: "Email" }).click();
  await page.getByRole("textbox", { name: "Email" }).fill(process.env.JSONBIN_EMAIL || "");
  await page.getByRole("textbox", { name: "Password" }).click();
  await page.getByRole("textbox", { name: "Password" }).fill(process.env.JSONBIN_PASSWORD || "");
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page).toHaveURL(/app\/dashboard/);

  await page.getByRole("link", { name: "API Keys" }).click();

  await expect(page).toHaveURL(/app\/app\/api-keys/);

  const keyItem = page.locator('h3:has-text("X-Master-Key")').locator('xpath=following-sibling::div[contains(@class, "api-key-block")]').locator("p");
  await expect(keyItem).toBeVisible();
  await page.waitForTimeout(10000);
  const key = await keyItem.textContent();
  await expect(key).not.toBeNull();

  writeFileSync("playwright-state/.auth/key.json", JSON.stringify({ key: key?.trim() }), "utf-8");
});
