import { Layout } from "@/components/Layout";
import { fetcher } from "@/lib/swr";
import type { Post } from "@/mock/db/models/post";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import style from "./style.module.css";
import { useTemplateHooks } from "./useTemplateHooks";

const Body = (props: { post: Post }) => {
  const { onSubmit, register, errors } = useTemplateHooks(props.post);
  return (
    <form onSubmit={onSubmit} className={style.module}>
      <section>
        <h2>title</h2>
        <input type="text" {...register("title")} placeholder="title" />
        {errors.title && <p role="alert">※ {errors.title.message}</p>}
      </section>
      <section>
        <h2>body</h2>
        <textarea {...register("body")} />
      </section>
      <button className="button">update</button>
    </form>
  );
};

export const Template = (props: { id: string }) => {
  const { data, error } = useSWR<Post>(`/posts/${props.id}`, fetcher);
  if (error) return <>error!</>;
  return (
    <Layout
      title="POST"
      bottomNav={
        <Link href={`/posts/${props.id}`}>
          <a className="button">back</a>
        </Link>
      }
    >
      {!data ? <>...loading</> : <Body post={data} />}
    </Layout>
  );
};
