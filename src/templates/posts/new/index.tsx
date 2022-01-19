import { Layout } from "@/components/Layout";
import Link from "next/link";
import React from "react";
import style from "./style.module.css";
import { useTemplateHooks } from "./useTemplateHooks";

const Body = () => {
  const { onSubmit, register, errors } = useTemplateHooks();
  return (
    <form onSubmit={onSubmit} className={style.module}>
      <section>
        <h2>title</h2>
        <input type="text" {...register("title")} />
        {errors.title && <p role="alert">※ {errors.title.message}</p>}
      </section>
      <section>
        <h2>body</h2>
        <textarea {...register("body")} />
      </section>
      <section>
        <button className="button">create</button>
      </section>
    </form>
  );
};

export const Template = () => {
  return (
    <Layout
      title="POST"
      bottomNav={
        <Link href="/posts">
          <a className="button">back</a>
        </Link>
      }
    >
      <Body />
    </Layout>
  );
};
