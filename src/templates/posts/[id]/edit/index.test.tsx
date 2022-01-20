import { setupMockServer } from "@/lib/msw";
import { seed } from "@/mock/db";
import { handlers } from "@/mock/msw/handlers";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as stories from "./index.stories";

const { Default, InputError } = composeStories(stories);

describe("src/templates/posts/[id]/edit/index.test.tsx", () => {
  beforeAll(() => seed());
  setupMockServer(...handlers);
  describe("初期表示", () => {
    test("正常時", async () => {
      render(<Default />);
      expect(await screen.findByPlaceholderText("title")).toHaveValue(
        "seed example"
      );
    });
  });
  describe("バリデーション表示", () => {
    test("タイトルが空の時、エラー文言が表示される", async () => {
      const { container, findByRole } = render(<InputError />);
      await InputError.play({ canvasElement: container });
      expect(await findByRole("alert")).toBeInTheDocument();
    });
  });
});
