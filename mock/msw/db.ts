import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  post: {
    id: primaryKey(String),
    title: String,
  },
});
