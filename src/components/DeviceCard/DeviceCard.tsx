import React, { useState } from "react";
import styles from "./DeviceCard.module.css";
import { Text } from "..";
import { Box } from "..";
import { InlineIcon, Icon } from "..";

type subProps = {
  leftIcon: string;
  rightIcon: string;
  iconToggled?: string;
  textAbove: string;
  textBeneath?: string;
};

const DeviceBrief = (props: subProps) => {
  const [isToggleOn, setIsToggleOn] = useState<boolean>(false);
  const toggleDevice:
    | React.MouseEventHandler<HTMLButtonElement>
    | undefined = () => {
    setIsToggleOn(!isToggleOn);
  };
  const deviceInfoClicked = () => {
    alert("hehe");
  };
  var secondIcon = props.iconToggled
    ? isToggleOn
      ? props.iconToggled
      : props.rightIcon
    : props.rightIcon;
  return (
    <button
      className={styles["device-brief"]}
      type="button"
      onClick={props.textBeneath ? toggleDevice : deviceInfoClicked}
    >
      <InlineIcon>
        {/* Cheat to get aligned icons */}
        <div style={props.textBeneath ? undefined : { marginLeft: "4px" }}>
          <Icon
            icon={props.leftIcon}
            size={props.textBeneath ? 32 : undefined}
          ></Icon>
        </div>
        <Box margins="mv16">
          {props.textBeneath ? (
            <>
              <Box margins="mb4">
                <Text key="heading" kind="h4">
                  {props.textAbove}
                </Text>
              </Box>
              <Text key="description" kind="normalcap" color="gray70">
                {props.textBeneath}
              </Text>
            </>
          ) : (
            <Text kind="normalcap">{props.textAbove}</Text>
          )}
        </Box>
        <Icon icon={secondIcon}></Icon>
      </InlineIcon>
    </button>
  );
};

type Props = {
  deviceType: "Fan" | "Light";
  deviceName: string;
  deviceDescription: string;
  deviceAutomationInfo: string;
};
export const DeviceCard = (props: Props) => {
  return (
    <div className={styles["device-card"]}>
      <DeviceBrief
        leftIcon={props.deviceType}
        rightIcon="Toggle-Off"
        iconToggled="Toggle-On"
        textAbove={props.deviceName}
        textBeneath={props.deviceDescription}
      />
      <div className={styles.divider}></div>
      <DeviceBrief
        leftIcon="Info-Circle"
        rightIcon="Arrow-Right"
        textAbove={props.deviceAutomationInfo}
      />
    </div>
  );
};
