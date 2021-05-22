import React from "react";
import "./App.css";
import {
  HomePage,
  Box,
  DeviceInfoPage,
  LoginPage,
  ProfilePage,
} from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="SmartHome">
        <div className="container">
          <Box paddings={["pt64", "pb64", "pl16", "pr16"]}>
            <Switch>
              <Route path="/profile">
                <ProfilePage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/devices/:device_id">
                <DeviceInfoPage />
              </Route>
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </Box>
        </div>
      </div>
    </Router>
  );
}

export default App;
