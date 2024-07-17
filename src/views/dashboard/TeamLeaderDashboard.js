import React, { useEffect } from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "../../components/container/PageContainer";

// components
import SalesOverview from "./components/SalesOverview";
import YearlyBreakup from "./components/YearlyBreakup";
import RecentTransactions from "./components/RecentTransactions";
import ProductPerformance from "./components/ProductPerformance";
import Blog from "./components/Blog";
import MonthlyEarnings from "./components/MonthlyEarnings";
import { getUserStats } from "../../actions/dashboardActions";

const TeamLeaderDashboard = () => {
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getUserStats();

        console.log(response);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <PageContainer
      title="Team Leader Dashboard"
      description="This is Team Leader Dashboard"
    >
      <Box>
        <Grid conatiner spacing={3}>
          TeamLeader
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default TeamLeaderDashboard;
