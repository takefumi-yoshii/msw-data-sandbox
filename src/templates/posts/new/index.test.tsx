import { setupMockServer } from "@/lib/msw";
import { seed } from "@/mock/db";
import { handlers } from "@/mock/msw/handlers";
import { composeStories } from "@storybook/testing-react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import * as stories from "./index.stories";

const { Default } = composeStories(stories);

describe("src/templates/posts/new/index.test.tsx", () => {
  beforeAll(() => seed());
  setupMockServer(...handlers);
  describe("初期表示", () => {
    test("正常時", async () => {
      render(<Default />);
      expect(await screen.findByText("POST")).toBeInTheDocument();
    });
  });
});
