import React from "react";
import styles from "./Checkbox.module.css";
import { Text } from "..";

export const Checkbox = (props: {
  isDefaultChecked?: boolean;
  label: string;
  id: string;
  onCheck?: (status: boolean) => void;
}) => {
  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (props.onCheck) props.onCheck(e.currentTarget.checked);
  };
  return (
    <>
      <input
        className={styles.input}
        id={props.id}
        type="checkbox"
        defaultChecked={props.isDefaultChecked}
        onChange={handleOnChange}
      />
      <label className={styles.label} htmlFor={props.id}>
        <Text kind="normal" display="inline">
          Lặp lại
        </Text>
      </label>
    </>
  );
};
