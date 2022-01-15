import { Template } from "@/templates/posts/[id]/edit";
import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const router = useRouter();
  if (!router.isReady) {
    return <>...loading</>;
  }
  const id = router.query["id"];
  if (typeof id !== "string") {
    return <>error!</>;
  }
  return <Template id={id} />;
};

export default Page;
