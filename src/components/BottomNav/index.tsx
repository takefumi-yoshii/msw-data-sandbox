import React from "react";
import style from "./style.module.css";

export const BottomNav = (props: { children: React.ReactNode }) => {
  return <div className={style.module}>{props.children}</div>;
};
