import React from "react";
import { Icon, Box } from "..";
import { Link } from "react-router-dom";

export const DeviceInfoPage = () => {
  return (
    <Box paddings={["pt32", "pb32", "pl16", "pr16"]}>
      <Link to="/">
        <Icon icon="Arrow-Left" iconBackground />
      </Link>
    </Box>
  );
};
