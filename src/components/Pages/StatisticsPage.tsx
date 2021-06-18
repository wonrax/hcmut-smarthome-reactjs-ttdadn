import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  Box,
  Button,
  TitledPageTemplate,
  Text,
  LineGraph,
  BarGraph,
  InlineLoading,
  InlineIcon,
  Icon,
} from "..";
import { baseURL } from "../api";

type DeviceTypeType = "fan" | "light";
type TimeRangeType = "week" | "month";

export const StatisticsPage = (props: {
  defaultDeviceType?: DeviceTypeType;
  defaultTimeRange?: TimeRangeType;
}) => {
  const location = useLocation();
  const state = location.state as { defaultDeviceType?: DeviceTypeType };
  const [deviceType, setDeviceType] = useState<DeviceTypeType>(
    state?.defaultDeviceType || "light"
  );
  const [timeRange, setTimeRange] = useState<TimeRangeType>(
    props.defaultTimeRange || "week"
  );

  const handleFilterChange = () => {
    // Request to devicetype, timerange
  };

  return (
    <TitledPageTemplate title="Thống kê">
      <Box margins="mb32">
        <Box margins="mb16">
          <Text kind="caption">Loại thiết bị</Text>
        </Box>
        <Box display="inlineFlex" margins="mr16">
          <Button
            kind={deviceType === "light" ? "disabled" : "secondary"}
            iconPosition="left"
            iconName={
              deviceType === "light" ? "Square-Ticked" : "Square-Unticked"
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
            kind={deviceType === "fan" ? "disabled" : "secondary"}
            iconPosition="left"
            iconName={
              deviceType === "fan" ? "Square-Ticked" : "Square-Unticked"
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
            kind={timeRange === "week" ? "disabled" : "secondary"}
            iconPosition="left"
            iconName={
              timeRange === "week" ? "Square-Ticked" : "Square-Unticked"
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
            kind={timeRange === "month" ? "disabled" : "secondary"}
            iconPosition="left"
            iconName={
              timeRange === "month" ? "Square-Ticked" : "Square-Unticked"
            }
            text="Tháng"
            onClick={() => {
              setTimeRange("month");
              handleFilterChange();
            }}
          />
        </Box>
      </Box>
      <StatisticsData deviceType={deviceType} timeRange={timeRange} />
    </TitledPageTemplate>
  );
};

const requestConfig: AxiosRequestConfig = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
};

const StatisticsData = (props: {
  deviceType: DeviceTypeType;
  timeRange: "month" | "week";
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deviceType, setDeviceType] = useState<DeviceTypeType>(
    props.deviceType
  );
  const [error, setError] = useState<JSX.Element>();
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    setIsLoading(true);
    setDeviceType(props.deviceType);
    requestConfig["method"] = "GET";
    requestConfig["params"] = {
      "device-type": props.deviceType,
      range: props.timeRange,
    };
    axios(baseURL + "/statistics", requestConfig)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(
          <Text kind="normal" color="danger">
            {e}
          </Text>
        );
        setIsLoading(false);
      });
    return () => {
      setIsLoading(true);
    };
  }, [props.deviceType, props.timeRange]);

  if (isLoading)
    return <InlineLoading kind="loading" message="Đang tải dữ liệu..." />;
  if (error) return error;

  const deviceTypeText = deviceType === "light" ? "Đèn" : "Quạt";
  const timeRangeText = props.timeRange === "week" ? "tuần" : "tháng";

  const { data_points, day_average, total, device_usage } = data[deviceType];
  const day_average_rounded = day_average.toFixed(1);
  const total_rounded = total.toFixed(1);

  return (
    <>
      <Box margins="mb32">
        <Text kind="normal" color="primary">
          {`Đang hiển thị lịch sử sử dụng ${deviceTypeText} trong 1 ${timeRangeText} qua`}
        </Text>
      </Box>

      <Box margins="mb32">
        <Text kind="h2">{`${day_average_rounded} giờ`}</Text>
        <Text kind="normal" color="gray70">
          Thời gian sử dụng trung bình trong một ngày
        </Text>
      </Box>

      <Box margins="mb32">
        <Text kind="h2">{`${total_rounded} giờ`}</Text>
        <Text kind="normal" color="gray70">
          {`Tổng thời gian sử dụng trong ${timeRangeText} này`}
        </Text>
      </Box>

      <Box margins="mb32">
        <Text kind="h3">Biểu đồ thời gian sử dụng theo ngày</Text>
      </Box>
      <Box margins="mb32">
        <LineGraph data={data_points} />
      </Box>

      <Box margins="mb32">
        <Text kind="h3">Biểu đồ thời gian sử dụng theo đèn</Text>
      </Box>
      <Box>
        <BarGraph data={device_usage} range={props.timeRange} />
      </Box>
      <Box margins="mb16">
        <Text kind="h3">Phân tích lưu lượng sử dụng</Text>
        <Text kind="normal" color="gray70">
          Sử dụng trí tuệ nhân tạo
        </Text>
      </Box>
      <Box>
        {device_usage.map((device: any) => (
          <AnalyzerInfoBox
            key={device.device_name + Date().toString()}
            device_name={device.device_name}
            isOveruse={device.isOverUsed}
          />
        ))}
      </Box>
    </>
  );
};

const AnalyzerInfoBox = (props: {
  device_name: string;
  isOveruse: boolean;
}) => {
  const styles: React.CSSProperties = {
    padding: "16px",
    backgroundColor: props.isOveruse ? "#FFE2E2" : "#DBF8D7",
    borderRadius: "8px",
    marginBottom: "16px",
  };
  return (
    <div style={styles}>
      <InlineIcon>
        <Icon
          icon="Info-Circle"
          color={props.isOveruse ? "danger" : "success"}
        />
        <Box margins="ml16">
          <Text kind="h4">{props.device_name}</Text>
          <Text kind="normal" color={props.isOveruse ? "danger" : "success"}>
            {props.isOveruse
              ? "Đang được sử dụng nhiều hơn bình thường"
              : "Đang được sử dụng ở mức độ phù hợp"}
          </Text>
        </Box>
      </InlineIcon>
    </div>
  );
};
