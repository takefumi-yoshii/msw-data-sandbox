import { primaryKey } from "@mswjs/data";
import { Value } from "@mswjs/data/lib/glossary";

export const post = {
  id: primaryKey(String),
  title: String,
  body: String,
};

export type Post = Value<typeof post, {}>;

export const defaultPosts: Post[] = [
  {
    id: "0",
    title: "Lorem ipsum",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];
