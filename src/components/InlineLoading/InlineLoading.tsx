import React, { useEffect, useState } from "react";
import { Box, Icon, InlineIcon, Text } from "..";

export const InlineLoading = (props: {
  kind: "loading" | "done" | "error";
  message?: string;
}) => {
  const [message, setMessage] = useState<string>("Đang gọi anh Bảnh...");
  useEffect(() => {
    const messageKind = {
      loading: props.message || "Đang xác thực...",
      done: props.message || "OK.",
      error: props.message || "Lỗi",
      // extra:
      waitMore: props.message || "Đợi thêm chút nữa",
    };
    setMessage(messageKind[props.kind]);
    const timeout = setTimeout(() => {
      setMessage(messageKind.waitMore);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [props.kind, props.message]);

  const iconKindMapping = {
    loading: "Loading",
    done: "Tick",
    error: "Error",
  };

  const iconColorMapping: { [key: string]: "success" | "danger" | undefined } =
    {
      loading: undefined,
      done: "success",
      error: "danger",
    };
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
            icon={iconKindMapping[props.kind]}
            color={iconColorMapping[props.kind]}
          ></Icon>
        </Box>
        <Text kind="normal">{message}</Text>
      </InlineIcon>
    </div>
  );
};
