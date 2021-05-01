import React, { useState } from "react";
import styles from "./DeviceCard.module.css";
import { Icon } from "..";
import { Text } from "..";

type Props = {
  icon1: string;
  icon2: string;
  icon3?: string;
  text1: string;
  text2?: string;
};

const DeviceBrief = (props: Props) => {
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
      <Icon icon={props.icon1} />
      <div style={{ width: "100%", height: "100%", margin: "0 16px" }}>
        {props.text2 ? (
          [
            <Text kind="h4">{props.text1}</Text>,
            <Text kind="normalcap" color="gray70">
              {props.text2}
            </Text>,
          ]
        ) : (
          <Text kind="normalcap">{props.text1}</Text>
        )}
      </div>
      <Icon icon={secondIcon} />
    </button>
  );
};
export const DeviceCard = () => {
  return (
    <div className={styles["device-card"]}>
      <DeviceBrief
        icon1="Light"
        icon2="Toggle-Off"
        icon3="Toggle-On"
        text1="Den hanh lang"
        text2="TC1169 den hanh lang tang 2 he he hehehe hehe he"
      />
      <div className={styles.divider}></div>
      <DeviceBrief
        icon1="Info-Circle"
        icon2="Arrow-Right"
        text1="Tu dong bat khi troi toii"
      />
    </div>
  );
};
