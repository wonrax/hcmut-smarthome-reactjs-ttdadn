import React from "react";
import "./App.css";
import "./components/Colors.module.css";
import { DeviceCard, Box } from "./components";

function App() {
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

export default App;
