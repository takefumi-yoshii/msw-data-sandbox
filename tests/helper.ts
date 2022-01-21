import { Page, test as base } from "@playwright/test";
import { defaultValues } from "../src/mock/db/models";

export const test = base.extend<{
  seed: (fixture: typeof defaultValues) => Promise<void>;
}>({
  seed: async ({ page }, use) => {
    await use(async (fixture) => {
      const windowHandle = await page.evaluateHandle(() => window);
      await page.evaluate(
        // @ts-ignore
        ([window, fixture]) => window.msw.seed(fixture),
        [windowHandle, fixture]
      );
    });
  },
});

export async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({ path: `tests/__artifacts__/${name}.png` });
}
