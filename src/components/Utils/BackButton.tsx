import React from "react";
import { Button, Icon } from "..";

export const BackButton = () => {
  const moveBack = () => {
    window.history.back();
  };
  return (
    <Button onClick={moveBack} noDecoration>
      <Icon icon="Arrow-Left" iconBackground />
    </Button>
  );
};
