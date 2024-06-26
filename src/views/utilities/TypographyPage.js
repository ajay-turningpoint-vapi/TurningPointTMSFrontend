import React, { useEffect, useState } from "react";

import DashboardCard from "../../components/shared/DashboardCard";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Grid,
  Card,
  CardContent,
  IconButton,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
  CardMedia,
  Popover,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";

import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../actions/taskActions";
const TypographyPage = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("User");
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    setAllTasks(tasks);
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleClickCard = (status) => {
    if (status === null) {
      setFilteredTasks(allTasks);
    } else {
      setFilteredTasks(allTasks.filter((task) => task.status === status));
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
      case "In-Progress":
        return "warning";
      case "Close":
        return "error";
      default:
        return "default";
    }
  };

  const calculateTicketStats = () => {
    const total = allTasks.length;
    const pending = allTasks.filter(
      (task) => task.status === "In-Progress"
    ).length;
    const open = allTasks.filter((task) => task.status === "Open").length;
    const closed = allTasks.filter((task) => task.status === "Close").length;

    return { total, pending, open, closed };
  };

  const { total, pending, open, closed } = calculateTicketStats();

  const handleViewClick = (task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleEditClick = (task) => {
    // Implement edit functionality
  };

  const handleDeleteClick = (task) => {
    // Implement delete functionality
  };

  return (
    <div style={{ width: "fit-content" }}>
      <DashboardCard title="All Tickets">
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Card
                onClick={() => handleClickCard(null)}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.05)" },
                  height: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                style={{ backgroundColor: "rgb(236, 242, 255)" }}
              >
                <CardContent style={{ color: "rgb(93, 135, 255)" }}>
                  <Typography variant="h4" align="center">
                    {total}
                  </Typography>
                  <Typography variant="h6" align="center" gutterBottom>
                    Total Tasks
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card
                onClick={() => handleClickCard("In-Progress")}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.05)" },
                  height: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                style={{ backgroundColor: "rgb(254, 245, 229)" }}
              >
                <CardContent style={{ color: "rgb(255, 174, 31)" }}>
                  <Typography variant="h4" align="center">
                    {pending}
                  </Typography>
                  <Typography variant="h6" align="center" gutterBottom>
                    In-Progress Tasks
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card
                onClick={() => handleClickCard("Open")}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.05)" },
                  height: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                style={{ backgroundColor: "rgb(230, 255, 250)" }}
              >
                <CardContent style={{ color: "rgb(19, 222, 185)" }}>
                  <Typography variant="h4" align="center">
                    {open}
                  </Typography>
                  <Typography variant="h6" align="center" gutterBottom>
                    Open Tasks
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={3}>
              <Card
                onClick={() => handleClickCard("Close")}
                sx={{
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "scale(1.05)" },
                  height: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                style={{ backgroundColor: "rgb(253, 237, 232)" }}
              >
                <CardContent style={{ color: "rgb(250, 137, 107)" }}>
                  <Typography variant="h4" align="center">
                    {closed}
                  </Typography>
                  <Typography variant="h6" align="center" gutterBottom>
                    Closed Tasks
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mb: 2,
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <TextField
              label="Search..."
              name="search"
              value={searchTerm}
              onChange={handleSearchTermChange}
              size="small"
            />
          </FormControl>
        </Box>
        <Box sx={{ overflow: "auto", width: "100%" }}>
          <Table
            aria-label="simple table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
            }}
          >
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
                {role === "Admin" ? null : (
                  <>
                    <TableCell>
                      <Typography variant="h6" fontWeight={600}>
                        Created By
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" fontWeight={600}>
                        Assigned To
                      </Typography>
                    </TableCell>
                  </>
                )}
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
                    Due Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight={600}>
                    Updated Time
                  </Typography>
                </TableCell>
                {role === 0 && (
                  <TableCell>
                    <Typography variant="h6" fontWeight={600}>
                      Transfer Ticket
                    </Typography>
                  </TableCell>
                )}
                <TableCell>
                  <Typography variant="h6" fontWeight={600}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks
                .filter((task) =>
                  task.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((taskDetail, index) => (
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
                    {role === 0 ? null : (
                      <>
                        <TableCell>
                          <Typography
                            color="textSecondary"
                            variant="subtitle2"
                            fontWeight={400}
                          >
                            {taskDetail.createdBy}
                          </Typography>
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
                      </>
                    )}
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
                      <Typography
                        variant="subtitle2"
                        style={{ color: "green" }}
                      >
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
                        {moment(taskDetail.createdTimeStamp).fromNow()}
                      </Typography>
                    </TableCell>

                    {role === 0 && (
                      <TableCell>
                        <Select
                          sx={{
                            boxShadow: "none",
                            "& .MuiSelect-select": {
                              paddingRight: 1,
                              paddingLeft: 1,
                              paddingTop: 1,
                              paddingBottom: 1,
                            },
                          }}
                          value={taskDetail.assignToUsers}
                          onChange={(e) => {}}
                          renderValue={(selected) => (
                            <Chip
                              label={taskDetail.assignToUsers}
                              color="primary"
                              size="small"
                            />
                          )}
                        >
                          {taskDetail.assignToUsers.map((user) => (
                            <MenuItem key={user} value={user}>
                              {user}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                    )}
                    <TableCell>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditClick(taskDetail)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteClick(taskDetail)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="view"
                        color="primary"
                        onClick={() => handleViewClick(taskDetail)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </DashboardCard>
      {selectedTask && (
        <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
          <DialogTitle>
            Task Details
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Title:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {selectedTask.title}
              </Typography>

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Created By:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {selectedTask.createdBy}
              </Typography>

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Assigned To:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {selectedTask.assignTo}
              </Typography>

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Priority:
              </Typography>
              <Chip
                sx={{
                  px: "4px",
                  backgroundColor: getPriorityColor(selectedTask.priority),
                  color: "#fff",
                }}
                style={{ fontWeight: "900" }}
                size="small"
                label={selectedTask.priority}
              />

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Status:
              </Typography>
              <Chip
                label={selectedTask.status}
                color={getStatusColor(selectedTask.status)}
                size="small"
              />

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Due Date:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {moment(selectedTask.dueDate).format("DD-MMMM-YYYY HH:mm A")}
              </Typography>

              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Updated Time:
              </Typography>
              <Typography variant="body1" gutterBottom>
                {moment(selectedTask.createdTimeStamp).fromNow()}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} variant="contained">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default TypographyPage;
