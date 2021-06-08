import React, { useEffect, useState } from "react";
import {
  Icon,
  Text,
  DeviceCard,
  InlineIcon,
  Box,
  BriefInfo,
  Button,
  InlineLoading,
} from "..";
import { baseURL, testUser, websocketURL } from "../api";
import axios, { AxiosRequestConfig } from "axios";

const websocketConnection = new WebSocket(websocketURL);
export const HomePage = () => {
  const date: Date = new Date();
  const [hour, minute] = date.toLocaleTimeString("vi-VN").split(/:| /);
  const timeOfDay = (function () {
    const hourTime = date.getHours();
    if (hourTime >= 19 || hourTime < 5) return "buổi tối";
    if (hourTime >= 5 && hourTime < 12) return "buổi sáng";
    return "buổi chiều";
  })();
  let deviceRefs: React.RefObject<any>[] = [];
  const [weatherDeviceId, setWeatherDeviceId] = useState<string>("");

  const initialDeviceElement = (
    <Box margins="mb16">
      <InlineLoading message="Đang tải danh sách thiết bị..." kind="loading" />
    </Box>
  );
  const initialWeatherElement = (
    <Box margins="mb16">
      <InlineLoading message="Đang tải thông tin cảm biến..." kind="loading" />
    </Box>
  );

  const [deviceElements, setDeviceElements] =
    useState<JSX.Element[] | JSX.Element>(initialDeviceElement);
  const [weatherElements, setWeatherElements] = useState<
    JSX.Element[] | JSX.Element
  >(initialWeatherElement);

  useEffect(() => {
    document.title = "SmartHome";
    const url = baseURL + "/@" + testUser + "/devices";

    websocketConnection.onopen = () => {
      console.log("WebSocket connected");
    };

    websocketConnection.onmessage = (message: any) => {
      if (!message.data) {
        return;
      }
      const socketData = JSON.parse(message.data)["message"];
      console.log(socketData);
      if (socketData && socketData.device_id && socketData.value) {
        if (socketData.device_id === weatherDeviceId) {
          const temphumid: string[] = socketData.value.split("-");
          if (temphumid.length !== 2) {
            console.log("WARNING: Possibly wrong temperature/humid format");
          }
          const newWeatherElements = (
            <WeatherElement temp={temphumid[0]} humid={temphumid[1]} />
          );
          setWeatherElements(newWeatherElements);
          console.log("Updated weather data");
          return;
        }
        for (var i = 0; i < deviceRefs.length; i++) {
          if (deviceRefs[i].current.device_id === socketData.device_id) {
            deviceRefs[i].current.setIsToggleOn(
              socketData.value === "0" ? false : true
            );
            return;
          }
        }
      }
    };

    websocketConnection.onclose = (ev: any) => {
      console.log(ev);
      websocketConnection.close();
    };

    const requestConfig: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    };

    axios(url, requestConfig)
      .then((res) => {
        const newDeviceElements = [];
        const statusMapping: { [key: number]: boolean } = {
          1: true,
          0: false,
        };
        const deviceTypeMapping: { [key: string]: "Fan" | "Light" } = {
          fan: "Fan",
          light: "Light",
        };
        let newWeatherElements;
        if (!(res.data && res.data.devices && res.data.devices.length)) {
          console.log("Wrong data format.");
          console.log(res);
        }
        for (var i = 0; i < res.data.devices.length; i++) {
          const device = res.data.devices[i];

          const device_type = device.device_type;
          const device_name = device.device_name;
          const device_status = device.status;
          const device_description = device.description || "";
          const device_id = device.device_id;

          if (!(device_type && device_name && device_status && device_id)) {
            console.log("Wrong device data format.");
            console.log(device);
          }

          if (device_type === "fan" || device_type === "light") {
            const deviceRef = React.createRef<HTMLDivElement>();
            deviceRefs.push(deviceRef);
            newDeviceElements.push(
              <Box key={i} margins="mb16">
                <DeviceCard
                  deviceType={deviceTypeMapping[device_type]}
                  deviceName={device_name}
                  deviceDescription={device_description}
                  deviceAutomationInfo="Chế độ hẹn giờ: Tắt"
                  defaultStatus={statusMapping[device_status]}
                  device_id={device_id}
                  ref={deviceRef}
                />
              </Box>
            );
          } else if (device_type === "temperature") {
            setWeatherDeviceId(device.device_id);
            console.log("weatherDeviceId: " + device.device_id);
            const temphumid = device.status.split("-");
            newWeatherElements = (
              <WeatherElement temp={temphumid[0]} humid={temphumid[1]} />
            );
          }
        }
        setDeviceElements(newDeviceElements);
        if (newWeatherElements) {
          setWeatherElements(newWeatherElements);
        }
      })
      .catch((err) => {
        console.log(err);
        fetchError(url);
      });
  }, []);

  const fetchError = (url: string) => {
    console.log("Error fetching url: " + url);
    setDeviceElements(
      <FetchErrorElement message="Không thể tải danh sách thiết bị từ server" />
    );
    setWeatherElements(
      <FetchErrorElement message="Không thể tải dữ liệu nhiệt độ, độ ẩm từ server" />
    );
    setTimeout(createMockData, 0);
  };

  const createMockData = () => {
    const mockDevicesData = (
      <>
        <Box margins="mb32">
          <Text kind="caption">Displaying mock data</Text>
        </Box>
        <FakeDevice seed={0} />
        <FakeDevice seed={1} />
        <FakeDevice seed={2} />
        <FakeDevice seed={3} />
      </>
    );

    const mockWeatherData = (
      <>
        <Box margins="mb16">
          <Text kind="caption">Displaying mock data</Text>
        </Box>
        <WeatherElement humid="68" temp="32" />
      </>
    );
    setDeviceElements(mockDevicesData);
    setWeatherElements(mockWeatherData);
  };
  return (
    <>
      {/* Navbar ----- */}
      {/* ------------- */}
      <Navbar />
      <Box margins="mb32">
        <Divider />
      </Box>

      {/* Welcome ----- */}
      {/* ------------- */}
      <WelcomeMessage timeOfDay={timeOfDay} hour={hour} minute={minute} />
      {/* Weather ----- */}
      {/* ------------- */}
      <Box margins="mb16">
        <Text kind="h3">Thời tiết</Text>
      </Box>
      {weatherElements}
      {/* Devices ----- */}
      {/* ------------- */}
      <Box margins="mb16">
        <Text kind="h3">Thiết bị</Text>
      </Box>
      {deviceElements}
    </>
  );
};

