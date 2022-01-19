import { Layout } from "@/components/Layout";
import { fetcher } from "@/lib/swr";
import type { Post } from "@/mock/msw/db";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import style from "./style.module.css";

const Body = ({ posts }: { posts: Post[] }) => {
  return (
    <div className={style.module}>
      <ul data-testid="list">
        {posts.map((row) => (
          <li key={row.id}>
            <Link href={`/posts/${row.id}`}>
              <a>{row.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Template = () => {
  const { data, error } = useSWR<Post[]>("/posts", fetcher);
  if (error) return <>error!</>;
  return (
    <Layout
      title="POST"
      bottomNav={
        <Link href="/posts/new">
          <a className="button">create new</a>
        </Link>
      }
    >
      {!data ? <>...loading</> : <Body posts={data} />}
    </Layout>
  );
};
