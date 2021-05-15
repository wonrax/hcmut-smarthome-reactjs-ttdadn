import React from "react";
import { Icon, Box, Text, Button, ScrollToTop } from "..";
import { Link } from "react-router-dom";
import { InlineIcon } from "../InlineIcon";
import { ScheduledTask } from "..";

type states = {
  isScheduleEnabled: boolean;
};
export class DeviceInfoPage extends React.Component<{}, states> {
  constructor(props: {}) {
    super(props);
    this.state = { isScheduleEnabled: false };
    this.toggleScheduleEnabled = this.toggleScheduleEnabled.bind(this);
  }

  componentDidMount() {
    document.title = "Device";
  }
  render() {
    return (
      <>
        <ScrollToTop />
        {/*Container*/}
        <Box margins="mb32">
          <Link to="/">
            <Icon icon="Arrow-Left" iconBackground />
          </Link>
        </Box>
        <Box margins="mb32">
          <Text kind="h2">Thông tin thiết bị</Text>
        </Box>
        <Box margins="mb8">
          <Text kind="normal">Đèn hành lang</Text>
        </Box>
        <Box margins="mb32">
          <Text kind="normal" color="gray70">
            Lầu 2
          </Text>
        </Box>
        <Box margins="mb32">
          <Button kind="secondary">
            <Text kind="normal" textAlign="center" color="primary">
              Xem thống kê sử dụng
            </Text>
          </Button>
        </Box>
        <Box margins="mb8">
          <Text kind="h3">Hẹn giờ</Text>
        </Box>
        <Box margins="mb8">
          <div
            onClick={this.toggleScheduleEnabled}
            style={{ cursor: "pointer" }}
          >
            <InlineIcon>
              <Box wid="100" hei="100" margins="mr16">
                <Text kind="normal">Kích hoạt tính năng hẹn giờ</Text>
              </Box>
              <Icon
                icon={this.state.isScheduleEnabled ? "Toggle-On" : "Toggle-Off"}
              />
            </InlineIcon>
          </div>
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
          <Button>
            <Text kind="normal" textAlign="center" color="white">
              Đặt lịch mới
            </Text>
          </Button>
        </Box>
        <Box>
          <ScheduledTask />
          <ScheduledTask />
          <ScheduledTask />
          <ScheduledTask />
          <ScheduledTask />
          <ScheduledTask />
        </Box>
      </>
    );
  }

  toggleScheduleEnabled = () => {
    this.setState({ isScheduleEnabled: !this.state.isScheduleEnabled });
  };
}
