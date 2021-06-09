import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, InlineLoading, Text, TitledPageTemplate } from "..";
import { baseURL } from "../api";

const requestConfig: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

export const ProfilePage = () => {
  const history = useHistory();
  const logOut = () => {
    localStorage.clear();
    history.push("/login");
  };

  const [changePasswordState, setChangePasswordState] =
    useState<"initial" | "loading" | "done" | "error">("initial");
  const [changePasswordErrorMessage, setChangePasswordErrorMessage] =
    useState<string>("");

  const handlePasswordChangeSubmit: React.FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    setChangePasswordState("loading");
    if (
      e.currentTarget["password"].value ===
      e.currentTarget["confirm-password"].value
    ) {
      const customRequestConf = { ...requestConfig };
      customRequestConf["method"] = "POST";
      customRequestConf["data"] = {
        password: e.currentTarget["password"].value,
      };
      e.currentTarget["password"].value = "";
      e.currentTarget["confirm-password"].value = "";
      axios(baseURL + "/change-password", customRequestConf)
        .then((response) => {
          setChangePasswordErrorMessage("Đổi mật khẩu thành công");
          setChangePasswordState("done");
          setTimeout(() => {
            setChangePasswordState("initial");
          }, 2000);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setChangePasswordState("error");
      setChangePasswordErrorMessage("Mật khẩu không trùng nhau");
      setTimeout(() => {
        setChangePasswordState("initial");
      }, 2000);
    }
    e.preventDefault();
  };

  const [homeName, setHomeName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };
    axios(baseURL + "/profile", requestConfig)
      .then((response) => {
        if (response.status !== 202) {
          console.log("ERROR: Server returned code " + response.status);
          return;
        }

        const data = response.data;
        if (!(data.home_name && data.phone_number && data.address)) {
          console.log("Possibly wrong data format:\n" + data);
        }

        setHomeName(data.home_name);
        setAddress(data.address);
        setPhoneNumber(data.phone_number);
      })
      .catch((e) => {
        console.log(e.response);
      });
  }, []);

  const inputstyles: React.CSSProperties = {
    padding: "16px",
    boxShadow: "var(--card-shadow)",
    width: "100%",
    boxSizing: "border-box",
    border: "none",
    borderRadius: "var(--border-radius)",
  };

  return (
    <TitledPageTemplate title={homeName}>
      <Box margins="mb16">
        <Text kind="normalcap" color="gray50">
          Tên đăng nhập
        </Text>
        <Text kind="normal">{phoneNumber}</Text>
      </Box>
      <Box margins="mb32">
        <Text kind="normalcap" color="gray50">
          Địa chỉ
        </Text>
        <Text kind="normal">{address}</Text>
        <Box margins="mb16" />
        <Text kind="normal" color="gray70">
          SmartHome Co. Ltd.
        </Text>
      </Box>

      <Box margins={["mb32"]}>
        <Button
          onClick={logOut}
          text="Đăng xuất"
          kind="danger"
          iconPosition="right"
          iconName="Logout"
        />
      </Box>

      <Box margins={["mb24"]}>
        <Text kind="h2">Đổi mật khẩu</Text>
      </Box>
      <form onSubmit={handlePasswordChangeSubmit}>
        <label htmlFor="password">
          <Box margins="mb8">
            <Text kind="caption">Mật khẩu mới</Text>
          </Box>
        </label>
        <Box margins="mb24" wid="100">
          <input
            type="password"
            id="password"
            name="password"
            style={inputstyles}
            placeholder="Mật khẩu mới"
          />
        </Box>
        <label htmlFor="comfirm-password">
          <Box margins="mb8">
            <Text kind="caption">Nhập lại mật khẩu</Text>
          </Box>
        </label>
        <Box margins="mb16" wid="100">
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            style={inputstyles}
            placeholder="Mật khẩu mới"
          />
        </Box>
        <Box>
          {changePasswordState === "initial" ? (
            <Button text="Xác nhận" kind="default" />
          ) : (
            <InlineLoading
              message={
                ["error", "done"].includes(changePasswordState)
                  ? changePasswordErrorMessage
                  : undefined
              }
              kind={changePasswordState}
            />
          )}
        </Box>
      </form>
    </TitledPageTemplate>
  );
};
