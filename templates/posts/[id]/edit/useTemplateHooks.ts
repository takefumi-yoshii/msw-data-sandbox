import type { Post } from "@/mock/msw/db";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

export const useTemplateHooks = (post: Post) => {
  const router = useRouter();
  const { handleSubmit, register } = useForm({
    defaultValues: post,
  });
  const onSubmit = handleSubmit(async (values) => {
    const body = JSON.stringify({
      id: values.id,
      title: values.title,
      body: values.body,
    });
    const data = await fetch(`/posts/${values.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body,
    })
      .then((res) => res.json())
      .catch(() => window.alert("failed"));
    await mutate(`/posts/${values.id}`);
    if (data) router.push(`/posts/${values.id}`);
  });
  return { onSubmit, register } as const;
};
