import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, InlineLoading, Text } from "..";

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
  const [signInState, setSignInState] =
    useState<"initial" | "loading" | "done">("initial");

  const formSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("form submitted");
    e.preventDefault();
  };

  const signInClicked = () => {
    setSignInState("loading");
    setTimeout(() => {
      setSignInState("done");
      setTimeout(() => {
        let path = `/device`;
        history.push(path);
      }, 1000);
    }, 5000);
  };

  const passwordKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === "Enter" || evt.key === "Enter") signInClicked();
  };

  return (
    <>
      <Box margins="mb32">
        <Text kind="h2">Đăng nhập vào SmartHome</Text>
      </Box>
      <form onSubmit={formSubmitHandle}>
        <label htmlFor="phonenumber">
          <Box margins="mb8">
            <Text kind="caption">Số điện thoại</Text>
          </Box>
        </label>
        <Box margins="mb16" wid="100">
          <input
            autoCapitalize="off"
            name="phonenumber"
            id="phonenumber"
            type="text"
            style={inputstyles}
            placeholder="03842xx.xx"
          />
        </Box>
        <label htmlFor="password">
          <Box margins="mb8">
            <Text kind="caption">Mật khẩu</Text>
          </Box>
        </label>
        <Box margins="mb24" wid="100">
          <input
            type="password"
            id="password"
            name="password"
            style={inputstyles}
            placeholder="Mật khẩu"
            onKeyDown={passwordKeyDown}
          />
        </Box>
        {signInState === "initial" ? (
          <Button
            text="Đăng nhập"
            onClick={signInClicked}
            iconPosition="right"
            iconName="Arrow-Right-Dash"
          />
        ) : (
          <InlineLoading kind={signInState} />
        )}
      </form>
    </>
  );
};
