import React, { useImperativeHandle, useState } from "react";
import styles from "./DeviceCard.module.css";
import { Button, Text } from "..";
import { Box } from "..";
import { InlineIcon, Icon } from "..";
import { useHistory } from "react-router-dom";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { baseURL } from "../api";

type Props = {
  deviceType: "Fan" | "Light";
  deviceName: string;
  deviceDescription: string;
  deviceAutomationInfo: string;
  defaultStatus?: boolean;
  device_id: number;
};
export const DeviceCard = React.forwardRef((props: Props, ref) => {
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
        defaultStatus={props.defaultStatus}
        device_id={props.device_id}
        ref={ref}
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
        device_id={props.device_id}
      />
    </div>
  );
});

type deviceBriefProps = {
  leftIcon: string;
  rightIcon: string;
  iconToggled?: string;
  textAbove: string;
  textBeneath?: string;
  handleOnMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  handleOnMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  handleFocus?: React.FocusEventHandler<HTMLDivElement>;
  defaultStatus?: boolean;
  device_id: number;
};

const DeviceBrief = React.forwardRef((props: deviceBriefProps, ref) => {
  const [isToggleOn, setIsToggleOn] = useState<boolean>(
    typeof props.defaultStatus != "undefined" ? props.defaultStatus : false
  );

  useImperativeHandle(ref, () => {
    return {
      setIsToggleOn: setIsToggleOn,
      device_id: props.device_id,
    };
  });

  const toggleDevice: React.MouseEventHandler<HTMLButtonElement> = () => {
    let url = baseURL + "/@" + localStorage.getItem("username") + "/devices";
    const postData: AxiosRequestConfig = {
      method: "post",
      url: url,
      data: {
        device_id: props.device_id,
        data: isToggleOn ? "0" : "1",
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };
    let response: AxiosResponse;
    async function toggleDeviceRemote() {
      try {
        response = await axios(postData);
        setIsToggleOn(!isToggleOn);
      } catch (e) {
        console.log(e);
        console.log(response);
      }
    }
    toggleDeviceRemote();
  };
  const history = useHistory();
  const deviceInfoClicked = () => {
    let path = `/devices/` + props.device_id;
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
});
