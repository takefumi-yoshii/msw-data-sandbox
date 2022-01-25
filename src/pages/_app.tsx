import "@/../public/styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mock/msw");
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>msw-data-sandbox</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
