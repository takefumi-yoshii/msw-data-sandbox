import "@testing-library/jest-dom";
import { render, RenderResult } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import React from "react";

expect.extend(toHaveNoViolations);

export function testWithAxe(
  title: string,
  ui: React.ReactElement,
  fn: (rr: RenderResult & { canvasElement: HTMLElement }) => Promise<void>
) {
  test(title, async () => {
    const rr = render(ui);
    await fn({ ...rr, canvasElement: rr.container });
    expect(await axe(rr.container)).toHaveNoViolations();
  });
}
