import type { Post } from "@/mock/db/models/post";
import { useRouter } from "next/router";
import { mutate } from "swr";

export const useTemplateHooks = (post: Post) => {
  const router = useRouter();
  const handleClickDelete = async () => {
    const confirm = window.confirm("削除しますか？");
    if (!confirm) return;
    const data = await fetch(`/posts/${post.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch(() => window.alert("failed"));
    await mutate(`/posts`);
    if (data) router.push(`/posts`);
  };
  return { handleClickDelete } as const;
};
