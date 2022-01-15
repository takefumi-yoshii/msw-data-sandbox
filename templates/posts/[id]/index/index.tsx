import { Layout } from "@/components/Layout";
import { fetcher } from "@/lib/swr";
import type { Post } from "@/mock/msw/db";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import style from "./style.module.css";

const Body = ({ post }: { post: Post }) => {
  return (
    <div className={style.module}>
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </div>
  );
};

export const Template = (props: { id: string }) => {
  const { data, error } = useSWR<Post>(`/posts/${props.id}`, fetcher);
  if (error) return <>error!</>;
  return (
    <Layout
      title="POST"
      bottomNav={
        <>
          <Link href="/posts">
            <a className="button">back</a>
          </Link>
          <Link href={`/posts/${props.id}/edit`}>
            <a className="button">edit</a>
          </Link>
        </>
      }
    >
      {!data ? <>...loading</> : <Body post={data} />}
    </Layout>
  );
};
