import React, { useEffect, useRef, useState } from "react";
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
import { baseURL, websocketURL } from "../api";
import axios, { AxiosRequestConfig } from "axios";
import { useHistory } from "react-router";

export const HomePage = () => {
  const websocketConnection = useRef<WebSocket | null>(null);
  const history = useHistory();
  const date: Date = new Date();
  const [hour, minute] = date.toLocaleTimeString("vi-VN").split(/:| /);
  const timeOfDay = (function () {
    const hourTime = date.getHours();
    if (hourTime >= 19 || hourTime < 5) return "buổi tối";
    if (hourTime >= 5 && hourTime < 12) return "buổi sáng";
    return "buổi chiều";
  })();
  const deviceRefs = useRef<React.RefObject<any | null>[]>([]);
  const weatherDeviceId = useRef<string>("");

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

  const isMounted = useIsMounted();

  // WEBSOCKET useEffect
  //////////////////////
  useEffect(() => {
    if (websocketConnection.current) return;
    document.title = "SmartHome";

    websocketConnection.current = new WebSocket(websocketURL);

    websocketConnection.current.onopen = () => {
      console.log("WebSocket connected");
    };

    websocketConnection.current.onmessage = (message: any) => {
      if (!message.data || !isMounted.current) {
        return;
      }
      const socketData = JSON.parse(message.data)["message"];
      console.log(socketData);
      if (socketData && socketData.device_id && socketData.value) {
        if (socketData.device_id === weatherDeviceId.current) {
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
        for (var i = 0; i < deviceRefs.current.length; i++) {
          if (
            deviceRefs.current[i].current?.device_id === socketData.device_id
          ) {
            deviceRefs.current[i].current.setIsToggleOn(
              socketData.value === "0" ? false : true
            );
            return;
          }
        }
      }
    };

    websocketConnection.current.onclose = (ev: any) => {
      console.log(ev);
      websocketConnection.current?.close();
    };

    return () => {
      websocketConnection.current?.close();
    };
  }, [isMounted]);

  //FETCH API useEffect
  /////////////////////
  useEffect(() => {
    const url = baseURL + "/@" + localStorage.getItem("username") + "/devices";
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
          const automation_mode = device.automation_mode;

          const autoModeMapping: { [key: number]: string } = {
            0: "Tắt",
            1: "Hẹn giờ",
            2:
              "Tự động bật khi " +
              `${device_type === "light" ? "trời tối" : "nhiệt độ cao"}`,
          };

          if (!(device_type && device_name && device_status && device_id)) {
            console.log("Wrong device data format.");
            console.log(device);
          }

          if (device_type === "fan" || device_type === "light") {
            const deviceRef = React.createRef<HTMLDivElement>();
            deviceRefs.current.push(deviceRef);
            newDeviceElements.push(
              <Box key={i} margins="mb16">
                <DeviceCard
                  deviceType={deviceTypeMapping[device_type]}
                  deviceName={device_name}
                  deviceDescription={device_description}
                  deviceAutomationInfo={`Chế độ tự động: ${autoModeMapping[automation_mode]}`}
                  defaultStatus={statusMapping[device_status]}
                  device_id={device_id}
                  ref={deviceRef}
                />
              </Box>
            );
          } else if (device_type === "temperature") {
            weatherDeviceId.current = device.device_id;
            console.log("weatherDeviceId: " + device.device_id);
            const temphumid = device.status.split("-");
            newWeatherElements = (
              <WeatherElement temp={temphumid[0]} humid={temphumid[1]} />
            );
          }
        }
        if (!isMounted.current) return;
        setDeviceElements(newDeviceElements);
        if (newWeatherElements) {
          setWeatherElements(newWeatherElements);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("access_token");
          history.push("/login");
        }
        fetchError(url);
      });

    const fetchError = (url: string) => {
      console.log("Error fetching url: " + url);
      if (!isMounted.current) return;
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

      if (!isMounted.current) return;

      setDeviceElements(mockDevicesData);
      setWeatherElements(mockWeatherData);
    };
  }, [history, isMounted]);

  return (
    <>
      {/* Navbar ----- */}
      {/* ------------- */}
      <Navbar />
      <Box margins="mb32"></Box>

      {/* Welcome ----- */}
      {/* ------------- */}
      <Box margins="mb32">
        <WelcomeMessage timeOfDay={timeOfDay} hour={hour} minute={minute} />
      </Box>
      {/* Weather ----- */}
      {/* ------------- */}
      {weatherElements}
      {/* Devices ----- */}
      {/* ------------- */}
      <Box margins="mb16">
        <Text kind="h2">Thiết bị</Text>
      </Box>
      {deviceElements}
    </>
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
      <Box display="inlineFlex" wid="100" margins="mb32">
        <BriefInfo main={props.temp + "°C"} info="Nhiệt độ" />
        <BriefInfo main={props.humid + "%"} info="Độ ẩm" marginLeft />
      </Box>
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

const Navbar = () => {
  return (
    <Box margins="mb32">
      <InlineIcon iconBackground>
        <Box wid="100" hei="100">
          <Text kind="h3" color="primary">
            SmartHome
          </Text>
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

//TODO Turn this into a module
function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}
