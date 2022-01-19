import { initialize, mswDecorator } from "msw-storybook-addon";
import { seed } from "../src/mock/msw/db";
import { handlers } from "../src/mock/msw/handlers";

initialize();
seed();

export const decorators = [mswDecorator];

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
