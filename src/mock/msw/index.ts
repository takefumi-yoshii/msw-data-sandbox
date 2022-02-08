import { seed } from "../db";

if (typeof window === "undefined" || process.env.NODE_ENV === "test") {
  seed();
  const { server } = require("./server");
  server.listen();
} else {
  seed();
  const { worker } = require("./browser");
  worker.start();
}
