import React from "react";
import styles from "./Checkbox.module.css";
import { Text } from "..";

export const Checkbox = (props: {
  isChecked?: boolean;
  label: string;
  id: string;
}) => {
  return (
    <>
      <input className={styles.input} id={props.id} type="checkbox" />
      <label className={styles.label} htmlFor={props.id}>
        <Text kind="normal" display="inline">
          Lặp lại
        </Text>
      </label>
    </>
  );
};