const Divider = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "1.5px",
        backgroundColor: "var(--gray-20)",
      }}
    ></div>
  );
};

const FakeDevice = (props: { seed: 0 | 1 | 2 | 3 }) => {
  const types: ("Fan" | "Light")[] = ["Fan", "Fan", "Light", "Light"];

  const titles = [
    "Quạt trần phòng khách",
    "Quạt phòng ngủ",
    "Đèn hành lang",
    "Đèn phòng ngủ",
  ];
  const descriptions = [
    "Quạt 12BED8",
    "Tầng 2, phòng Long Hải",
    "Tầng 3 - 8G2DE",
    "Tầng 1, phòng bố mẹ",
  ];
  const automateInfos = [
    "Chế độ hẹn giờ: Tắt",
    "Tự động bật trong 2 tiếng 15 phút.",
    "Tự động tắt trong 2 phút.",
    "Chế độ hẹn giờ: Tắt",
  ];
  return (
    <Box margins="mb16">
      <DeviceCard
        deviceType={types[props.seed]}
        deviceName={titles[props.seed]}
        deviceDescription={descriptions[props.seed]}
        deviceAutomationInfo={automateInfos[props.seed]}
        device_id={1}
      />
    </Box>
  );
};

const WeatherElement = (props: { temp: string; humid: string }) => {
  return (
    <>
      <Box>
        <BriefInfo
          main={props.temp + "°C"}
          info="Nhiệt độ trong nhà hiện tại"
        />
      </Box>
      <Box margins="mb32">
        <BriefInfo main={props.humid + "%"} info="Độ ẩm trong nhà hiện tại" />
      </Box>
    </>
  );
};

const Navbar = () => {
  return (
    <Box margins="mb32">
      <InlineIcon iconBackground>
        <Box wid="100" hei="100">
          <Text kind="h3">SmartHome</Text>
        </Box>
        <Button as="div" lhref="/profile" noDecoration>
          <Icon icon="Profile" iconBackground></Icon>
        </Button>
      </InlineIcon>
    </Box>
  );
};

const WelcomeMessage = (props: {
  timeOfDay: string;
  hour: string;
  minute: string;
}) => {
  return (
    <Box align="hcenter">
      <Box>
        <Text
          align="center"
          kind="h3"
          color="gray50"
        >{`Chào ${props.timeOfDay}`}</Text>
        <Text
          align="center"
          kind="h1"
          color="gray100"
        >{`${props.hour}:${props.minute}`}</Text>
      </Box>
    </Box>
  );
};

const FetchErrorElement = (props: { message: string }) => {
  return (
    <Box margins="mb32">
      <InlineIcon>
        <Icon icon="Error" />
        <Box margins="ml16">
          <Text kind="normal">{props.message}</Text>
          <Text kind="normal">Hiển thị mock data trong 3 giây...</Text>
        </Box>
      </InlineIcon>
    </Box>
  );
};
