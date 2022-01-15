import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";

const usePageHooks = () => {
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
    if (data) router.push("/posts");
  });
  return { onSubmit, register } as const;
};

const PageBody = () => {
  const { onSubmit, register } = usePageHooks();
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input type="text" {...register("title")} />
      </div>
      <div>
        <textarea {...register("body")} />
      </div>
      <div>
        <button>post</button>
      </div>
    </form>
  );
};

const PageBase = () => {
  return (
    <div>
      <h1>POSTS</h1>
      <PageBody />
      <hr />
      <Link href="/posts">
        <a className="button">back</a>
      </Link>
    </div>
  );
};

const Page = PageBase;

export default Page;
