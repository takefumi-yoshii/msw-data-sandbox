import "@/../public/styles/global.css";
import type { AppProps } from "next/app";
import React from "react";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mock/msw");
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
