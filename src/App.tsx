import React from "react";
import { useRoutes } from "hookrouter";
import "./App.css";
import { DeviceCard, Box } from "./components";

const routes = {
  "/": () => <HomePage />,
};

function HomePage() {
  const test = (
    <>
      <Box margins="mb16">
        <DeviceCard
          deviceName="Đèn hành lang tầng 1"
          deviceDescription="TBH123UH"
          deviceAutomationInfo="Tự động tắt trong 3 giờ 12 phút"
        />
      </Box>
      <Box margins="mb16">
        <DeviceCard
          deviceName="Đèn phòng ngủ"
          deviceDescription="TBH124UH"
          deviceAutomationInfo="Tự động bật trong 43 phút"
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
