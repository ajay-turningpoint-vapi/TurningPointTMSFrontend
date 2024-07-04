import React from "react";
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

const YearlyBreakup = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const successColor = theme.palette.success.main;
  const warningColor = theme.palette.warning.main;
  const infoColor = theme.palette.info.main;

  // Custom styles for grid items
  const gridItemStyleBase = {
    border: '1px solid',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#FFFFFF',
    margin: '10px',
    boxShadow: '5px 4px 8px rgba(0, 0, 0, 0.5)', // Shadow effect
  };

  const gridItemStyle1 = {
    ...gridItemStyleBase,
    borderColor: primary,
    maxHeight: '200px', // Example value for maxHeight
    maxWidth: '300px', // Example value for maxWidth
  };

  const gridItemStyle2 = {
    ...gridItemStyleBase,
    backgroundColor: successColor,
    borderColor: successColor,
    maxHeight: '200px', // Example value for maxHeight
    maxWidth: '300px', // Example value for maxWidth
  };

  const gridItemStyle3 = {
    ...gridItemStyleBase,
    backgroundColor: warningColor,
    borderColor: warningColor,
    maxHeight: '200px', // Example value for maxHeight
    maxWidth: '300px', // Example value for maxWidth
  };

  const gridItemStyle4 = {
    ...gridItemStyleBase,
    backgroundColor: infoColor,
    borderColor: infoColor,
    maxHeight: '200px', // Example value for maxHeight
    maxWidth: '300px', // Example value for maxWidth
  };

  // Sample data for donut chart
  const donutChartData = [358, 112, 123, 123];
  const donutChartLabels = [
    'All Tasks',
    'All Open Tasks',
    'All In-Progress Tasks',
    'All Completed Tasks',
  ];

  // Donut chart options
  const DonutChartOptions = {
    labels: donutChartLabels,
    colors: [primary, successColor, warningColor, infoColor],
    legend: {
      show: true,
      position: 'bottom',
    },
  };

  return (
    <DashboardCard title="All Tasks Overview">
      <Grid container spacing={3}>
        {/* First half: Two rows with two grids each */}
        <Grid
          item
          xs={12}
          sm={7}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Grid container spacing={3}>
            {/* First row */}
            <Grid item xs={6} style={{ ...gridItemStyle1 }}>
              <Typography variant="h3" fontWeight="700">
                358
              </Typography>
              <Stack direction="row" spacing={1} mt={1} alignItems="center">
                <Avatar sx={{ bgcolor: primary, width: 27, height: 27 }}>
                  <IconArrowUpLeft width={20} color="#FFFFFF" />
                </Avatar>
                <Typography variant="subtitle2" fontWeight="600" color="primary">
                  All Tasks
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} style={{ ...gridItemStyle2 }}>
              <Typography variant="h3" fontWeight="700" color="#FFFFFF">
                112
              </Typography>
              <Stack direction="row" spacing={1} mt={1} alignItems="center">
                <Avatar sx={{ bgcolor: successColor, width: 27, height: 27 }}>
                  <IconArrowUpLeft width={20} color="#FFFFFF" />
                </Avatar>
                <Typography variant="subtitle2" fontWeight="600" color="#FFFFFF">
                  All Open Tasks
                </Typography>
              </Stack>
            </Grid>

            {/* Second row */}
            <Grid item xs={6} style={{ ...gridItemStyle3 }}>
              <Typography variant="h3" fontWeight="700" color="#FFFFFF">
                123
              </Typography>
              <Stack direction="row" spacing={1} mt={1} alignItems="center">
                <Avatar sx={{ bgcolor: warningColor, width: 27, height: 27 }}>
                  <IconArrowUpLeft width={20} color="#FFFFFF" />
                </Avatar>
                <Typography variant="subtitle2" fontWeight="600" color="#FFFFFF">
                  All In-Progress Tasks
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} style={{ ...gridItemStyle4 }}>
              <Typography variant="h3" fontWeight="700" color="#FFFFFF">
                123
              </Typography>
              <Stack direction="row" spacing={1} mt={1} alignItems="center">
                <Avatar sx={{ bgcolor: infoColor, width: 27, height: 27 }}>
                  <IconArrowUpLeft width={20} color="#FFFFFF" />
                </Avatar>
                <Typography variant="subtitle2" fontWeight="600" color="#FFFFFF">
                  All Completed Tasks
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>

        {/* Second half: Donut chart */}
        <Grid
          item
          xs={12}
          sm={5}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card>
            <CardContent>
              <ReactApexChart
                type="donut"
                options={DonutChartOptions}
                series={donutChartData}
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
