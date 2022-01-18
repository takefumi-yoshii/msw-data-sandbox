import { expect, Page, test } from "@playwright/test";
async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({ path: `tests/__artifacts__/${name}.png` });
}

test("edit post", async ({ page }) => {
  const expectText = "TEST";
  await page.goto("http://localhost:3000/posts");
  await page.locator("text=Lorem ipsun").click();
  await page.waitForNavigation();
  await page.locator("text=edit").click();
  await page.waitForNavigation();
  await page.fill("[name=title]", expectText);
  await page.locator("button").click();
  await page.waitForNavigation();
  const locator = page.locator("h2");
  await expect(locator).toHaveText(expectText);
  await takeScreenshot(page, "edit_post");
});

test("create post", async ({ page }) => {
  const expectText = "TEST";
  await page.goto("http://localhost:3000/posts");
  await page.locator("text=create new").click();
  await page.waitForNavigation();
  await page.fill("[name=title]", expectText);
  await page.locator("button").click();
  await page.waitForNavigation();
  const locator = page.locator("[data-testid=list] li:last-child");
  await expect(locator).toHaveText(expectText);
  await takeScreenshot(page, "create_post");
});
