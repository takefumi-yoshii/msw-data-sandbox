import { fetcher } from "@/lib/swr";
import type { Post } from "@/mock/msw/db";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

const usePageHooks = (post: Post) => {
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
    if (data) router.push(`/posts/${values.id}`);
  });
  return { onSubmit, register } as const;
};

const PageBody = (props: { post: Post }) => {
  const { onSubmit, register } = usePageHooks(props.post);
  return (
    <form onSubmit={onSubmit}>
      <h2>
        <input type="text" {...register("title")} />
      </h2>
      <textarea {...register("body")} />
      <button>done</button>
    </form>
  );
};

const PageBase = (props: { id: string }) => {
  const { data, error } = useSWR<Post>(`/posts/${props.id}`, fetcher);
  if (error) return <>error!</>;
  return (
    <div>
      <h1>POST</h1>
      {!data ? <>...loading</> : <PageBody post={data} />}
      <hr />
      <Link href={`/posts/${props.id}`}>
        <a className="button">back</a>
      </Link>
    </div>
  );
};

const Page = () => {
  const router = useRouter();
  if (!router.isReady) {
    return <>...loading</>;
  }
  const id = router.query["id"];
  if (typeof id !== "string") {
    return <>error!</>;
  }
  return <PageBase id={id} />;
};

export default Page;
