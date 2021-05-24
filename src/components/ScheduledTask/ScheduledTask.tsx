import classnames from "classnames";
import React, { ReactChild, useEffect, useState } from "react";
import { Box, Button, Text, Checkbox } from "..";
import styles from "./ScheduledTask.module.css";

export const ScheduledTask = (props: {
  id: string;
  enabledDays: number[];
  isDefaultRepeat: boolean;
  timeOn: string;
  timeOff: string;
  onDelete: (id: string) => void;
}) => {
  const [animationState, setAnimationState] =
    useState<"initial" | "running">("initial");
  const [timeOn, setTimeOn] = useState<string>("");
  const [timeOff, setTimeOff] = useState<string>("");
  const [timeModifyModalVisible, setTimeModifyModalVisible] =
    useState<boolean>(false);
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

  const handleOnClickDelete = () => {
    setAnimationState("running");
  };

  const handleOnAnimationEnd: React.TransitionEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (e.currentTarget.className === styles.scheduledTaskFading)
      props.onDelete(props.id);
  };

  const handleScheduleTimeChange: React.FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    //TODO
    //Make a request to server
    e.preventDefault();
    setTimeModifyModalVisible(false);
  };

  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.name === "timeOn") setTimeOn(e.target.value);
    else if (e.target.name === "timeOff") setTimeOff(e.target.value);
  };

  const handleOnTimeEditClick: React.MouseEventHandler<HTMLButtonElement> =
    () => {
      setTimeModifyModalVisible(!timeModifyModalVisible);
    };

  const cs = classnames(
    animationState === "running"
      ? styles.scheduledTaskFading
      : styles.scheduledTask
  );

  useEffect(() => {
    setTimeOn(props.timeOn);
    setTimeOff(props.timeOff);
  }, [props.timeOn, props.timeOff]);

  return (
    <div className={cs} onTransitionEnd={handleOnAnimationEnd}>
      <Box margins="mb24">
        <Text kind="h2">{timeOn + " - " + timeOff}</Text>
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
            onClick={handleOnClickDelete}
          />
        </Box>
        <Button
          text="Chỉnh sửa"
          kind="secondary"
          iconPosition="left"
          iconName="Edit"
          onClick={handleOnTimeEditClick}
        />
      </Box>

      <form
        onSubmit={handleScheduleTimeChange}
        className={
          timeModifyModalVisible
            ? styles.timeChangeModal
            : styles.timeChangeModalHidden
        }
      >
        <Box margins={["mt16", "mb16"]}>
          <Text kind="h3">Đổi giờ</Text>
        </Box>
        <Box display="inline" margins="mr16">
          <Text kind="normal" display="inline">
            Từ
          </Text>
        </Box>
        <input
          type="time"
          name="timeOn"
          defaultValue={props.timeOn}
          onChange={handleTimeChange}
        />
        <Box display="inline" margins={["ml16", "mr16"]}>
          <Text kind="normal" display="inline">
            tới
          </Text>
        </Box>
        <input
          type="time"
          name="timeOff"
          defaultValue={props.timeOff}
          onChange={handleTimeChange}
        />
        <Box margins={["mb16", "mt16"]}>
          <Button kind="default" text="Lưu thay đổi" />
        </Box>
      </form>

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
