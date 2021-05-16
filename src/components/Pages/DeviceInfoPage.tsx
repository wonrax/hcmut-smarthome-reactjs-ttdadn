import React from "react";
import { Icon, Box, Text, Button } from "..";
import { InlineIcon } from "../InlineIcon";
import { ScheduledTask } from "..";
import { TitledPageTemplate } from "../Utils";

type stateTypes = {
  isScheduleEnabled: boolean;
};
export class DeviceInfoPage extends React.Component<{}, stateTypes> {
  constructor(props: {}) {
    super(props);
    this.state = { isScheduleEnabled: false };
  }

  componentDidMount() {
    document.title = "Device";
  }
  render() {
    return (
      <TitledPageTemplate title="Thông tin thiết bị" scrollToTop>
        {/*Container*/}
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
          <button
            onClick={this.toggleScheduleEnabled}
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
              <Icon
                icon={this.state.isScheduleEnabled ? "Toggle-On" : "Toggle-Off"}
              />
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
          <Button>
            <Text kind="normal" textAlign="center" color="white">
              Đặt lịch mới
            </Text>
          </Button>
        </Box>
        <Box>
          <ScheduledTask id="1" />
          <ScheduledTask id="2" />
          <ScheduledTask id="3" />
        </Box>
      </TitledPageTemplate>
    );
  }

  toggleScheduleEnabled = () => {
    this.setState({ isScheduleEnabled: !this.state.isScheduleEnabled });
  };
}
