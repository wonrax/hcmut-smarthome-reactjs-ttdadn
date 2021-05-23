import classnames from "classnames";
import React, { ReactChild, useState } from "react";
import { Box, Button, Text, Checkbox } from "..";
import styles from "./ScheduledTask.module.css";

export const ScheduledTask = (props: {
  id: string;
  enabledDays: number[];
  isDefaultRepeat: boolean;
  timeRange: string;
}) => {
  const enabledDayMapping: { [key: number]: boolean } = {};
  const mappings: number[] = [1, 2, 3, 4, 5, 6, 7];
  mappings.map((value, index) => {
    if (props.enabledDays.includes(value)) enabledDayMapping[value] = true;
    else enabledDayMapping[value] = false;
    return undefined;
  });

  const listOfDays = (
    <>
      <Day isDefaultEnabled={enabledDayMapping[2]}>T2</Day>
      <Day isDefaultEnabled={enabledDayMapping[3]}>T3</Day>
      <Day isDefaultEnabled={enabledDayMapping[4]}>T4</Day>
      <Day isDefaultEnabled={enabledDayMapping[5]}>T5</Day>
      <Day isDefaultEnabled={enabledDayMapping[6]}>T6</Day>
      <Day isDefaultEnabled={enabledDayMapping[7]}>T7</Day>
      <Day isDefaultEnabled={enabledDayMapping[1]}>CN</Day>
    </>
  );

  return (
    <div>
      <Box margins="mb24">
        <Text kind="h2">{props.timeRange}</Text>
      </Box>
      <Box margins="mb16">
        <Checkbox
          isDefaultChecked={props.isDefaultRepeat}
          label="Lặp lại"
          id={props.id}
        />
      </Box>
      <Box margins="mb24">{listOfDays}</Box>
      <Box margins="mb24">
        <Box margins="mr16" display="inlineFlex">
          <Button
            kind="danger"
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

const Day = (props: { children: ReactChild; isDefaultEnabled: boolean }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(props.isDefaultEnabled);

  const cs = classnames(
    styles.day,
    isEnabled ? styles.enabled : styles.disabled
  );

  const textColor = isEnabled ? "primary" : "gray50";

  const toggleEnabled = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    // <button className={cs} onClick={toggleEnabled}>
    //   <Text kind="normalcap" display="inlineBlock" color={textColor}>
    //     {props.children}
    //   </Text>
    // </button>
    <Box margins="mr8" display="inline">
      <Button noDecoration onClick={toggleEnabled}>
        <div className={cs}>
          <Text kind="normalcap" display="inlineBlock" color={textColor}>
            {props.children}
          </Text>
        </div>
      </Button>
    </Box>
  );
};
