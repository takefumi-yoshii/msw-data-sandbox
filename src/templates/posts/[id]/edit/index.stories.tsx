import { mswDbSeed } from "@/mock/storybook/mswDbSeed";
import type { ComponentStoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { Template } from "./";

type Story = ComponentStoryObj<typeof Template>;

export default { component: Template };

export const Default: Story = {
  args: { id: "0" },
  decorators: [
    mswDbSeed({
      posts: [
        {
          id: "0",
          title: "seed example",
          body: "Hello world",
        },
      ],
    }),
  ],
};

export const InputError: Story = {
  args: { id: "0" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    userEvent.clear(await canvas.findByPlaceholderText("title"));
    userEvent.click(await canvas.findByRole("button"));
  },
};
