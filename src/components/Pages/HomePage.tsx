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
import axios from "axios";

type Homestates = {
  deviceElements: JSX.Element[] | JSX.Element;
};

class HomePage extends React.Component<{}, Homestates> {
  date: Date;
  hour: string;
  minute: string;
  second: string;
  timeOfDay: string;
  userFullName: string;

  constructor(props: {}) {
    super(props);
    this.state = {
      deviceElements: (
        <InlineLoading
          loadingMessage="Đang tải danh sách thiết bị..."
          kind="loading"
        />
      ),
    };
    this.createFakeDevices = this.createFakeDevices.bind(this);
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
    this.userFullName = "Hà Huy Long Hải";
  }

  componentDidMount() {
    document.title = "SmartHome";
    const url = "http://10.228.11.249:8000/api/@0789123456/devices";
    const deviceTypeMapping: { [key: string]: "Fan" | "Light" } = {
      fan: "Fan",
      light: "Light",
    };
    const statusMapping: { [key: string]: boolean } = {
      ON: true,
      OFF: false,
    };
    axios(url)
      .then((res) => {
        this.setState({
          deviceElements: res.data.devices.map((device: any, index: number) => {
            if (device.device_type === "fan" || device.device_type === "light")
              return (
                <Box key={index} margins="mb16">
                  <DeviceCard
                    deviceType={deviceTypeMapping[device.device_type]}
                    deviceName={device.device_name}
                    deviceDescription={device.description}
                    deviceAutomationInfo="Chế độ hẹn giờ: Tắt"
                    defaultStatus={statusMapping[device.status]}
                    device_id={device["device-id"]}
                  />
                </Box>
              );
            return "";
          }),
        });
      })
      .catch((err) => {
        console.log(err);
        this.fetchError(url);
      });
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
        <Box>
          <BriefInfo main="27°C" info="Nhiệt độ trong nhà hiện tại" />
        </Box>
        <Box margins="mb32">
          <BriefInfo main="68%" info="Độ ẩm trong nhà hiện tại" />
        </Box>
        {/* Devices ----- */}
        {/* ------------- */}
        <Box margins="mb16">
          <Text kind="h3">Thiết bị</Text>
        </Box>
        {this.state.deviceElements}
      </>
    );
  }

  createFakeDevices() {
    const fakeData = (
      <>
        <FakeDevice seed={0} />
        <FakeDevice seed={1} />
        <FakeDevice seed={2} />
        <FakeDevice seed={3} />
      </>
    );
    this.setState({
      deviceElements: fakeData,
    });
  }

  fetchError(url: string) {
    console.log("Error fetching url: " + url);
    this.setState({
      deviceElements: (
        <Text kind="normal">{`Không thể tải danh sách thiết bị từ server ${url}`}</Text>
      ),
    });
    this.createFakeDevices();
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
