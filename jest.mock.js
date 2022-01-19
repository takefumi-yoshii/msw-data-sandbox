// config

jest.retryTimes(3);

// polyfills

window.alert = jest.fn();
window.confirm = jest.fn(() => true);

const fetchPolifill = require("whatwg-fetch");

global.fetch = fetchPolifill.fetch;
global.Request = fetchPolifill.Request;
global.Headers = fetchPolifill.Headers;
global.Response = fetchPolifill.Response;

// library mock

jest.mock("next/dist/client/router", () => require("next-router-mock"));
