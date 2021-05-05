import React, { ReactChild } from "react";
import styles from "./InlineIcon.module.css";

export const InlineIcon = (props: {
  children: ReactChild[];
  iconBackground?: boolean;
}) => {
  return (
    <div className={styles["inline-icon"]}>
      {props.children[0]}
      {props.children[1]}
      {props.children[2]}
    </div>
  );
};
