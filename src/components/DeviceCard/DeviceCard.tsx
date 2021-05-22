import React, { useRef, useState } from "react";
import styles from "./DeviceCard.module.css";
import { Button, Text } from "..";
import { Box } from "..";
import { InlineIcon, Icon } from "..";
import { useHistory } from "react-router-dom";

type subProps = {
  leftIcon: string;
  rightIcon: string;
  iconToggled?: string;
  textAbove: string;
  textBeneath?: string;
  handleOnMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  handleOnMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  handleFocus?: React.FocusEventHandler<HTMLDivElement>;
};

const DeviceBrief = (props: subProps) => {
  const [isToggleOn, setIsToggleOn] = useState<boolean>(false);
  const toggleDevice: React.MouseEventHandler<HTMLButtonElement> = () => {
    setIsToggleOn(!isToggleOn);
  };
  const history = useHistory();
  const deviceInfoClicked = () => {
    let path = `/device`;
    history.push(path);
  };
  var secondIcon = props.iconToggled
    ? isToggleOn
      ? props.iconToggled
      : props.rightIcon
    : props.rightIcon;
  return (
    <Button
      noDecoration
      onClick={props.textBeneath ? toggleDevice : deviceInfoClicked}
      wid="100"
    >
      <div
        onMouseEnter={props.handleOnMouseEnter}
        onMouseLeave={props.handleOnMouseLeave}
        className={styles["device-brief"]}
      >
        <InlineIcon>
          <Icon icon={props.leftIcon}></Icon>
          <Box margins={["mr16", "ml16"]} wid="100" hei="100" align="vcenter">
            {props.textBeneath ? (
              <>
                <Box margins="mb4">
                  <Text key="heading" kind="h4" color="primary">
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
      </div>
    </Button>
  );
};

type Props = {
  deviceType: "Fan" | "Light";
  deviceName: string;
  deviceDescription: string;
  deviceAutomationInfo: string;
};
export const DeviceCard = (props: Props) => {
  const [isDividerVisible, setDividerVisible] = useState<boolean>(true);
  const handleOnMouseEnter = () => {
    setDividerVisible(false);
  };
  const handleOnMouseLeave = () => {
    setDividerVisible(true);
  };
  return (
    <div className={styles["device-card"]}>
      <DeviceBrief
        handleOnMouseEnter={handleOnMouseEnter}
        handleOnMouseLeave={handleOnMouseLeave}
        leftIcon={props.deviceType}
        rightIcon="Toggle-Off"
        iconToggled="Toggle-On"
        textAbove={props.deviceName}
        textBeneath={props.deviceDescription}
      />
      <div
        className={isDividerVisible ? styles.divider : styles.dividerInvisible}
      ></div>
      <DeviceBrief
        handleOnMouseEnter={handleOnMouseEnter}
        handleOnMouseLeave={handleOnMouseLeave}
        leftIcon="Info-Circle"
        rightIcon="Arrow-Right"
        textAbove={props.deviceAutomationInfo}
      />
    </div>
  );
};
