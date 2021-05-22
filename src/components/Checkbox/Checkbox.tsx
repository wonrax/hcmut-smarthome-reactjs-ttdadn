import React from "react";
import styles from "./Checkbox.module.css";
import { Text } from "..";

export const Checkbox = (props: {
  isDefaultChecked?: boolean;
  label: string;
  id: string;
}) => {
  return (
    <>
      <input
        className={styles.input}
        id={props.id}
        type="checkbox"
        checked={props.isDefaultChecked}
      />
      <label className={styles.label} htmlFor={props.id}>
        <Text kind="normal" display="inline">
          Lặp lại
        </Text>
      </label>
    </>
  );
};
