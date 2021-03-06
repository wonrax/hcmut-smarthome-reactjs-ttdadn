import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, InlineLoading, Text } from "..";
import { baseURL } from "../api";

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

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      history.replace("/");
    }
  }, [history]);

  const [signInState, setSignInState] =
    useState<"initial" | "loading" | "done" | "error">("initial");

  const formSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
    e.preventDefault();
  };

  const submitFormManually = () => {
    setSignInState("loading");
    axios
      .post(baseURL + "/login", {
        phone_number: usernameInputRef.current?.value,
        password: passwordInputRef.current?.value,
      })
      .then((response) => {
        if (response.status !== 200) {
          console.log("ERROR: Server returned code " + response.status);
          return;
        }
        localStorage.setItem(
          "username",
          usernameInputRef.current ? usernameInputRef.current.value : ""
        );
        const access_token = response.data.access_token;
        const refresh_token = response.data.refresh_token;
        if (access_token) {
          localStorage.setItem("access_token", access_token);
        }
        if (refresh_token) {
          localStorage.setItem("refresh_token", refresh_token);
        }

        history.replace("/");
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status !== 200) {
          setSignInState("error");
          setTimeout(() => {
            setSignInState("initial");
          }, 2000);
        }
      });
    // setTimeout(() => {
    //   setSignInState("done");
    //   setTimeout(() => {
    //     let path = `/device`;
    //     history.push(path);
    //   }, 1000);
    // }, 5000);
  };

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  const passwordKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === "Enter" || evt.key === "Enter") submitFormManually();
  };

  const usernameKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.code === "Enter" || evt.key === "Enter") {
      passwordInputRef.current?.focus();
      evt.preventDefault();
    }
  };

  const styles: React.CSSProperties = {
    marginTop: "calc(50vh - 250px)",
  };

  return (
    <>
      <div style={styles}>
        <Box margins="mb32">
          <Text kind="h2">????ng nh???p v??o Smarthome</Text>
        </Box>
        <form onSubmit={formSubmitHandle}>
          <label htmlFor="phonenumber">
            <Box margins="mb8">
              <Text kind="caption">S??? ??i???n tho???i</Text>
            </Box>
          </label>
          <Box margins="mb16" wid="100">
            <input
              autoCapitalize="off"
              name="phonenumber"
              id="phonenumber"
              type="text"
              style={inputstyles}
              placeholder="038.999.9999"
              autoFocus
              onKeyDown={usernameKeyDown}
              ref={usernameInputRef}
            />
          </Box>
          <label htmlFor="password">
            <Box margins="mb8">
              <Text kind="caption">M???t kh???u</Text>
            </Box>
          </label>
          <Box margins="mb24" wid="100">
            <input
              type="password"
              id="password"
              name="password"
              style={inputstyles}
              placeholder="M???t kh???u"
              ref={passwordInputRef}
              onKeyDown={passwordKeyDown}
            />
          </Box>
          {signInState === "initial" ? (
            <Button
              text="????ng nh???p"
              onClick={submitFormManually}
              iconPosition="right"
              iconName="Arrow-Right-Dash"
            />
          ) : (
            <InlineLoading
              message={
                signInState === "error"
                  ? "Sai t??n ????ng nh???p ho???c m???t kh???u"
                  : undefined
              }
              kind={signInState}
            />
          )}
        </form>
      </div>
    </>
  );
};
