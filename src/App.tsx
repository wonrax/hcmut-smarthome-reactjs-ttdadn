import React from "react";
import "./App.css";
import "./components/Colors.module.css";
import { DeviceCard, Box } from "./components";

function App() {
  const test = new Array(4).fill(undefined).map(() => (
    <Box margins="mb16">
      <DeviceCard />
    </Box>
  ));
  return <div className="SmartHome">{test}</div>;
}

export default App;
