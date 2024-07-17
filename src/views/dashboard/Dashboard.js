import React from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "../../components/container/PageContainer";

// components
import SalesOverview from "./components/SalesOverview";
import YearlyBreakup from "./components/YearlyBreakup";
import RecentTransactions from "./components/RecentTransactions";
import ProductPerformance from "./components/ProductPerformance";
import Blog from "./components/Blog";
import MonthlyEarnings from "./components/MonthlyEarnings";
import UsersPerformance from "./components/UsersPerformance";
import OverDueTasks from "./components/OverDueTasks";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid conatiner spacing={3}>
          {user.role === "Admin" && (
            <Grid item xs={12} lg={8}>
              <SalesOverview />
            </Grid>
          )}
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              {user.role === "Admin" && (
                <Grid item xs={12}>
                  <YearlyBreakup />
                </Grid>
              )}
              {user.role === "Admin" && (
                <Grid item xs={12} lg={12}>
                  <UsersPerformance />
                </Grid>
              )}
             
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
