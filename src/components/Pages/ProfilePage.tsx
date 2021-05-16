import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, Icon, Text, TitledPageTemplate } from "..";

export const ProfilePage = () => {
  const history = useHistory();
  const logOut = () => {
    history.push("/login");
  };
  return (
    <TitledPageTemplate title="Thông tin nhà">
      <Box margins="mb16">
        <Text kind="normalcap" color="gray50">
          Chủ nhà
        </Text>
        <Text kind="normal">Hà Huy Long Hải</Text>
      </Box>
      <Box margins="mb32">
        <Text kind="normalcap" color="gray50">
          Địa chỉ
        </Text>
        <Text kind="normal">
          Số 13/239 Tô Vĩnh Diện, phường Đông Hoà, thị xã Dĩ An, tỉnh Bình Dương
        </Text>
        <Box margins="mb16" />
        <Text kind="normal" color="gray70">
          Vililad Co. Ltd.
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
