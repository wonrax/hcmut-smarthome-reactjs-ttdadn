import classnames from "classnames";
import React, { ReactChild } from "react";
import styles from "./Button.module.css";

export const Button = (props: {
  children: ReactChild;
  kind?: "default" | "secondary";
}) => {
  const cs = classnames(
    styles.button,
    props.kind ? styles[props.kind] : styles["default"]
  );
  return <div className={cs}>{props.children}</div>;
};
