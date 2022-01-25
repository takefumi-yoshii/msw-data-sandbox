import { expect, test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { createPostsFixture, takeScreenshot } from "./helper";

test("edit post", async ({ page }) => {
  const expectText = "🍶";
  await page.goto("http://localhost:3000/posts");
  await page.locator("text=Lorem ipsum").click();
  await page.locator("text=edit").click();
  await page.fill("[name=title]", expectText);
  await page.locator("button").click();
  await page.waitForNavigation();
  const locator = page.locator("h2");
  await expect(locator).toHaveText(expectText);
  await injectAxe(page);
  await checkA11y(page);
  await takeScreenshot(page, "edit_post");
});

test("create post", async ({ page }) => {
  const expectText = "🍺";
  await page.goto("http://localhost:3000/posts");
  await page.locator("text=create new").click();
  await page.fill("[name=title]", expectText);
  await page.locator("button").click();
  const locator = page.locator("[data-testid=list] li:last-child");
  await expect(locator).toHaveText(expectText);
  await injectAxe(page);
  await checkA11y(page);
  await takeScreenshot(page, "create_post");
});

test("seeding", async ({ page }) => {
  const expectText = "🍖";
  const posts = createPostsFixture(expectText);
  await page.goto("http://localhost:3000/posts");
  await page.evaluate((posts) => {
    const { seed } = window.msw;
    seed({ posts });
  }, posts);
  const locator = page.locator("[data-testid=list] li:last-child");
  await expect(locator).toHaveText(expectText);
  await injectAxe(page);
  await checkA11y(page);
  await takeScreenshot(page, "seeding");
});

test("intercepting", async ({ page }) => {
  const expectText = "🐠";
  const fixture = createPostsFixture(expectText);
  await page.goto("http://localhost:3000/posts");
  await page.evaluate((fixture) => {
    const { worker, rest } = window.msw;
    worker.use(rest.get("/posts", (_, res, ctx) => res(ctx.json(fixture))));
  }, fixture);
  const locator = page.locator("[data-testid=list] li:last-child");
  await expect(locator).toHaveText(expectText);
  await injectAxe(page);
  await checkA11y(page);
  await takeScreenshot(page, "intercepting");
});
