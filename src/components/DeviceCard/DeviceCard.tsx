import React, { useState } from "react";
import styles from "./DeviceCard.module.css";
import { Text } from "..";
import { Box } from "..";
import { InlineIcon } from "..";

type subProps = {
  icon1: string;
  icon2: string;
  icon3?: string;
  text1: string;
  text2?: string;
};

const DeviceBrief = (props: subProps) => {
  const [isToggleOn, setIsToggleOn] = useState<boolean>(false);
  const toggleDevice:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = () => {
    setIsToggleOn(!isToggleOn);
  };
  var secondIcon = props.icon3
    ? isToggleOn
      ? props.icon3
      : props.icon2
    : props.icon2;
  return (
    <button
      className={styles["device-brief"]}
      type="button"
      onClick={props.text2 ? toggleDevice : undefined}
    >
      <InlineIcon iconLeft={props.icon1} iconRight={secondIcon}>
        <Box margins="mv16">
          {props.text2 ? (
            <>
              <Box margins="mb4">
                <Text key="heading" kind="h4">
                  {props.text1}
                </Text>
              </Box>
              <Text key="description" kind="normalcap" color="gray70">
                {props.text2}
              </Text>
            </>
          ) : (
            <Text kind="normalcap">{props.text1}</Text>
          )}
        </Box>
      </InlineIcon>
    </button>
  );
};

type Props = {
  deviceName: string;
  deviceDescription: string;
  deviceAutomationInfo: string;
};
export const DeviceCard = (props: Props) => {
  return (
    <div className={styles["device-card"]}>
      <DeviceBrief
        icon1="Light"
        icon2="Toggle-Off"
        icon3="Toggle-On"
        text1={props.deviceName}
        text2={props.deviceDescription}
      />
      <div className={styles.divider}></div>
      <DeviceBrief
        icon1="Info-Circle"
        icon2="Arrow-Right"
        text1={props.deviceAutomationInfo}
      />
    </div>
  );
};
