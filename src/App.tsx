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
  const [deviceComps, setDeviceComps] = useState<JSX.Element[] | JSX.Element>();
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
    const url = "http://10.228.11.249:8000/api/demo/house/12/devices";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        var comps: Array<JSX.Element> = [];
        for (let i = 0; i < data?.length; i++) {
          comps.push(
            <Box key={i} margins="mb16">
              <DeviceCard
                deviceType="Fan"
                deviceName={data.devices[i]["device-name"]}
                deviceDescription="FN224"
                deviceAutomationInfo="Chế độ hẹn giờ: Tắt"
              />
            </Box>
          );
        }
        setDeviceComps(comps);
      })
      .catch(function () {
        console.log("Error fetching url: " + url);
        setDeviceComps(
          <Text kind="normal">{`Error fetching url ${url}`}</Text>
        );
      });
  }, []);
  return <div className="SmartHome">{test}</div>;
}

function App() {
  const routeResult = useRoutes(routes);
  return routeResult || <p>Not found</p>;
}

export default App;
