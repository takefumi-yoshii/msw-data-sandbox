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
      <h1>{props.title}</h1>
      {props.children}
      <BottomNav>{props.bottomNav}</BottomNav>
    </div>
  );
};
