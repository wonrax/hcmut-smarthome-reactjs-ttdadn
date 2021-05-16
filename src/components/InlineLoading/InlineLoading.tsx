import React, { useState } from "react";
import { Box, Icon, InlineIcon, Text } from "..";

export const InlineLoading = (props: { kind: "loading" | "done" }) => {
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
          <Icon icon={props.kind === "loading" ? "Loading" : "Tick"}></Icon>
        </Box>
        <Text kind="normalcap">
          {props.kind === "loading" ? "Đang gọi anh Bảnh..." : "Anh Bảnh đã OK"}
        </Text>
      </InlineIcon>
    </div>
  );
};
