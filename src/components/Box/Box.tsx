import React, { ReactChild } from "react";
import styles from "./Box.module.css";
import classnames from "classnames";

const availableMargins = ["mb4", "mt4", "mb16", "mv16"] as const;
type Margin = typeof availableMargins[number];

export const Box = (props: {
  children: ReactChild | ReactChild[];
  margins: Margin | Margin[];
}) => {
  var cs = styles["box"];
  // Check if an array
  if ((props.margins as Array<string>).map) {
    cs = classnames(
      (props.margins as Array<string>).map((val) => styles[val]),
      cs
    );
  } else {
    cs = classnames(styles[props.margins as string], cs);
  }
  return <div className={cs}>{props.children}</div>;
};
