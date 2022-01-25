import { testWithAxe } from "@/lib/jest";
import { setupMockServer } from "@/lib/msw";
import { seed } from "@/mock/db";
import { handlers } from "@/mock/msw/handlers";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import React from "react";
import * as stories from "./index.stories";

const { Default } = composeStories(stories);

describe("src/templates/posts/index/index.test.tsx", () => {
  beforeAll(() => seed());
  setupMockServer(...handlers);
  describe("初期表示", () => {
    testWithAxe("正常時", <Default />, async ({ findByText }) => {
      expect(await findByText("POST")).toBeInTheDocument();
    });
  });
});
