import { factory, primaryKey } from "@mswjs/data";

export type Post = {
  id: string;
  title: string;
  body: string;
};

export const db = factory({
  post: {
    id: primaryKey(String),
    title: String,
    body: String,
  },
});

export function seed() {
  const { v4: uuidv4 } = require("uuid");
  db.post.create({
    id: uuidv4(),
    title: "Lorem ipsum",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  });
}
