import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useTheme } from "@mui/material/styles";
import {
  Grid,
  Stack,
  Typography,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import { IconArrowUpLeft } from "@tabler/icons-react";

import DashboardCard from "../../../components/shared/DashboardCard";
import { getAllUsersPerformance } from "../../../actions/dashboardActions";

const UsersPerformance = () => {
  const [usersPerformance, setUsersPerformance] = useState([]);

  useEffect(() => {
    const fetchUsersPerformance = async () => {
      try {
        const response = await getAllUsersPerformance();
        setUsersPerformance(response.allUsersPerformance);
      } catch (error) {
        console.error('Error fetching users performance:', error);
      }
    };

    fetchUsersPerformance();
  }, []);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const successColor = theme.palette.success.main;
  const warningColor = theme.palette.warning.main;
  const infoColor = theme.palette.info.main;

  const getUserChartOptions = (user) => ({
    labels: ['Total Tasks', 'Completed Tasks', 'Open Tasks', 'In Progress Tasks'],
    colors: [primary, successColor, warningColor, infoColor],
    legend: {
      show: true,
      position: 'bottom',
    },
  });

  const getUserChartData = (user) => [
    user.stats.totalTasks,
    user.stats.completedTasks,
    user.stats.openTasks,
    user.stats.inProgressTasks,
  ];

  return (
    <DashboardCard title="All Users Performance">
      <Grid container spacing={3}>
        {usersPerformance.map((user, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="700" align="center">
                  {user.userName}
                </Typography>
                <ReactApexChart
                  type="donut"
                  options={getUserChartOptions(user)}
                  series={getUserChartData(user)}
                  height={250}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </DashboardCard>
  );
};


export default UsersPerformance;
