import { mswDbSeed } from "@/mock/storybook/mswDbSeed";
import { initialize, mswDecorator } from "msw-storybook-addon";
import { handlers } from "../src/mock/msw/handlers";

initialize();

export const decorators = [mswDecorator, mswDbSeed()];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  msw: { handlers },
};
