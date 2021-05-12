import React, { ReactChild } from "react";
import styles from "./Button.module.css";

export const Button = (props: { children: ReactChild }) => {
  return <div className={styles.button}>{props.children}</div>;
};
