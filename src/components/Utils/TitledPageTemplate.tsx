import React, { ReactChild } from "react";
import { Box, Text, BackButton, ScrollToTop, InlineIcon } from "..";

export const TitledPageTemplate = (props: {
  children?: ReactChild | ReactChild[];
  title: string;
  scrollToTop?: boolean;
}) => {
  return (
    <>
      {props.scrollToTop && <ScrollToTop />}
      <Box margins="mb32">
        <InlineIcon>
          <Box display="inline">
            <BackButton />
          </Box>
          <Box display="inline" margins="ml16">
            <Text kind="h2">{props.title}</Text>
          </Box>
        </InlineIcon>
      </Box>
      {props.children}
    </>
  );
};
