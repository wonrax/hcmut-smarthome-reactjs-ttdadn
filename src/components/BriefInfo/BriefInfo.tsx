import React from "react";
import styles from "./BriefInfo.module.css";
import { Box, Icon, InlineIcon, Text } from "..";

export const BriefInfo = (props: { main: string; info: string }) => {
  return (
    <div className={styles["brief-info"]}>
      <InlineIcon>
        <Box wid="100" margins="mr16">
          <Text kind="h2" color="primary">
            {props.main}
          </Text>
          <Text kind="normal" color="gray70">
            {props.info}
          </Text>
        </Box>
        <Icon icon="Arrow-Right" />
      </InlineIcon>
    </div>
  );
};
