import classnames from "classnames";
import React, { ReactChild } from "react";
import styles from "./Button.module.css";

export const Button = (props: {
  children: ReactChild;
  kind?: "default" | "secondary";
  as?: "button";
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) => {
  const cs = classnames(
    styles.button,
    props.kind ? styles[props.kind] : styles["default"]
  );
  if (props.as == "button") {
    return React.createElement("button", {
      children: props.children,
      className: cs,
    });
  }
  return (
    <div onClick={props.onClick} className={cs}>
      {props.children}
    </div>
  );
};
