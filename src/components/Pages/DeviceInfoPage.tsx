import React, { useEffect } from "react";
import { Icon, Box, Text, Button } from "..";
import { Link } from "react-router-dom";

export const DeviceInfoPage = () => {
  useEffect(() => {
    document.title = "Device";
  }, []);
  return (
    <>
      {/*Container*/}
      <Box margins="mb32">
        <Link to="/">
          <Icon icon="Arrow-Left" iconBackground />
        </Link>
      </Box>
      <Box margins="mb32">
        <Text kind="h2">Thông tin thiết bị</Text>
      </Box>
      <Box margins="mb8">
        <Text kind="normal">Đèn hành lang</Text>
      </Box>
      <Box margins="mb32">
        <Text kind="normal" color="gray70">
          Lầu 2
        </Text>
      </Box>
      <Box align="center">
        <Button>
          <Text kind="normal">Xem thống kê sử dụng</Text>
        </Button>
      </Box>
    </>
  );
};
