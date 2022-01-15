import { fetcher } from "@/lib/swr";
import type { Post } from "@/mock/msw/db";
import Link from "next/link";
import React from "react";
import useSWR from "swr";

const PageBody = ({ posts }: { posts: Post[] }) => {
  return (
    <ul>
      {posts.map((row) => (
        <li key={row.id}>
          <Link href={`/posts/${row.id}`}>
            <a>{row.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const PageBase = () => {
  const { data, error } = useSWR<Post[]>("/posts", fetcher);
  if (error) return <>error!</>;
  return (
    <div>
      <h1>POSTS</h1>
      {!data ? <>...loading</> : <PageBody posts={data} />}
      <hr />
      <Link href="/posts/new">
        <a className="button">create new</a>
      </Link>
    </div>
  );
};

const Page = PageBase;

export default Page;
