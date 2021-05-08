import React, { useEffect, useState } from "react";
import { useRoutes } from "hookrouter";
import "./App.css";
import { DeviceCard, Box, Text, InlineIcon, Icon } from "./components";

const routes = {
  "/": () => <HomePage />,
};

function HomePage() {
  const timeOfDay: string = "buổi tối";
  const userFullName: string = "Hà Huy Long Hải";
  const todate: string = "05 tháng 05 năm 2021";
  const [deviceComps, setDeviceComps] = useState<JSX.Element[] | JSX.Element>(
    <Text kind="normal">Đang tải thiết bị...</Text>
  );
  const test = (
    <>
      {/* Navbar ----- */}
      {/* ------------- */}
      <Box margins="mb32">
        <InlineIcon iconBackground>
          <Box>
            <Text kind="h4">Nhà thông minh</Text>
          </Box>
          <Icon icon="Profile" iconBackground></Icon>
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

      {/* Welcome ----- */}
      {/* ------------- */}
      <Box margins="mb32">
        <Text kind="normal">{`Chào ${timeOfDay},`}</Text>
        <Text kind="h2">{userFullName}</Text>
      </Box>
      <Box margins="mb32">
        <Text kind="normal">Hôm nay là</Text>
        <Text kind="h3">{todate}</Text>
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

      {/* Weather ----- */}
      {/* ------------- */}

      <Box margins="mb32">
        <div
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "var(--gray-10)",
          }}
        ></div>
      </Box>

      {/* Devices ----- */}
      {/* ------------- */}
      <Box margins="mb16">
        <Text kind="h3">Thiết bị</Text>
      </Box>
      {deviceComps}
    </>
  );

  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/@house/devices";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setTimeout(() => {
          console.log("heheheheh");
          if (Array.isArray(deviceComps)) {
            const newComps = new Array(
              ...deviceComps.slice(0, deviceComps.length - 1)
            );
            newComps.push(
              <DeviceCard
                deviceType="Fan"
                deviceName="Hehe"
                deviceDescription="?"
                deviceAutomationInfo="Chế độ hẹn giờ: c"
              />
            );
            setDeviceComps(newComps);
          }
        }, 3000);
        setDeviceComps(
          data.devices.map((device: any, index: number) => (
            <Box key={index} margins="mb16">
              <DeviceCard
                deviceType="Fan"
                deviceName={device["device-name"]}
                deviceDescription="FN224"
                deviceAutomationInfo="Chế độ hẹn giờ: Tắt"
              />
            </Box>
          ))
        );
      })
      .catch(function () {
        console.log("Error fetching url: " + url);
        setDeviceComps(
          <Text kind="normal">{`Không thể tải danh sách thiết bị từ server ${url}`}</Text>
        );
      });
  }, []);
  return <div className="SmartHome">{test}</div>;
}

function App() {
  const routeResult = useRoutes(routes);
  return routeResult || <p>Page Not found</p>;
}

export default App;
