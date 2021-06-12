import React from "react";
import "./App.css";
import {
  HomePage,
  Box,
  DeviceInfoPage,
  LoginPage,
  ProfilePage,
  StatisticsPage,
} from "./components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="SmartHome">
        <div className="container">
          <Box paddings={["pt64", "pb64", "pl16", "pr16"]}>
            <Switch>
              <AuthRoute Component={ProfilePage} path="/profile" />
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/statistics">
                <StatisticsPage />
              </Route>
              <AuthRoute
                Component={DeviceInfoPage}
                path="/devices/:device_id"
              />
              <AuthRoute Component={HomePage} path="/" />
            </Switch>
          </Box>
        </div>
      </div>
    </Router>
  );
}

interface Props {
  Component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
}

const AuthRoute = ({ Component, path, exact = false }: Props): JSX.Element => {
  const isAuthed = !!localStorage.getItem("access_token");
  const message = "Please log in to view this page";
  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps) =>
        isAuthed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                message,
                requestedPath: path,
              },
            }}
          />
        )
      }
    />
  );
};

export default App;
