import type { Post } from "@/mock/db/models/post";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import * as yup from "yup";

const resolver = yupResolver(
  yup.object().shape({
    title: yup.string().required("入力してください"),
  })
);

export const useTemplateHooks = (post: Post) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: post,
    resolver,
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
  return { onSubmit, register, errors } as const;
};
