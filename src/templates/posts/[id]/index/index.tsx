import { BottomNav } from "@/components/BottomNav";
import { Layout } from "@/components/Layout";
import { fetcher } from "@/lib/swr";
import type { Post } from "@/mock/db/models/post";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import style from "./style.module.css";
import { useTemplateHooks } from "./useTemplateHooks";

const Body = ({ post }: { post: Post }) => {
  const { handleClickDelete } = useTemplateHooks(post);
  return (
    <div className={style.module}>
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
      <BottomNav>
        <Link href={`/posts/${post.id}/edit`}>
          <a className="button">edit</a>
        </Link>
        <a className="button" onClick={handleClickDelete}>
          delte
        </a>
      </BottomNav>
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
        </>
      }
    >
      {!data ? <>...loading</> : <Body post={data} />}
    </Layout>
  );
};
