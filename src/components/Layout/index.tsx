import { BottomNav } from "@/components/BottomNav";
import React from "react";
import style from "./style.module.css";

export const Layout = (props: {
  title: React.ReactNode;
  children: React.ReactNode;
  bottomNav: React.ReactNode;
}) => {
  return (
    <div className={style.module}>
      <header>
        <h1>{props.title}</h1>
      </header>
      <main>{props.children}</main>
      <footer>
        <BottomNav>{props.bottomNav}</BottomNav>
      </footer>
    </div>
  );
};
