import React, { ReactChild } from "react";
import { Icon } from "..";
import styles from "./InlineIcon.module.css";

export const InlineIcon = (props: {
  iconLeft?: string;
  iconRight?: string;
  children: ReactChild;
  iconBackground?: boolean;
}) => {
  return (
    <div className={styles["inline-icon"]}>
      {props.iconLeft && (
        <Icon icon={props.iconLeft} iconBackground={props.iconBackground} />
      )}
      {props.children}
      {props.iconRight && (
        <Icon icon={props.iconRight} iconBackground={props.iconBackground} />
      )}
    </div>
  );
};
