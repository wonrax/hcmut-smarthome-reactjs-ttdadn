import classnames from "classnames";
import React, { ReactChild, useState } from "react";
import { Box, Button, Text, Checkbox, BackButton } from "..";
import styles from "./ScheduledTask.module.css";

export const ScheduledTask = (props: { id: string }) => {
  return (
    <div>
      <Box margins="mb24">
        <Text kind="h2">18:00 - 12:00</Text>
      </Box>
      <Box margins="mb16">
        <Checkbox label="Lặp lại" id={props.id} />
      </Box>
      <Box margins="mb24">
        <Day>T2</Day>
        <Day>T3</Day>
        <Day>T4</Day>
        <Day>T5</Day>
        <Day>T6</Day>
        <Day>T7</Day>
        <Day>CN</Day>
      </Box>
      <Box margins="mb24">
        <Box margins="mr16" display="inlineFlex">
          <Button
            bgColor="bgDanger"
            text="Xoá"
            iconPosition="left"
            iconName="Delete"
          />
        </Box>
        <Button
          text="Chỉnh sửa"
          kind="secondary"
          iconPosition="left"
          iconName="Edit"
        />
      </Box>
      <div
        style={{
          backgroundColor: "var(--gray-20)",
          width: "auto",
          height: "var(--border-width)",
          marginBottom: "24px",
        }}
      ></div>
    </div>
  );
};

const Day = (props: { children: ReactChild }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);

  const cs = classnames(
    styles.day,
    isEnabled ? styles.enabled : styles.disabled
  );

  const textColor = isEnabled ? "primary" : "gray50";

  const toggleEnabled = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <button className={cs} onClick={toggleEnabled}>
      <Text kind="normalcap" display="inlineBlock" color={textColor}>
        {props.children}
      </Text>
    </button>
  );
};
