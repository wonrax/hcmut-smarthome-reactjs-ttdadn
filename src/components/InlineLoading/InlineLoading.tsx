import React from "react";
import { Box, Icon, InlineIcon, Text } from "..";

export const InlineLoading = () => {
  return (
    <div
      style={{
        display: "inline-block",
        height: "var(--button-min-height)",
        width: "fit-content",
      }}
    >
      <InlineIcon>
        <Box margins="mr8">
          <Icon icon="Loading"></Icon>
        </Box>
        <Text kind="normalcap">Đang gọi anh Bảnh...</Text>
      </InlineIcon>
    </div>
  );
};
