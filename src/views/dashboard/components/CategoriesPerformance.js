import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  Stack,
  Box,
  Grid,
} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import {
  IconCircleCheck,
  IconClock,
  IconCircle,
  IconCircleX,
  IconUserFilled,
  IconClockCheck,
  IconCircleLetterT,IconTag
} from "@tabler/icons-react"; // Example icons, adjust as needed

import DashboardCard from "../../../components/shared/DashboardCard";

import { useDispatch, useSelector } from "react-redux";

import { getAllCategoryPerformance } from "../../../actions/dashboardActions";
const DonutChartOptions = {
  chart: {
    type: "donut",
    height: 200, // Adjust height as needed
  },
  labels: ["Completion Rate"],
  colors: ["#4CAF50", "#E0E0E0"], // Green for the filled portion, gray for the unfilled portion
  plotOptions: {
    pie: {
      donut: {
        size: "70%", // Size of the donut
      },
    },
  },
  dataLabels: {
    enabled: false, // Disable data labels inside the chart
  },
  tooltip: {
    y: {
      formatter: (value) => `${value}%`, // Format tooltip value
    },
  },
  legend: {
    show: false, // Hide legend if not needed
  },
};

const ChartWithText = ({ completionRate }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    }}
  >
    <ReactApexChart
      type="donut"
      options={DonutChartOptions}
      series={[completionRate, 100 - completionRate]}
      height={80}
      width={80}
    />
    <span>{completionRate}%</span>
  </Box>
);

const CategoriesPerformance = () => {
  const [usersPerformance, setUsersPerformance] = useState([]);

  useEffect(() => {
    const fetchUsersPerformance = async () => {
      try {
        const response = await getAllCategoryPerformance();
        console.log(response.data);
        setUsersPerformance(response.data);
      } catch (error) {
        alert("Error fetching users performance:", error);
      }
    };

    fetchUsersPerformance();
  }, []);

  return (
    <DashboardCard title="All Categories Performance">
      <Box sx={{ overflow: "auto", width: "100%" }}>
        {usersPerformance &&
          usersPerformance.map((data, index) => {
            return (
              <TableContainer
                component={Paper}
                key={index}
                sx={{ mb: 2, p: 2, backgroundColor: "#F2F6FA" }}
              >
                <Table sx={{ tableLayout: "fixed", width: "100%" }}>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            sx={{
                              bgcolor: "success.main",
                              width: 35,
                              height: 35,
                            }}
                          >
                            <IconTag color="#FFFFFF" />
                          </Avatar>
                          <Typography variant="h6">Category  ({data.category})</Typography>
                          <Box sx={{ flexGrow: 1 }} />
                          <ChartWithText
                            completionRate={data.completionRate}
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            alignItems: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: "primary.main",
                                width: 24,
                                height: 24,
                              }}
                            >
                              <IconCircleLetterT color="#FFFFFF" />
                            </Avatar>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold" }}
                            >
                              Total Tasks: {data.totalTasks}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: "success.main",
                                width: 24,
                                height: 24,
                              }}
                            >
                              <IconCircleCheck color="#FFFFFF" />
                            </Avatar>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold" }}
                            >
                              Completed Tasks: {data.completedTasks}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: "warning.main",
                                width: 24,
                                height: 24,
                              }}
                            >
                              <IconCircle color="#FFFFFF" />
                            </Avatar>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold" }}
                            >
                              In Progress Tasks: {data.inProgressTasks}
                            </Typography>
                          </Box>  <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Avatar
                            sx={{
                              bgcolor: "grey.400",
                              width: 24,
                              height: 24,
                            }}
                          >
                            <IconClockCheck color="#FFFFFF" />
                          </Avatar>
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold" }}
                          >
                            Open Tasks: {data.openTasks}
                          </Typography>
                        </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: "info.main",
                                width: 24,
                                height: 24,
                              }}
                            >
                              <IconClock color="#FFFFFF" />
                            </Avatar>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold" }}
                            >
                              On Time Tasks: {data.onTimeTasks}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: "error.main",
                                width: 24,
                                height: 24,
                              }}
                            >
                              <IconCircleX color="#FFFFFF" />
                            </Avatar>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold" }}
                            >
                              Delayed Tasks: {data.delayedTasks}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: "grey.500",
                                width: 24,
                                height: 24,
                              }}
                            >
                              <IconClock color="#FFFFFF" />
                            </Avatar>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: "bold" }}
                            >
                              Overdue Tasks: {data.overdueTasks}
                            </Typography>
                          </Box>
                        
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            );
          })}
      </Box>
    </DashboardCard>
  );
};
export default CategoriesPerformance;
