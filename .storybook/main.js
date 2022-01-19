const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "storybook-css-modules-preset",
  ],
  framework: "@storybook/react",
  webpackFinal: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname, "../src");
    return config;
  },
};
