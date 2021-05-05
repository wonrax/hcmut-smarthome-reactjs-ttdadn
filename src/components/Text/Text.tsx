import React, { ReactChild } from "react";
import styles from "./Text.module.css";
import colorStyles from "../Colors.module.css";
import classnames from "classnames";

export const Text = (props: {
  kind: "h1" | "h2" | "h3" | "h4" | "normalcap" | "normal";
  color?: string;
  children: ReactChild | ReactChild[];
}) => {
  var TagName = "p";
  const headingLists = ["h1", "h2", "h3", "h4"];
  if (headingLists.includes(props.kind)) {
    TagName = props.kind;
  }

  const cs = classnames(
    styles[props.kind],
    props.color ? colorStyles[props.color] : colorStyles["gray100"]
  );

  return React.createElement(TagName, {
    children: props.children,
    className: cs,
  });
};
