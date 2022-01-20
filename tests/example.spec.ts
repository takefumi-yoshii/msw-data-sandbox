import { expect, test } from "@playwright/test";
import { seed, takeScreenshot } from "./helper";

test("edit post", async ({ page }) => {
  const expectText = "TEST";
  await page.goto("http://localhost:3000/posts");
  await page.locator("text=Lorem ipsum").click();
  await page.locator("text=edit").click();
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
  await page.fill("[name=title]", expectText);
  await page.locator("button").click();
  const locator = page.locator("[data-testid=list] li:last-child");
  await expect(locator).toHaveText(expectText);
  await takeScreenshot(page, "create_post");
});

test("seeding", async ({ page }) => {
  const expectText = "🍖";
  await page.goto("http://localhost:3000/posts");
  await seed(page, {
    posts: [...new Array(100)].map((_, i) => ({
      id: `${i}`,
      title: expectText,
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    })),
  });
  const locator = page.locator("[data-testid=list] li:last-child");
  await expect(locator).toHaveText(expectText);
  await takeScreenshot(page, "seeding");
});
