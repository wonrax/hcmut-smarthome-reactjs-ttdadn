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
    return `Ngày ${HomePage.date.getDate()} tháng ${
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
            <Box wid="width100" hei="height100">
              <Text kind="h4">Nhà thông minh</Text>
            </Box>
            <Icon icon="Profile" iconBackground></Icon>
          </InlineIcon>
        </Box>
        <Box margins="mb32">
          <Divider />
        </Box>
        {/* Welcome ----- */}
        {/* ------------- */}
        <Box margins="mb32">
          <Text kind="normal">{`Chào ${HomePage.timeOfDay},`}</Text>
          <Text kind="h2">{HomePage.userFullName}</Text>
        </Box>
        <Box margins="mb32">
          <Text kind="normal">Hôm nay là</Text>
          <Text kind="h3">{HomePage.todate}</Text>
        </Box>
        <Box margins="mb32">
          <Divider />
        </Box>
        {/* Weather ----- */}
        {/* ------------- */}
        <Box margins="mb32">
          <Divider />
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

  fetchError(url: string) {
    console.log("Error fetching url: " + url);
    this.setState({
      deviceElements: (
        <Text kind="normal">{`Không thể tải danh sách thiết bị từ server ${url}`}</Text>
      ),
    });
  }
}

const Divider = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "var(--border-width)",
        backgroundColor: "var(--gray-10)",
      }}
    ></div>
  );
};

export { HomePage };
