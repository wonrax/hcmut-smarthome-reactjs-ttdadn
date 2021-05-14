import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Text } from "..";

export const LoginPage = () => {
  const inputstyles: React.CSSProperties = {
    padding: "16px",
    boxShadow: "var(--card-shadow)",
    width: "100%",
    boxSizing: "border-box",
    border: "none",
    borderRadius: "var(--border-radius)",
  };

  const history = useHistory();
  const signInClicked = () => {
    let path = `/`;
    history.push(path);
  };

  return (
    <>
      <Box margins="mb32">
        <Text kind="h2">Đăng nhập vào SmartHome</Text>
      </Box>
      <form action="127.0.0.1/api/login" method="POST">
        <Box margins="mb8">
          <Text kind="caption">Số điện thoại</Text>
        </Box>
        <Box margins="mb16" wid="100">
          <input
            name="phonenumber"
            style={inputstyles}
            placeholder="03842xx.xx"
          />
        </Box>
        <Box margins="mb8">
          <Text kind="caption">Mật khẩu</Text>
        </Box>
        <Box margins="mb24" wid="100">
          <input name="password" style={inputstyles} placeholder="Mật khẩu" />
        </Box>
        <Button onClick={signInClicked}>
          <Text kind="normal" textAlign="center" color="white">
            Đăng nhập
          </Text>
        </Button>
      </form>
    </>
  );
};
