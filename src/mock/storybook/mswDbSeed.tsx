import { defaultValues } from "@/mock/db/models";
import type { Story } from "@storybook/react";
import React from "react";
import { seed } from "../db";

export const mswDbSeed =
  (values = defaultValues) =>
  (StoryComponent: Story) => {
    seed(values);
    return <StoryComponent />;
  };
