import Head from "next/head";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div>
      <Head>
        <title>User Flow Testing</title>
      </Head>
      <h1>User Flow Testing</h1>
      <Link href="/posts">
        <a>posts</a>
      </Link>
    </div>
  );
};

export default Page;
