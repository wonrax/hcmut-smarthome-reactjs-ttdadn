import React from "react";
import { Box, Button, TitledPageTemplate, Text } from "..";

export const StatisticsPage = () => {
  return (
    <TitledPageTemplate title="Thống kê">
      <Box margins="mb32">
        <Box display="inlineFlex" margins="mr16">
          <Button
            kind="secondary"
            iconPosition="right"
            iconName="Arrow-Down"
            text="Đèn"
          />
        </Box>

        <Box display="inlineFlex">
          <Button
            kind="secondary"
            iconPosition="right"
            iconName="Arrow-Down"
            text="7 ngày"
          />
        </Box>
      </Box>

      <Box margins="mb32">
        <Box display="inline" margins="mr4">
          <Text kind="normal" color="gray70" display="inline">
            Đang hiển thị lịch sử sử dụng
          </Text>
        </Box>
        <Box display="inline" margins="mr4">
          <Text kind="normal" display="inline">
            Đèn
          </Text>
        </Box>
        <Text kind="normal" color="gray70" display="inline">
          trong 7 ngày qua
        </Text>
      </Box>

      <Box margins="mb32">
        <Text kind="h2">17,2 giờ</Text>
        <Text kind="normal" color="gray70">
          Thời gian sử dụng trung bình trong một ngày
        </Text>
      </Box>

      <Box margins="mb32">
        <Text kind="h2">292,4 giờ</Text>
        <Text kind="normal" color="gray70">
          Thời gian sử dụng trong tháng này
        </Text>
      </Box>
    </TitledPageTemplate>
  );
};
