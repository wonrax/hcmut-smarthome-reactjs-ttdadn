import React from "react";
import { useRoutes } from "hookrouter";
import "./App.css";
import { DeviceCard, Box, Text, InlineIcon } from "./components";

const routes = {
  "/": () => <HomePage />,
};

function HomePage() {
  const timeOfDay: string = "buổi tối";
  const userFullName: string = "Hà Huy Long Hải";
  const todate: string = "05 tháng 05 năm 2021";
  const test = (
    <>
      <Box margins="mb32">
        <InlineIcon iconRight="Profile" iconBackground>
          <Box>
            <Text kind="h4">Nhà thông minh</Text>
          </Box>
        </InlineIcon>
      </Box>
      <Box margins="mb32">
        <div
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "var(--gray-10)",
          }}
        ></div>
      </Box>
      <Box margins="mb32">
        <Text kind="normal">{`Chào ${timeOfDay},`}</Text>
        <Text kind="h2">{userFullName}</Text>
      </Box>
      <Box margins="mb32">
        <Text kind="normal">Hôm nay là</Text>
        <Text kind="h3">{todate}</Text>
      </Box>
      <Box margins="mb16">
        <Text kind="h3">Thiết bị</Text>
      </Box>
      <Box margins="mb16">
        <DeviceCard
          deviceType="Light"
          deviceName="Đèn hành lang tầng 1"
          deviceDescription="TBH123UH"
          deviceAutomationInfo="Tự động tắt trong 3 giờ 12 phút"
        />
      </Box>
      <Box margins="mb16">
        <DeviceCard
          deviceType="Light"
          deviceName="Đèn phòng ngủ"
          deviceDescription="TBH124UH"
          deviceAutomationInfo="Tự động bật trong 43 phút"
        />
      </Box>
      <Box margins="mb16">
        <DeviceCard
          deviceType="Fan"
          deviceName="Quạt trần phòng khách"
          deviceDescription="FN224"
          deviceAutomationInfo="Chế độ hẹn giờ: Tắt"
        />
      </Box>
    </>
  );
  return <div className="SmartHome">{test}</div>;
}

function App() {
  const routeResult = useRoutes(routes);
  return routeResult || <p>Not found</p>;
}

export default App;
