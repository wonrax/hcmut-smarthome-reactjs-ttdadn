import axios, { AxiosRequestConfig } from "axios";
import classnames from "classnames";
import React, { ReactChild, useState } from "react";
import { Box, Button, Text, Checkbox } from "..";
import { baseURL } from "../api";
import styles from "./ScheduledTask.module.css";

const requestConfig: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

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
  const [timeOn, setTimeOn] = useState<string>(props.timeOn);
  const [timeOff, setTimeOff] = useState<string>(props.timeOff);
  const [isRepeat, setIsRepeat] = useState<boolean>(props.isDefaultRepeat);
  const [enabledDays, setEnabledDays] = useState<number[]>(props.enabledDays);
  const [timeModifyModalVisible, setTimeModifyModalVisible] =
    useState<boolean>(false);
  const enabledDayMapping: { [key: number]: boolean } = {};
  const mappings: number[] = [1, 2, 3, 4, 5, 6, 7];
  mappings.map((value, index) => {
    if (props.enabledDays.includes(value)) enabledDayMapping[value] = true;
    else enabledDayMapping[value] = false;
    return undefined;
  });

  const sendAndUpdateSched = (data: any) => {
    const customRequestConf = { ...requestConfig };
    customRequestConf["data"] = data;
    customRequestConf["method"] = "POST";
    axios(baseURL + "/addsched", customRequestConf).then((response) => {
      if (response.status !== 202) {
        console.log(
          "Cannot update schedule. Server returned code " + response.status
        );
        return;
      }
      const data = response.data;
      if (
        !(
          data.schedule_id &&
          data.time_on &&
          data.time_off &&
          data.is_repeat !== undefined &&
          data.repeat_day
        )
      ) {
        console.log("Possibly wrong data format:\n" + data);
        return;
      }
    });
  };

  const handleDayToggle = (day: { [key: number]: boolean }) => {
    const days = enabledDays.slice(0);
    for (const d in day) {
      const intD = parseInt(d);
      if (day[d]) {
        if (days.includes(intD)) continue;
        days.push(intD);
        setEnabledDays(days);
        continue;
      }
      if (days.includes(intD)) {
        var index = days.indexOf(intD);
        days.splice(index, 1);
        setEnabledDays(days);
      }
    }
    const data = {
      schedule_id: props.id,
      is_repeat: isRepeat,
      repeat_day: days,
      time_on: timeOn,
      time_off: timeOff,
    };
    sendAndUpdateSched(data);
  };

  const handleIsRepeatToggle = (checked: boolean) => {
    const data = {
      schedule_id: props.id,
      is_repeat: checked,
      repeat_day: enabledDays,
      time_on: timeOn,
      time_off: timeOff,
    };
    setIsRepeat(checked);
    sendAndUpdateSched(data);
  };

  const listOfDays = (
    <>
      <Day
        handleDayToggle={handleDayToggle}
        isDefaultEnabled={enabledDayMapping[2]}
        index={2}
      >
        T2
      </Day>
      <Day
        handleDayToggle={handleDayToggle}
        isDefaultEnabled={enabledDayMapping[3]}
        index={3}
      >
        T3
      </Day>
      <Day
        handleDayToggle={handleDayToggle}
        isDefaultEnabled={enabledDayMapping[4]}
        index={4}
      >
        T4
      </Day>
      <Day
        handleDayToggle={handleDayToggle}
        isDefaultEnabled={enabledDayMapping[5]}
        index={5}
      >
        T5
      </Day>
      <Day
        handleDayToggle={handleDayToggle}
        isDefaultEnabled={enabledDayMapping[6]}
        index={6}
      >
        T6
      </Day>
      <Day
        handleDayToggle={handleDayToggle}
        isDefaultEnabled={enabledDayMapping[7]}
        index={7}
      >
        T7
      </Day>
      <Day
        handleDayToggle={handleDayToggle}
        isDefaultEnabled={enabledDayMapping[1]}
        index={1}
      >
        CN
      </Day>
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

  const handleOnTimeSave = () => {
    const data = {
      schedule_id: props.id,
      is_repeat: isRepeat,
      repeat_day: enabledDays,
      time_on: timeOn,
      time_off: timeOff,
    };
    sendAndUpdateSched(data);
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

  // useEffect(() => {
  //   setTimeOn(props.timeOn);
  //   setTimeOff(props.timeOff);
  // }, [props.timeOn, props.timeOff]);

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
          onCheck={handleIsRepeatToggle}
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
          <Button
            onClick={handleOnTimeSave}
            kind="default"
            text="Lưu thay đổi"
          />
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

const Day = (props: {
  children: ReactChild;
  isDefaultEnabled: boolean;
  handleDayToggle: any;
  index: number;
}) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(props.isDefaultEnabled);

  const cs = classnames(
    styles.day,
    isEnabled ? styles.enabled : styles.disabled
  );

  const textColor = isEnabled ? "primary" : "gray50";

  const toggleEnabled = () => {
    const data = { [props.index]: !isEnabled };
    props.handleDayToggle(data);
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
