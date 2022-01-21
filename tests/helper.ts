import { Page, test as base } from "@playwright/test";
import { defaultValues } from "../src/mock/db/models";

export const test = base.extend<{
  seed: (fixture: typeof defaultValues) => Promise<void>;
}>({
  seed: async ({ page }, use) => {
    await use(async (fixture) => {
      await page.evaluate(([window, fixture]) => window.msw.seed(fixture), [
        await page.evaluateHandle(() => window),
        fixture,
      ] as const);
    });
  },
});

export async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({ path: `tests/__artifacts__/${name}.png` });
}

export const createPostsFixture = (expectText: string) =>
  [...new Array(100)].map((_, i) => ({
    id: `${i}`,
    title: expectText,
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  }));
