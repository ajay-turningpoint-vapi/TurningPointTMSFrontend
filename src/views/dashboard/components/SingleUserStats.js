import React, { useEffect, useState } from "react";
import DashboardCard from "../../../components/shared/DashboardCard";
import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import {
  Grid,
  Stack,
  Typography,
  Avatar,
  Card,
  CardContent,
  Button,
  Box,
  Modal,
} from "@mui/material";
import { IconArrowUpLeft } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { userStatus } from "../../../actions/userActions";
const SingleUserStats = () => {
    const [stats, setStats] = useState({
      totalTasks: 0,
      completedTasks: 0,
      openTasks: 0,
      inProgressTasks: 0,
      completionRate: 0,
    });
    const { user } = useSelector((state) => state.auth);
  
    useEffect(() => {
      const fetchStats = async () => {
        try {
          const response = await userStatus();
          setStats(response.data.stats);
        } catch (error) {
          console.error("Error fetching stats:", error);
        }
      };
  
      fetchStats();
    }, []);
  
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const successColor = theme.palette.success.main;
    const warningColor = theme.palette.warning.main;
    const infoColor = theme.palette.info.main;
    
    const getChartOptions = (color) => ({
      labels: ["Tasks"],
      colors: [color],
      plotOptions: {
        pie: {
          donut: {
            size: "70%",
          },
        },
      },
      tooltip: {
        y: {
          formatter: (value) => {
            return value === 0 ? '0%' : `${value}%`;
          },
        },
      },
    });
  
    // Custom styles for grid items
    const gridItemStyleBase = {
      borderRadius: "8px",
      padding: "16px",
      backgroundColor: "#FFFFFF",
      margin: "10px",
      boxShadow: "5px 4px 8px #ababab", // Shadow effect
    };
  
    const gridItemStyle1 = {
      ...gridItemStyleBase,
      borderColor: primary,
      maxHeight: "200px",
      maxWidth: "300px",
    };
  
    const gridItemStyle2 = {
      ...gridItemStyleBase,
      backgroundColor: successColor,
      borderColor: successColor,
      maxHeight: "200px",
      maxWidth: "300px",
    };
  
    const gridItemStyle3 = {
      ...gridItemStyleBase,
      backgroundColor: warningColor,
      borderColor: warningColor,
      maxHeight: "200px",
      maxWidth: "300px",
    };
  
    const gridItemStyle4 = {
      ...gridItemStyleBase,
      backgroundColor: infoColor,
      borderColor: infoColor,
      maxHeight: "200px",
      maxWidth: "300px",
    };
  
    return (
      <>
        <DashboardCard title={`${user.userName} Tasks Overview`}>
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sm={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={6} style={{ ...gridItemStyle1 }}>
                  <Typography variant="h3" fontWeight="700">
                    {stats.totalTasks}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={1} alignItems="center">
                    <Avatar sx={{ bgcolor: primary, width: 27, height: 27 }}>
                      <IconArrowUpLeft width={20} color="#FFFFFF" />
                    </Avatar>
                    <Typography
                      variant="subtitle2"
                      fontWeight="600"
                      color="primary"
                    >
                      All Tasks
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6} style={{ ...gridItemStyle2 }}>
                  <Typography variant="h3" fontWeight="700" color="#FFFFFF">
                    {stats.openTasks}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={1} alignItems="center">
                    <Avatar sx={{ bgcolor: successColor, width: 27, height: 27 }}>
                      <IconArrowUpLeft width={20} color="#FFFFFF" />
                    </Avatar>
                    <Typography
                      variant="subtitle2"
                      fontWeight="600"
                      color="#FFFFFF"
                    >
                      All Open Tasks
                    </Typography>
                  </Stack>
                </Grid>
  
                {/* Second row */}
                <Grid item xs={6} style={{ ...gridItemStyle3 }}>
                  <Typography variant="h3" fontWeight="700" color="#FFFFFF">
                    {stats.inProgressTasks}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={1} alignItems="center">
                    <Avatar sx={{ bgcolor: warningColor, width: 27, height: 27 }}>
                      <IconArrowUpLeft width={20} color="#FFFFFF" />
                    </Avatar>
                    <Typography
                      variant="subtitle2"
                      fontWeight="600"
                      color="#FFFFFF"
                    >
                      All In-Progress Tasks
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6} style={{ ...gridItemStyle4 }}>
                  <Typography variant="h3" fontWeight="700" color="#FFFFFF">
                    {stats.completedTasks}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={1} alignItems="center">
                    <Avatar sx={{ bgcolor: infoColor, width: 27, height: 27 }}>
                      <IconArrowUpLeft width={20} color="#FFFFFF" />
                    </Avatar>
                    <Typography
                      variant="subtitle2"
                      fontWeight="600"
                      color="#FFFFFF"
                    >
                      All Completed Tasks
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DashboardCard>
        <DashboardCard title="Task Progress" style={{ marginTop: "10px" }}>
          <Grid container spacing={3} justifyContent="flex-start">
            <Grid item xs={12} sm={6} md={3} style={gridItemStyleBase}>
              <Typography variant="h6" align="center">
                Open Tasks
              </Typography>
              <ReactApexChart
                options={getChartOptions(successColor)}
                series={stats.openTasks ? [stats.openTasks] : [0]}
                type="donut"
                height={300}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} style={gridItemStyleBase}>
              <Typography variant="h6" align="center">
                In Progress Tasks
              </Typography>
              <ReactApexChart
                options={getChartOptions(warningColor)}
                series={stats.inProgressTasks ? [stats.inProgressTasks] : [0]}
                type="donut"
                height={300}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} style={gridItemStyleBase}>
              <Typography variant="h6" align="center">
                Completed Tasks
              </Typography>
              <ReactApexChart
                options={getChartOptions(infoColor)}
                series={stats.completedTasks ? [stats.completedTasks] : [0]}
                type="donut"
                height={300}
              />
            </Grid>
          </Grid>
        </DashboardCard>
      </>
    );
  };
  

export default SingleUserStats;
