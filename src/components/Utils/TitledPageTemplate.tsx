import React, { ReactChild } from "react";
import { Box, Text, BackButton, ScrollToTop } from "..";

export const TitledPageTemplate = (props: {
  children?: ReactChild | ReactChild[];
  title: string;
  scrollToTop?: boolean;
}) => {
  return (
    <>
      {props.scrollToTop && <ScrollToTop />}
      <Box margins="mb32">
        <BackButton />
      </Box>
      <Box margins="mb32">
        <Text kind="h2">{props.title}</Text>
      </Box>
      {props.children}
    </>
  );
};
