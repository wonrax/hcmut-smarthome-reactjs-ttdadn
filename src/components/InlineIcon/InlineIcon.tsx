import React, { ReactChild } from "react";
import { isPropertySignature } from "typescript";
import { Icon } from "..";
import styles from "./InlineIcon.module.css";

export const InlineIcon = (props: {
  iconLeft?: string;
  iconRight?: string;
  children: ReactChild;
}) => {
  return (
    <div className={styles["inline-icon"]}>
      {props.iconLeft && <Icon icon={props.iconLeft} />}
      {props.children}
      {props.iconRight && <Icon icon={props.iconRight} />}
    </div>
  );
};
