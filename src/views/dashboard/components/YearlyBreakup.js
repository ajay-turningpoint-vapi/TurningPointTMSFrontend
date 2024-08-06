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
  Button,
  Box,
  Modal,
} from "@mui/material";
import {
  IconArrowUpLeft,
  IconUsers,
  IconClock,
  IconClockX,
  IconClockCheck,
} from "@tabler/icons-react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import DashboardCard from "../../../components/shared/DashboardCard";
import { getAllUsersPerformance } from "../../../actions/dashboardActions";
import { NavLink, useNavigate } from "react-router-dom";

const YearlyBreakup = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    openTasks: 0,
    inProgressTasks: 0,
    completionRate: 0,
    overdueTasks: 0,
    onTimeTasks: 0,
    delayedTasks: 0,
  });
  const [teamLeaderStats, setTeamLeaderStats] = useState([]);
  const [selectedLeader, setSelectedLeader] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getAllUsersPerformance();
        setStats(response.stats);
        setTeamLeaderStats(response.teamLeaderStatus);
      } catch (error) {
        alert("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const successColor = theme.palette.success.main;
  const warningColor = theme.palette.warning.main;
  const infoColor = theme.palette.info.main;
  const inTime = "#EDF7ED";
  const errorColor = "#FDEDED";
  const overDue = "#ff7961";
  const complementaryColor = theme.palette.grey[50]; // Light gray

  // Custom styles for grid items
  const gridItemStyleBase = {
    border: "1px solid",
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
  const gridItemStyle5 = {
    ...gridItemStyleBase,
    backgroundColor: complementaryColor,
    borderColor: complementaryColor,
    maxHeight: "200px",
    maxWidth: "300px",
  };

  const gridItemStyle6 = {
    ...gridItemStyleBase,
    backgroundColor: overDue,
    borderColor: overDue,
    maxHeight: "200px",
    maxWidth: "300px",
  };

  const gridItemStyle7 = {
    ...gridItemStyleBase,
    backgroundColor: inTime,
    borderColor: inTime,
    maxHeight: "200px",
    maxWidth: "300px",
  };

  const gridItemStyle8 = {
    ...gridItemStyleBase,
    backgroundColor: errorColor,
    borderColor: errorColor,
    maxHeight: "200px",
    maxWidth: "300px",
  };

  // Real-time data for donut chart
  const donutChartData = [
    stats.openTasks,
    stats.inProgressTasks,
    stats.completedTasks,
  ];
  const donutChartLabels = [
    "All Open Tasks",
    "All In-Progress Tasks",
    "All Completed Tasks",
  ];

  // Donut chart options
  const DonutChartOptions = {
    labels: donutChartLabels,
    colors: [successColor, warningColor, infoColor],
    legend: {
      show: true,
      position: "bottom",
    },
  };

  const getTeamLeaderChartOptions = (leader) => ({
    labels: ["Completed Tasks", "Incomplete Tasks"],
    colors: [infoColor, warningColor],
    legend: {
      show: true,
      position: "bottom",
    },
  });

  const getMemberChartOptions = (member) => ({
    labels: ["Open Tasks", "In-Progress Tasks", "Completed Tasks"],
    colors: [successColor, warningColor, infoColor],
    legend: {
      show: true,
      position: "bottom",
    },
  });

  const isAllZero = (data) => data.every((value) => value === 0);

  return (
    <>
      <DashboardCard title="All Tasks Overview">
        <Grid container spacing={3}>
          {/* First half: Two rows with two grids each */}
          <Grid
            item
            xs={12}
            sm={7}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6} style={{ ...gridItemStyle1 }}>
                <NavLink to="/all-tasks" style={{ textDecoration: "none" }}>
                  <Typography variant="h3" fontWeight="700" color={"black"}>
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
                </NavLink>
              </Grid>
              <Grid item xs={6} style={{ ...gridItemStyle2 }}>
                <NavLink to="/all-tasks" style={{ textDecoration: "none" }}>
                  {" "}
                  <Typography variant="h3" fontWeight="700" color="#FFFFFF">
                    {stats.openTasks}
                  </Typography>
                  <Stack direction="row" spacing={1} mt={1} alignItems="center">
                    <Avatar
                      sx={{ bgcolor: successColor, width: 27, height: 27 }}
                    >
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
                </NavLink>
              </Grid>
              <Grid item xs={6} style={{ ...gridItemStyle3 }}>
              <NavLink to="/all-tasks" style={{ textDecoration: "none" }}>  <Typography variant="h3" fontWeight="700" color="#FFFFFF">
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
                </Stack></NavLink>
              </Grid>
              <Grid item xs={6} style={{ ...gridItemStyle4 }}>
              <NavLink to="/all-tasks" style={{ textDecoration: "none" }}>   <Typography variant="h3" fontWeight="700" color="#FFFFFF">
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
                </Stack></NavLink> 
              </Grid>
              {/* Second row */}
              <Grid item xs={6} style={{ ...gridItemStyle6 }}>
              <NavLink to="/overdued-tasks" style={{ textDecoration: "none" }}> <Typography variant="h3" fontWeight="700" color="#FFFFFF">
                  {stats.overdueTasks}
                </Typography>
                <Stack direction="row" spacing={1} mt={1} alignItems="center">
                  <Avatar sx={{ bgcolor: overDue, width: 27, height: 27 }}>
                    <IconClockX width={20} color="#FFFFFF" />
                  </Avatar>
                  <Typography
                    variant="subtitle2"
                    fontWeight="600"
                    color="#FFFFFF"
                  >
                    All Overdue Tasks
                  </Typography>
                </Stack></NavLink>
              </Grid>
              <Grid item xs={6} style={{ ...gridItemStyle7 }}>
                <Typography variant="h3" fontWeight="700" color="#1E4620">
                  {stats.onTimeTasks}
                </Typography>
                <Stack direction="row" spacing={1} mt={1} alignItems="center">
                  <Avatar sx={{ bgcolor: inTime, width: 27, height: 27 }}>
                    <IconClockCheck width={20} color="#1E4620" />
                  </Avatar>
                  <Typography
                    variant="subtitle2"
                    fontWeight="600"
                    color="#1E4620"
                  >
                    All In Time Tasks
                  </Typography>
                </Stack>
              </Grid>

              <Grid item xs={6} style={{ ...gridItemStyle8 }}>
              <NavLink to="/delayed-tasks" style={{ textDecoration: "none" }}>  <Typography variant="h3" fontWeight="700" color="#5F2120">
                  {stats.delayedTasks}
                </Typography>
                <Stack direction="row" spacing={1} mt={1} alignItems="center">
                  <Avatar sx={{ bgcolor: "#FDEDED", width: 27, height: 27 }}>
                    <IconClock width={20} color="#5F2120" />
                  </Avatar>
                  <Typography
                    variant="subtitle2"
                    fontWeight="600"
                    color="#5F2120"
                  >
                    All Delayed Tasks
                  </Typography>
                </Stack> </NavLink>
              </Grid>
            </Grid>
          </Grid>

          {/* Second half: Donut chart */}
          <Grid item xs={12} sm={5}>
            <Card>
              <CardContent>
                {isAllZero(donutChartData) ? (
                  <Typography align="center">
                    No tasks data available
                  </Typography>
                ) : (
                  <ReactApexChart
                    type="donut"
                    options={DonutChartOptions}
                    series={donutChartData}
                    height={300}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DashboardCard>
      <DashboardCard title="All TeamLeader Overview">
        {/* Team Leader Stats */}
        <Grid container spacing={3} mt={3}>
          {teamLeaderStats.map((leader, index) => (
            <Grid item xs={12} key={index} style={{ marginBottom: "16px" }}>
              <Typography
                variant="h6"
                fontWeight="700"
                style={{ marginBottom: "20px" }}
              >
                Team Leader: {leader.teamLeader}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                  <Grid container spacing={3}>
                    <Grid item xs={6} style={{ ...gridItemStyle1 }}>
                      <Typography variant="h3" fontWeight="700">
                        {leader.leaderStats.stats.totalTasks}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        mt={1}
                        alignItems="center"
                      >
                        <Avatar
                          sx={{ bgcolor: primary, width: 27, height: 27 }}
                        >
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
                        {leader.leaderStats.stats.openTasks}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        mt={1}
                        alignItems="center"
                      >
                        <Avatar
                          sx={{ bgcolor: successColor, width: 27, height: 27 }}
                        >
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
                    <Grid item xs={6} style={{ ...gridItemStyle3 }}>
                      <Typography variant="h3" fontWeight="700" color="#FFFFFF">
                        {leader.leaderStats.stats.inProgressTasks}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        mt={1}
                        alignItems="center"
                      >
                        <Avatar
                          sx={{ bgcolor: warningColor, width: 27, height: 27 }}
                        >
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
                        {leader.leaderStats.stats.completedTasks}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        mt={1}
                        alignItems="center"
                      >
                        <Avatar
                          sx={{ bgcolor: infoColor, width: 27, height: 27 }}
                        >
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
                    <Grid item xs={6} style={{ ...gridItemStyle6 }}>
                      <Typography variant="h3" fontWeight="700" color="#FFFFFF">
                        {leader.leaderStats.stats.overdueTasks}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        mt={1}
                        alignItems="center"
                      >
                        <Avatar
                          sx={{ bgcolor: overDue, width: 27, height: 27 }}
                        >
                          <IconClockX width={20} color="#FFFFFF" />
                        </Avatar>
                        <Typography
                          variant="subtitle2"
                          fontWeight="600"
                          color="#FFFFFF"
                        >
                          All Overdue Tasks
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={6} style={{ ...gridItemStyle7 }}>
                      <Typography variant="h3" fontWeight="700" color="#1E4620">
                        {leader.leaderStats.stats.onTimeTasks}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        mt={1}
                        alignItems="center"
                      >
                        <Avatar sx={{ bgcolor: inTime, width: 27, height: 27 }}>
                          <IconClockCheck width={20} color="#1E4620" />
                        </Avatar>
                        <Typography
                          variant="subtitle2"
                          fontWeight="600"
                          color="#1E4620"
                        >
                          All In Time Tasks
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={6} style={{ ...gridItemStyle8 }}>
                      <Typography variant="h3" fontWeight="700" color="#5F2120">
                        {leader.leaderStats.stats.delayedTasks}
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={1}
                        mt={1}
                        alignItems="center"
                      >
                        <Avatar
                          sx={{ bgcolor: "#FDEDED", width: 27, height: 27 }}
                        >
                          <IconClock width={20} color="#5F2120" />
                        </Avatar>
                        <Typography
                          variant="subtitle2"
                          fontWeight="600"
                          color="#5F2120"
                        >
                          All Delayed Tasks
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid
                      item
                      xs={6}
                      style={{
                        ...gridItemStyle5,
                        cursor: "pointer",
                        transition: "background-color 0.3s",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                        },
                      }}
                      onClick={() =>
                        setSelectedLeader(
                          selectedLeader === index ? null : index
                        )
                      }
                    >
                      <Stack
                        direction="row"
                        spacing={1}
                        mt={1}
                        alignItems="center"
                      >
                        <IconUsers width={50} color="black" />

                        <Typography variant="h5" fontWeight="500" color="black">
                          {selectedLeader === index
                            ? "Hide Team Members"
                            : "View Team Members"}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Card>
                    <CardContent>
                      {isAllZero([
                        leader.leaderStats.stats.completedTasks,
                        leader.leaderStats.stats.openTasks +
                          leader.leaderStats.stats.inProgressTasks,
                      ]) ? (
                        <Typography align="center">
                          No tasks data available
                        </Typography>
                      ) : (
                        <ReactApexChart
                          type="donut"
                          options={getTeamLeaderChartOptions(leader)}
                          series={[
                            leader.leaderStats.stats.completedTasks,
                            leader.leaderStats.stats.openTasks +
                              leader.leaderStats.stats.inProgressTasks,
                          ]}
                          height={300}
                        />
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              {selectedLeader === index && (
                <Grid container spacing={3} mt={3}>
                  {leader?.memberStatuses.map((member, idx) => (
                    <Grid item xs={12} sm={4} key={idx}>
                      <Typography
                        variant="h6"
                        fontWeight="700"
                        style={{ marginBottom: "20px" }}
                      >
                        Team Member: {member.userName}
                      </Typography>
                      <Card>
                        <CardContent>
                          {isAllZero([
                            member.stats.completedTasks,
                            member.stats.openTasks,
                            member.stats.inProgressTasks,
                          ]) ? (
                            <Typography align="center">
                              Nothing Assigned!
                            </Typography>
                          ) : (
                            <ReactApexChart
                              type="donut"
                              options={getMemberChartOptions(member)}
                              series={[
                                member.stats.openTasks,
                                member.stats.inProgressTasks,
                                member.stats.completedTasks,
                              ]}
                              height={250}
                            />
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>
      </DashboardCard>
    </>
  );
};

export default YearlyBreakup;
