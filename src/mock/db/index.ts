import { drop, factory } from "@mswjs/data";
import { defaultValues, dictionary } from "./models";

export const db = factory(dictionary);

export function seed(values = defaultValues) {
  drop(db);
  const nextValues = {
    ...defaultValues,
    ...values,
  };
  nextValues.posts.map((post) => {
    db.post.create(post);
  });
}
