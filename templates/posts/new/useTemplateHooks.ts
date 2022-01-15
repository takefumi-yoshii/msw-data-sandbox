import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { mutate } from "swr";

export const useTemplateHooks = () => {
  const router = useRouter();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      title: "",
      body: "",
    },
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
  return { onSubmit, register } as const;
};
