import { testWithAxe } from "@/lib/jest";
import { setupMockServer } from "@/lib/msw";
import { seed } from "@/mock/db";
import { handlers } from "@/mock/msw/handlers";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import React from "react";
import * as stories from "./index.stories";

const { Default, InputError } = composeStories(stories);

describe("src/templates/posts/[id]/edit/index.test.tsx", () => {
  beforeAll(() => seed());
  setupMockServer(...handlers);
  describe("初期表示", () => {
    testWithAxe("正常時", <Default />, async ({ findByPlaceholderText }) => {
      expect(await findByPlaceholderText("title")).toHaveValue("seed example");
    });
  });
  describe("バリデーション表示", () => {
    testWithAxe(
      "タイトルが空の時、エラー文言が表示される",
      <InputError />,
      async ({ findByRole, canvasElement }) => {
        await InputError.play({ canvasElement });
        expect(await findByRole("alert")).toBeInTheDocument();
      }
    );
  });
});
