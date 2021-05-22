import React, { useEffect, useState } from "react";
import { Icon, Box, Text, Button, InlineLoading } from "..";
import { InlineIcon } from "../InlineIcon";
import { ScheduledTask } from "..";
import { TitledPageTemplate } from "../Utils";
import { useParams } from "react-router";
import axios from "axios";

type propsTypes = {};

export const DeviceInfoPage = (props: propsTypes) => {
  const [isScheduleEnabled, setScheduleEnabled] = useState<boolean>(false);
  const [deviceInfo, setDeviceInfo] = useState<JSX.Element | JSX.Element[]>(
    <InlineLoading
      kind="loading"
      loadingMessage="Đang tải thông tin thiết bị..."
    />
  );
  const [isFetched, setFetched] = useState<boolean>(false);

  const { device_id } = useParams<{ device_id: string }>();

  const toggleScheduleEnabled = () => {
    setScheduleEnabled(!isScheduleEnabled);
  };

  const DeviceInfoRaw = () => (
    <>
      {deviceInfo}
      {isFetched && (
        <>
          <Box margins="mb32">
            <Button
              text="Xem thống kê sử dụng"
              kind="secondary"
              iconPosition="left"
              iconName="Graph"
            />
          </Box>
          <Box margins="mb8">
            <Text kind="h3">Hẹn giờ</Text>
          </Box>
          <Box margins="mb8">
            <button
              onClick={toggleScheduleEnabled}
              style={{
                cursor: "pointer",
                userSelect: "none",
                width: "100%",
                textAlign: "left",
              }}
            >
              <InlineIcon>
                <Box wid="100" hei="100" margins="mr16">
                  <Text kind="normal">Kích hoạt tính năng hẹn giờ</Text>
                </Box>
                <Icon icon={isScheduleEnabled ? "Toggle-On" : "Toggle-Off"} />
              </InlineIcon>
            </button>
          </Box>
          <Box margins="mb32">
            <InlineIcon>
              <Icon icon="Info-Circle" />
              <Box margins="ml16">
                <Text kind="normalcap" color="gray70">
                  Đèn sẽ được tự động bật/tắt theo danh sách lịch đã hẹn ở dưới
                  đây.
                </Text>
              </Box>
            </InlineIcon>
          </Box>
          <Box margins="mb32">
            <Button text="Đặt lịch mới" iconPosition="left" iconName="Plus" />
          </Box>
          <Box>
            <ScheduledTask id="1" />
            <ScheduledTask id="2" />
            <ScheduledTask id="3" />
          </Box>
        </>
      )}
    </>
  );

  useEffect(() => {
    document.title = "Device";

    const url = "http://localhost:8000/api/@0789123456/devices/" + device_id;
    const fetchDeviceInfo = async function () {
      let response = await axios(url);
      console.log(response.data);
      setDeviceInfo(
        <>
          <Box margins="mb8">
            <Text kind="normal">{response.data.device_name}</Text>
          </Box>
          <Box margins="mb32">
            <Text kind="normal" color="gray70">
              {response.data.description}
            </Text>
          </Box>
        </>
      );
      setFetched(true);
    };
    fetchDeviceInfo();
  }, [device_id]);

  return (
    <TitledPageTemplate title="Thông tin thiết bị" scrollToTop>
      <DeviceInfoRaw />
    </TitledPageTemplate>
  );
};
