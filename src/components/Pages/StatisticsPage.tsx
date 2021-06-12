import React, { useState } from "react";
import { Box, Button, TitledPageTemplate, Text, LineGraph, BarGraph } from "..";

export const StatisticsPage = () => {
  const [deviceType, setDeviceType] = useState<"fan" | "light">("light");
  const [timeRange, setTimeRange] = useState<"week" | "month">("month");

  const handleFilterChange = () => {
    // Request to devicetype, timerange
  };

  const deviceTypeText = deviceType == "light" ? "Đèn" : "Quạt";
  const timeRangeText = timeRange == "week" ? "tuần" : "tháng";

  return (
    <TitledPageTemplate title="Thống kê">
      <Box margins="mb32">
        <Box margins="mb16">
          <Text kind="caption">Loại thiết bị</Text>
        </Box>
        <Box display="inlineFlex" margins="mr16">
          <Button
            kind={deviceType == "light" ? "disabled" : "secondary"}
            iconPosition="left"
            iconName={
              deviceType == "light" ? "Square-Ticked-Light" : "Square-Unticked"
            }
            text="Đèn"
            onClick={() => {
              setDeviceType("light");
              handleFilterChange();
            }}
          />
        </Box>

        <Box display="inlineFlex">
          <Button
            kind={deviceType == "fan" ? "disabled" : "secondary"}
            iconPosition="left"
            iconName={
              deviceType == "fan" ? "Square-Ticked-Light" : "Square-Unticked"
            }
            text="Quạt"
            onClick={() => {
              setDeviceType("fan");
              handleFilterChange();
            }}
          />
        </Box>
      </Box>

      <Box margins="mb32">
        <Box margins="mb16">
          <Text kind="caption">Khoảng thời gian</Text>
        </Box>
        <Box display="inlineFlex" margins="mr16">
          <Button
            kind={timeRange == "week" ? "disabled" : "secondary"}
            iconPosition="left"
            iconName={
              timeRange == "week" ? "Square-Ticked-Light" : "Square-Unticked"
            }
            text="Tuần"
            onClick={() => {
              setTimeRange("week");
              handleFilterChange();
            }}
          />
        </Box>

        <Box display="inlineFlex">
          <Button
            kind={timeRange == "month" ? "disabled" : "secondary"}
            iconPosition="left"
            iconName={
              timeRange == "month" ? "Square-Ticked-Light" : "Square-Unticked"
            }
            text="Tháng"
            onClick={() => {
              setTimeRange("month");
              handleFilterChange();
            }}
          />
        </Box>
      </Box>

      <Box margins="mb32">
        <Text kind="normal" color="primary">
          {`Đang hiển thị lịch sử sử dụng ${deviceTypeText} trong 1 ${timeRangeText} qua`}
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
          {`Tổng thời gian sử dụng trong ${timeRangeText} này`}
        </Text>
      </Box>

      <Box margins="mb32">
        <Text kind="h3">Biểu đồ thời gian sử dụng theo ngày</Text>
      </Box>
      <Box margins="mb32">
        <LineGraph />
      </Box>

      <Box margins="mb32">
        <Text kind="h3">Biểu đồ thời gian sử dụng theo đèn</Text>
      </Box>
      <Box margins="mb32">
        <BarGraph />
      </Box>
    </TitledPageTemplate>
  );
};
