import { db } from "../db";

export const handlers = [
  ...db.post.toHandlers("rest", "http://api.server.com"),
  ...db.post.toHandlers("rest"),
];
