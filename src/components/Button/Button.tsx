import classnames from "classnames";
import React, { ReactChild } from "react";
import styles from "./Button.module.css";

export const Button = (props: {
  children: ReactChild;
  kind?: "default" | "secondary";
  as?: "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  const cs = classnames(
    styles.button,
    props.kind ? styles[props.kind] : styles["default"]
  );
  if (props.as === "button") {
    return React.createElement("button", {
      children: props.children,
      className: cs,
    });
  }
  return (
    <button onClick={props.onClick} className={cs}>
      {props.children}
    </button>
  );
};
