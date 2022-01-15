import { fetcher } from "@/lib/swr";
import type { Post } from "@/mock/msw/db";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

const PageBody = ({ post }: { post: Post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </div>
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
      <Link href="/posts">
        <a className="button">back</a>
      </Link>
      <Link href={`/posts/${props.id}/edit`}>
        <a className="button">edit</a>
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
