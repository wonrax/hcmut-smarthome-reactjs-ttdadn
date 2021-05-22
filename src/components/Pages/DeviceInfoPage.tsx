import React, { useEffect, useState } from "react";
import { Icon, Box, Text, Button, InlineLoading } from "..";
import { InlineIcon } from "../InlineIcon";
import { ScheduledTask } from "..";
import { TitledPageTemplate } from "../Utils";
import { useParams } from "react-router";
import axios, { AxiosResponse } from "axios";

type propsTypes = {};

export const DeviceInfoPage = (props: propsTypes) => {
  const [isScheduleEnabled, setScheduleEnabled] = useState<boolean>(false);
  const deviceInfo = (
    <InlineLoading
      kind="loading"
      loadingMessage="Đang tải thông tin thiết bị..."
    />
  );
  const [isFetched, setFetched] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse>();

  const { device_id } = useParams<{ device_id: string }>();

  const toggleScheduleEnabled = () => {
    setScheduleEnabled(!isScheduleEnabled);
  };

  const scheduleList =
    isFetched &&
    response?.data.schedule.map((schedule: any, index: number) => {
      return (
        <ScheduledTask
          key={index}
          id={index.toString()}
          enabledDays={schedule.repeat_day}
        />
      );
    });

  const DeviceInfoRaw = () => (
    <>
      {isFetched ? (
        <>
          <Box margins="mb8">
            <Text kind="normal">{response?.data.device_name}</Text>
          </Box>
          <Box margins="mb32">
            <Text kind="normal" color="gray70">
              {response?.data.description}
            </Text>
          </Box>
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
          <Box>{scheduleList}</Box>
        </>
      ) : (
        deviceInfo
      )}
    </>
  );

  useEffect(() => {
    document.title = "Device";

    const url =
      "http://10.228.11.249:8000/api/@0789123456/devices/" + device_id;
    const fetchDeviceInfo = async function () {
      let response = await axios(url);
      setResponse(response);
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
