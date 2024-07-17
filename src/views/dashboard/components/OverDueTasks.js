import React, { useEffect } from "react";
import DashboardCard from "../../../components/shared/DashboardCard";
import {
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../actions/taskActions";
import moment from "moment";

const OverDueTasks = () => {
  const { tasks, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasks(true));
  }, [dispatch]);
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "primary.main";
      case "Medium":
        return "secondary.main";
      case "Low":
        return "error.main";
      case "Critical":
        return "success.main";
      default:
        return "default";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "success";
      case "In Progress":
        return "warning";
      case "Completed":
        return "error";
      default:
        return "default";
    }
  };
  return (
    <DashboardCard title="Over Due Tasks">
      <Box sx={{ overflow: "auto", width: "100%" }}>
        <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" fontWeight={600}>
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight={600}>
                  Task Title
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="h6" fontWeight={600}>
                  Assigned To
                </Typography>
              </TableCell>

              <TableCell>
                <Typography variant="h6" fontWeight={600}>
                  Priority
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight={600}>
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight={600}>
                  Due On
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" fontWeight={600}>
                  Updated Time
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((taskDetail, index) => (
                <TableRow key={taskDetail.id}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {taskDetail.title}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {taskDetail.assignTo}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: getPriorityColor(taskDetail.priority),
                        color: "#fff",
                      }}
                      style={{ fontWeight: "900" }}
                      size="small"
                      label={taskDetail.priority}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={taskDetail.status}
                      color={getStatusColor(taskDetail.status)}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    <Typography variant="subtitle2"  style={{ color: "red" }}>
                      {moment(taskDetail.dueDate).format(
                        "DD-MMMM-YYYY HH:mm A"
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      style={{ color: "#3f51b5" }}
                    >
                      {moment(taskDetail.updatedAt).fromNow()}
                    </Typography>
                  </TableCell>

               
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default OverDueTasks;
