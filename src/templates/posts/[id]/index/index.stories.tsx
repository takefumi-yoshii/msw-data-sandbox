import type { ComponentStoryObj } from "@storybook/react";
import { Template } from "./";

type Story = ComponentStoryObj<typeof Template>;
export default { component: Template };

export const Default: Story = {
  args: { id: "0" },
};
