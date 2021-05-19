import React from "react";
import { Icon, Text, DeviceCard, InlineIcon, Box, BriefInfo, Button } from "..";
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
      deviceElements: <Text kind="normal">Đang tải thiết bị...</Text>,
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
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    axios(url)
      .then((res) => {
        this.setState({
          deviceElements: res.data.devices.map((device: any, index: number) => (
            <Box key={index} margins="mb16">
              <DeviceCard
                deviceType="Fan"
                deviceName={device["device-name"]}
                deviceDescription="FN224"
                deviceAutomationInfo="Chế độ hẹn giờ: Tắt"
              />
            </Box>
          )),
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
            <Button lhref="/profile" noDecoration>
              <Icon icon="Profile" iconBackground></Icon>
            </Button>
          </InlineIcon>
        </Box>
        <Box margins="mb32">
          <Divider />
        </Box>
        {/* Welcome ----- */}
        {/* ------------- */}
        <Box align="center">
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
    setTimeout(this.createFakeDevices, 0);
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
      />
    </Box>
  );
};

export { HomePage };
