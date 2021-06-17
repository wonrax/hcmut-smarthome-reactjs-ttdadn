import React, { useEffect, useRef, useState } from "react";
import { Icon, Box, Text, Button, InlineLoading } from "..";
import { InlineIcon } from "../InlineIcon";
import { ScheduledTask } from "..";
import { TitledPageTemplate } from "../Utils";
import { useHistory, useParams } from "react-router";
import { baseURL } from "../api";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type propsTypes = {};

const requestConfig: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

export const DeviceInfoPage = (props: propsTypes) => {
  const [isScheduleEnabled, setScheduleEnabled] = useState<boolean>(false);
  const [isAutoEnabled, setAutoEnabled] = useState<boolean>(false);
  const deviceInfo = (
    <InlineLoading kind="loading" message="Đang tải thông tin thiết bị..." />
  );
  const [isFetched, setFetched] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse>();
  const [scheduleList, setScheduleList] =
    useState<JSX.Element[] | JSX.Element>(deviceInfo);

  // Keep reference to scheduleList state up to date
  const scheduleListRef = useRef<JSX.Element | JSX.Element[]>(scheduleList);

  const { device_id } = useParams<{ device_id: string }>();

  const history = useHistory();

  const toggleScheduleEnabled = () => {
    const newSchedData = {
      device_id: device_id,
      automation_mode: isScheduleEnabled ? 0 : 1,
    };
    const customRequestConf = { ...requestConfig };
    customRequestConf["method"] = "PATCH";
    customRequestConf["data"] = newSchedData;
    axios(baseURL + "/addsched", customRequestConf)
      .then((response) => {
        if (!isScheduleEnabled) {
          setAutoEnabled(false);
        }
        setScheduleEnabled(!isScheduleEnabled);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const toggleAutoEnabled = () => {
    const newSchedData = {
      device_id: device_id,
      automation_mode: isAutoEnabled ? 0 : 2,
    };
    const customRequestConf = { ...requestConfig };
    customRequestConf["method"] = "PATCH";
    customRequestConf["data"] = newSchedData;
    axios(baseURL + "/addsched", customRequestConf)
      .then((response) => {
        if (!isAutoEnabled) {
          setScheduleEnabled(false);
        }
        setAutoEnabled((isAutoEnabled) => !isAutoEnabled);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleOnDeleteSchedule = (id: string) => {
    const customRequestConf = { ...requestConfig };
    customRequestConf["data"] = {
      schedule_id: id,
    };
    customRequestConf["method"] = "DELETE";
    axios(baseURL + "/addsched", customRequestConf)
      .then((response) => {
        if (!scheduleListRef.current || !Array.isArray(scheduleListRef.current))
          return;
        if (response.status !== 202) return;
        for (var i = 0; i < scheduleListRef.current.length; i++) {
          if (scheduleListRef.current[i].props.id === id) {
            const copyList = scheduleListRef.current.slice();
            copyList.splice(i, 1);
            scheduleListRef.current = copyList;
            setScheduleList(copyList);
            return;
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleNewScheduleClick: React.MouseEventHandler<HTMLButtonElement> =
    () => {
      const newSchedData = {
        device_id: device_id,
        is_repeat: false,
        repeat_day: [],
        time_on: "07:00",
        time_off: "09:00",
      };
      const customRequestConf = { ...requestConfig };
      customRequestConf["method"] = "POST";
      customRequestConf["data"] = newSchedData;
      axios(baseURL + "/addsched", customRequestConf)
        .then((response) => {
          if (
            !scheduleListRef.current ||
            !Array.isArray(scheduleListRef.current)
          )
            return;
          const copyList = scheduleListRef.current.slice();
          copyList.unshift(
            <ScheduledTask
              key={response.data.schedule_id}
              id={response.data.schedule_id}
              enabledDays={[]}
              isDefaultRepeat={false}
              timeOn="07:00"
              timeOff="09:00"
              onDelete={handleOnDeleteSchedule}
            />
          );
          scheduleListRef.current = copyList;
          setScheduleList(copyList);
        })
        .catch((e) => {
          console.log(e);
        });
    };

  const handleViewStatisticsClick: React.MouseEventHandler<HTMLButtonElement> =
    () => {
      history.push({
        pathname: "/statistics",
        state: { defaultDeviceType: response?.data.device_type },
      });
    };

  useEffect(() => {
    document.title = "Device";

    const url =
      baseURL +
      "/@" +
      localStorage.getItem("username") +
      "/devices/" +
      device_id;
    const fetchDeviceInfo = async function () {
      const requestConfig: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      };
      try {
        let response = await axios(url, requestConfig);
        setResponse(response);
        setFetched(true);
        setScheduleEnabled(response.data.automation_mode === 1 ? true : false);
        setAutoEnabled(response.data.automation_mode === 2 ? true : false);
      } catch (e) {
        if (e.response.status === 401) {
          localStorage.clear();
          history.push("/login");
        }
      }
    };
    fetchDeviceInfo();
  }, [device_id, history]);

  useEffect(() => {
    if (!isFetched) return;
    const list_ = response?.data.schedules.map(
      (schedule: any, index: number) => {
        return (
          <ScheduledTask
            key={schedule.schedule_id}
            id={schedule.schedule_id.toString()}
            enabledDays={schedule.repeat_day}
            isDefaultRepeat={schedule.is_repeat}
            timeOn={schedule.time_on}
            timeOff={schedule.time_off}
            onDelete={handleOnDeleteSchedule}
          />
        );
      }
    );
    scheduleListRef.current = list_;
    setScheduleList(list_);
  }, [isFetched, response]);

  const device_type_text =
    response?.data.device_type === "light" ? "Đèn" : "Quạt";

  return (
    <TitledPageTemplate title="Thông tin thiết bị" scrollToTop>
      <>
        {isFetched ? (
          <>
            <Box margins="mb8">
              <Text kind="h3">{response?.data.device_name}</Text>
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
                onClick={handleViewStatisticsClick}
              />
            </Box>

            <Box margins="mb8">
              <Text kind="h3">Chế độ tự động</Text>
            </Box>
            <Box margins="mb8">
              <Button
                onClick={toggleAutoEnabled}
                noDecoration
                wid="100"
                textAlign="left"
              >
                <InlineIcon>
                  <Box wid="100" hei="100" margins="mr16" align="vcenter">
                    <Text kind="normal">Kích hoạt chế độ tự động</Text>
                  </Box>
                  <Icon icon={isAutoEnabled ? "Toggle-On" : "Toggle-Off"} />
                </InlineIcon>
              </Button>
            </Box>
            <Box margins="mb32">
              <InlineIcon>
                <Icon icon="Info-Circle" />
                <Box margins="ml16">
                  <Text kind="normalcap" color="gray70">
                    {`${device_type_text} sẽ được tự động bật/tắt khi cường độ ánh sáng trong ngày
                    thay đổi.`}
                  </Text>
                </Box>
              </InlineIcon>
            </Box>

            <Box margins="mb8">
              <Text kind="h3">Hẹn giờ</Text>
            </Box>
            <Box margins="mb8">
              <Button
                onClick={toggleScheduleEnabled}
                noDecoration
                wid="100"
                textAlign="left"
              >
                <InlineIcon>
                  <Box wid="100" hei="100" margins="mr16" align="vcenter">
                    <Text kind="normal">Kích hoạt tính năng hẹn giờ</Text>
                  </Box>
                  <Icon icon={isScheduleEnabled ? "Toggle-On" : "Toggle-Off"} />
                </InlineIcon>
              </Button>
            </Box>
            <Box margins="mb32">
              <InlineIcon>
                <Icon icon="Info-Circle" />
                <Box margins="ml16">
                  <Text kind="normalcap" color="gray70">
                    {`${device_type_text} sẽ được tự động bật/tắt theo danh sách lịch đã hẹn ở
                    dưới đây.`}
                  </Text>
                </Box>
              </InlineIcon>
            </Box>
            <Box margins="mb32">
              <Button
                onClick={handleNewScheduleClick}
                text="Đặt lịch mới"
                iconPosition="left"
                iconName="Plus"
              />
            </Box>
            <Box>{scheduleList}</Box>
          </>
        ) : (
          deviceInfo
        )}
      </>
    </TitledPageTemplate>
  );
};
