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

export const useTemplateHooks = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
    resolver,
  });
  const onSubmit = handleSubmit(async (values) => {
    const { v4: uuidv4 } = require("uuid");
    const body = JSON.stringify({
      id: uuidv4(),
      title: values.title,
      body: values.body,
    });
    const data = await fetch("/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    })
      .then((res) => res.json())
      .catch(() => window.alert("failed"));
    await mutate("/posts");
    if (data) router.push("/posts");
  });
  return { onSubmit, register, errors } as const;
};
