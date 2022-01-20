import { Page } from "@playwright/test";
import { defaultValues } from "../src/mock/db/models";

export async function seed(page: Page, fixture: typeof defaultValues) {
  const windowHandle = await page.evaluateHandle(() => window);
  await page.evaluate(
    // @ts-ignore
    ([window, fixture]) => window.msw.seed(fixture),
    [windowHandle, fixture]
  );
}

export async function takeScreenshot(page: Page, name: string) {
  await page.screenshot({ path: `tests/__artifacts__/${name}.png` });
}
