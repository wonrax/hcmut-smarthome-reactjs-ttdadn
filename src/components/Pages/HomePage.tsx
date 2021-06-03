import React from "react";
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
import axios from "axios";

type Homestates = {
  deviceElements: JSX.Element[] | JSX.Element;
  weatherElements: JSX.Element[] | JSX.Element | undefined;
};

const websocketConnection = new WebSocket(websocketURL);
class HomePage extends React.Component<{}, Homestates> {
  date: Date;
  hour: string;
  minute: string;
  second: string;
  timeOfDay: string;
  deviceRefs: React.RefObject<any>[];

  constructor(props: {}) {
    super(props);
    this.deviceRefs = [];
    this.state = {
      deviceElements: (
        <Box margins="mb16">
          <InlineLoading
            message="Đang tải danh sách thiết bị..."
            kind="loading"
          />
        </Box>
      ),
      weatherElements: (
        <Box margins="mb16">
          <InlineLoading
            message="Đang tải thông tin cảm biến..."
            kind="loading"
          />
        </Box>
      ),
    };
    this.createMockData = this.createMockData.bind(this);
    this.fetchError = this.fetchError.bind(this);
    this.date = new Date();
    [this.hour, this.minute, this.second] = this.date
      .toLocaleTimeString("vi-VN")
      .split(/:| /);

    this.timeOfDay = function (this: HomePage) {
      const hourTime = this.date.getHours();
      if (hourTime >= 19 && hourTime < 5) return "buổi tối";
      if (hourTime >= 5 && hourTime < 12) return "buổi sáng";
      return "buổi chiều";
    }.bind(this)();
  }

  componentDidMount() {
    document.title = "SmartHome";
    const url = baseURL + "/@" + testUser + "/devices";
    const deviceTypeMapping: { [key: string]: "Fan" | "Light" } = {
      fan: "Fan",
      light: "Light",
    };
    const statusMapping: { [key: number]: boolean } = {
      1: true,
      0: false,
    };
    websocketConnection.onopen = () => {
      console.log("WebSocket connected");
    };
    websocketConnection.onmessage = (message: any) => {
      const socketData = JSON.parse(message.data)["message"];
      console.log(socketData);
      if (socketData) {
        for (var i = 0; i < this.deviceRefs.length; i++) {
          if (this.deviceRefs[i].current.device_id === socketData.device_id) {
            this.deviceRefs[i].current.setIsToggleOn(
              socketData.value === "1" ? true : false
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
    axios(url)
      .then((res) => {
        console.log(res.data);
        const deviceElements = [];
        let weatherElements;
        for (var i = 0; i < res.data.devices.length; i++) {
          const device = res.data.devices[i];
          const device_type = device.device_type;
          if (device_type === "fan" || device_type === "light") {
            const deviceRef = React.createRef<HTMLDivElement>();
            this.deviceRefs.push(deviceRef);
            deviceElements.push(
              <Box key={i} margins="mb16">
                <DeviceCard
                  deviceType={deviceTypeMapping[device_type]}
                  deviceName={device.device_name}
                  deviceDescription={device.description}
                  deviceAutomationInfo="Chế độ hẹn giờ: Tắt"
                  defaultStatus={statusMapping[device.status]}
                  device_id={device["device_id"]}
                  ref={deviceRef}
                />
              </Box>
            );
          } else if (device_type === "temperature") {
            const temphumid = device.status.split("-");
            weatherElements = (
              <>
                <Box>
                  <BriefInfo
                    main={temphumid[0] + "°C"}
                    info="Nhiệt độ trong nhà hiện tại"
                  />
                </Box>
                <Box margins="mb32">
                  <BriefInfo
                    main={temphumid[1] + "%"}
                    info="Độ ẩm trong nhà hiện tại"
                  />
                </Box>
              </>
            );
          }
        }
        this.setState({
          deviceElements: deviceElements,
          weatherElements: weatherElements,
        });
      })
      .catch((err) => {
        console.log(err);
        this.fetchError(url);
      });
  }

  componentWillUnmount() {
    // console.log("WebSocket closing connection");
    // websocketConnection.close(1000);
  }

  render() {
    return (
      <>
        {/* Navbar ----- */}
        {/* ------------- */}
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
        <Box margins="mb32">
          <Divider />
        </Box>
        {/* Welcome ----- */}
        {/* ------------- */}
        <Box align="hcenter">
          <Box>
            <Text
              align="center"
              kind="h3"
              color="gray50"
            >{`Chào ${this.timeOfDay}`}</Text>
            <Text
              align="center"
              kind="h1"
              color="gray100"
            >{`${this.hour}:${this.minute}`}</Text>
          </Box>
        </Box>
        {/* Weather ----- */}
        {/* ------------- */}
        <Box margins="mb16">
          <Text kind="h3">Thời tiết</Text>
        </Box>
        {this.state.weatherElements}
        {/* Devices ----- */}
        {/* ------------- */}
        <Box margins="mb16">
          <Text kind="h3">Thiết bị</Text>
        </Box>
        {this.state.deviceElements}
      </>
    );
  }

  createMockData() {
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
        <Box>
          <BriefInfo main="27°C" info="Nhiệt độ trong nhà hiện tại" />
        </Box>
        <Box margins="mb32">
          <BriefInfo main="68%" info="Độ ẩm trong nhà hiện tại" />
        </Box>
      </>
    );
    this.setState({
      deviceElements: mockDevicesData,
      weatherElements: mockWeatherData,
    });
  }

  fetchError(url: string) {
    console.log("Error fetching url: " + url);
    this.setState({
      deviceElements: (
        <InlineIcon>
          <Icon icon="Error" />
          <Box margins="ml16">
            <Text kind="normal">
              {`Không thể tải danh sách thiết bị từ server`}
            </Text>
            <Text kind="normal">Hiển thị mock data trong 3 giây...</Text>
          </Box>
        </InlineIcon>
      ),
      weatherElements: (
        <Box margins="mb32">
          <InlineIcon>
            <Icon icon="Error" />
            <Box margins="ml16">
              <Text kind="normal">
                {`Không thể tải dữ liệu nhiệt độ, độ ẩm từ server`}
              </Text>
              <Text kind="normal">Hiển thị mock data trong 3 giây...</Text>
            </Box>
          </InlineIcon>
        </Box>
      ),
    });
    setTimeout(this.createMockData, 3000);
  }
}

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

export { HomePage };
