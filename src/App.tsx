import React from "react";
import "./App.css";
import "./components/Colors.module.css";
import { DeviceCard } from "./components";

function App() {
  return (
    <div className="SmartHome">
      <DeviceCard></DeviceCard>
      <div style={{ height: "16px" }}></div>
      <DeviceCard></DeviceCard>
      <div style={{ height: "16px" }}></div>
      <DeviceCard></DeviceCard>
      <div style={{ height: "16px" }}></div>
      <DeviceCard></DeviceCard>
      <div style={{ height: "16px" }}></div>
      <DeviceCard></DeviceCard>
    </div>
  );
}

export default App;
