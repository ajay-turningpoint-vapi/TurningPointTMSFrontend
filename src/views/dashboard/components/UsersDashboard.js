import React from "react";
import OverDueTasks from "./OverDueTasks";
import PageContainer from "../../../components/container/PageContainer";
import { Box, Grid } from "@mui/material";

const UsersDashboard = () => {
  return (
    <PageContainer title="User Dashboard" description="This is User Dashboard">
      <Box>
        <Grid conatiner spacing={3}>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12}>
                <OverDueTasks />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default UsersDashboard;
