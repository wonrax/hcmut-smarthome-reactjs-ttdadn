import React, { ReactChild } from "react";

export const Box = (props: { children: ReactChild }) => {
  return <div>{props.children}</div>;
};
