import { seed } from "./db";

if (typeof window === "undefined") {
  seed();
  const { server } = require("./server");
  server.listen();
} else {
  seed();
  const { worker } = require("./browser");
  worker.start();
}
