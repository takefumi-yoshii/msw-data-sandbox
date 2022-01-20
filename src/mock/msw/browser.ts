import { rest, setupWorker } from "msw";
import { seed } from "../db";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

window.msw = {
  worker,
  rest,
  seed,
};

declare global {
  interface Window {
    msw: {
      worker: typeof worker;
      rest: typeof rest;
      seed: typeof seed;
    };
  }
}
