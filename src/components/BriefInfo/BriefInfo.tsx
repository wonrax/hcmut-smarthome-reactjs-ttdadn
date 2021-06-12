import React from "react";
import styles from "./BriefInfo.module.css";
import { Box, Icon, InlineIcon, Text } from "..";
import classNames from "classnames";

export const BriefInfo = (props: {
  main: string;
  info: string;
  marginLeft?: boolean;
}) => {
  const cs = classNames(
    styles["brief-info"],
    props.marginLeft && styles["marginLeft"]
  );
  return (
    <div className={cs}>
      <Box wid="100">
        <Box margins="mb24">
          <Text kind="h1" color="primary">
            {props.main}
          </Text>
        </Box>
        <Text kind="normal" color="primary50">
          {props.info}
        </Text>
      </Box>
    </div>
  );
};
