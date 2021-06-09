import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Text, TitledPageTemplate } from "..";
import { baseURL } from "../api";

export const ProfilePage = () => {
  const history = useHistory();
  const logOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    history.push("/login");
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
      <Button onClick={logOut}>
        <Text kind="normal" color="white">
          Đăng xuất
        </Text>
      </Button>
    </TitledPageTemplate>
  );
};
