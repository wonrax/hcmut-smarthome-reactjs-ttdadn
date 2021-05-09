import React, { ReactChild } from "react";
import styles from "./Box.module.css";
import classnames from "classnames";

const availableMargins = [
  "mb4",
  "mt4",
  "mb16",
  "mb32",
  "ml16",
  "mr16",
] as const;
const availablePaddings = ["pt32", "pb32", "pl16", "pr16"] as const;
type Margin = typeof availableMargins[number];
type Padding = typeof availablePaddings[number];

export const Box = (props: {
  children?: ReactChild | ReactChild[];
  margins?: Margin | Margin[];
  paddings?: Padding | Padding[];
  wid?: string;
  hei?: string;
}) => {
  var cs = classnames(
    props.wid ? styles[props.wid] : styles["widthauto"],
    props.hei ? styles[props.hei] : styles["widthauto"]
  );
  // Check if an array

  [props.margins, props.paddings].map((properti) => {
    if (properti && Array.isArray(properti)) {
      cs = classnames(
        (properti as Array<string>).map((val) => styles[val]),
        cs
      );
    } else if (properti) {
      cs = classnames(styles[properti as string], cs);
    }
    console.log(cs);
  });

  return <div className={cs}>{props.children}</div>;
};
