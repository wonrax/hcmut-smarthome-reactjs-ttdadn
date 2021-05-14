import React from "react";
import { Icon, Text, DeviceCard, InlineIcon, Box } from "..";

type Homestates = {
  deviceElements: JSX.Element[] | JSX.Element;
};

class HomePage extends React.Component<{}, Homestates> {
  constructor(props: {}) {
    super(props);
    this.state = {
      deviceElements: <Text kind="normal">Đang tải thiết bị...</Text>,
    };
    this.createFakeDevices = this.createFakeDevices.bind(this);
    this.fetchError = this.fetchError.bind(this);
  }

  static date = new Date();

  static timeOfDay: string = (function () {
    const hourTime = HomePage.date.getHours();
    if (hourTime >= 19 || hourTime < 5) return "buổi tối";
    if (hourTime >= 5 || hourTime < 12) return "buổi sáng";
    return "buổi chiều";
  })();
  static userFullName: string = "Hà Huy Long Hải";
  static todate: string = (function () {
    return `${HomePage.date.getDate()} tháng ${
      HomePage.date.getMonth() + 1
    } năm ${HomePage.date.getFullYear()}`;
  })();

  componentDidMount() {
    document.title = "SmartHome";
    const url = "http://localhost:8000/api/@house/devices";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          deviceElements: data.devices.map((device: any, index: number) => (
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
            <Icon icon="Profile" iconBackground></Icon>
          </InlineIcon>
        </Box>
        <Box margins="mb32">
          <Divider />
        </Box>
        {/* Welcome ----- */}
        {/* ------------- */}
        <Box margins="mb16">
          <Text
            kind="normalcap"
            color="gray70"
          >{`Chào ${HomePage.timeOfDay},`}</Text>
          <Text kind="h3">{HomePage.userFullName}</Text>
        </Box>
        <Box margins="mb32">
          <Text kind="normalcap" color="gray70">
            Hôm nay là
          </Text>
          <Text kind="normal">{HomePage.todate}</Text>
        </Box>
        <Box margins="mb32"></Box>
        {/* Weather ----- */}
        {/* ------------- */}
        <Box margins="mb32"></Box>
        {/* Devices ----- */}
        {/* ------------- */}
        <Box margins="mb16">
          <Text kind="h2">Thiết bị</Text>
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
