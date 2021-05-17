import React, { useEffect, useState } from "react";
import { Box, Icon, InlineIcon, Text } from "..";

export const InlineLoading = (props: { kind: "loading" | "done" }) => {
  const [message, setMessage] = useState<string>("Đang gọi anh Bảnh...");
  useEffect(() => {
    const messageKind = {
      loading: "Đang gọi anh Bảnh...",
      waitMore: "Đợi thêm trút nữa",
      done: "Anh Bảnh đã OK.",
    };
    setMessage(messageKind[props.kind]);
    const timeout = setTimeout(() => {
      setMessage(messageKind.waitMore);
    }, 2500);
    return () => {
      clearTimeout(timeout);
    };
  }, [props.kind]);
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
          <Icon
            icon={props.kind === "loading" ? "Loading" : "Tick"}
            color={props.kind === "done" ? "success" : undefined}
          ></Icon>
        </Box>
        <Text kind="normal">{message}</Text>
      </InlineIcon>
    </div>
  );
};
