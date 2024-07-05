import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "../../../components/shared/DashboardCard";
import Chart from "react-apexcharts";
import { getAllCategoryPerformance } from "../../../actions/dashboardActions";

const SalesOverview = () => {
  const [month, setMonth] = useState("1");
  const [categoryStats, setCategoryStats] = useState([]);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;
  const warning = theme.palette.warning.main;

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const response = await getAllCategoryPerformance();
      console.log(response);
      setCategoryStats(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Options for the column chart
  const optionsColumnChart = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 370,
    },
    colors: [primary, secondary, warning],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: "60%",
        columnWidth: "42%",
        borderRadius: 6,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "all",
      },
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: "butt",
      colors: ["transparent"],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: categoryStats.map((stat) => stat.category), // Dynamically set categories based on fetched data
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };

  // Data for the column chart
  const seriesColumnChart = [
    {
      name: "Open Tasks",
      data: categoryStats.map((stat) => stat.openTasks), // Adjust to map to the appropriate data field
    },

    {
      name: "In Progress Tasks",
      data: categoryStats.map((stat) => stat.inProgressTasks), // Adjust to map to the appropriate data field
    },
    {
      name: "Completed Tasks",
      data: categoryStats.map((stat) => stat.completedTasks), // Adjust to map to the appropriate data field
    },
  ];

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <DashboardCard
      title="Tasks Overview"
      action={
        <Select
          labelId="month-dd"
          id="month-dd"
          value={month}
          size="small"
          onChange={handleChange}
        >
          <MenuItem value="1">January 2024</MenuItem>
          <MenuItem value="2">February 2024</MenuItem>
          {/* Add more months as needed */}
        </Select>
      }
    >
      <Chart
        options={optionsColumnChart}
        series={seriesColumnChart}
        type="bar"
        height={370}
      />
    </DashboardCard>
  );
};

export default SalesOverview;
