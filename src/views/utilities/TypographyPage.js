import React, { useEffect, useRef, useState } from "react";

import DashboardCard from "../../components/shared/DashboardCard";
import ProfileImg from "../../assets/images/profile/user-1.jpg";
import ImagePdf from "../../assets/images/pdfImage.png";
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
  Alert,
  styled,
  keyframes,
  Tooltip,
  CircularProgress,
  Pagination,
} from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MicIcon from "@mui/icons-material/Mic";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import {
  deleteTask,
  getTasks,
  updateTask,
  updateTaskStatus,
} from "../../actions/taskActions";
import showLottiePopup from "./LottiePopup";
import { getUsers } from "../../actions/userActions";
import { uploadFiles } from "../../actions/commonFileUpload";
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;
const CustomAlert = styled(Alert)(({ theme }) => ({
  borderColor: "#ffae1f",
  backgroundColor: "#fef5e5",
  "& .MuiAlert-icon": {
    fontSize: "1.3rem",
    animation: `${blink} 3s infinite`,
  },
  "& .MuiAlert-message .blinking-message": {
    fontSize: "1.3rem",
    animation: `${blink} 3s infinite`,
  },
}));
const TypographyPage = () => {
  const dispatch = useDispatch();
  const { tasks, error } = useSelector((state) => state.tasks);
  const { categories } = useSelector((state) => state.tasks);
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("User");
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSmallDialog, setOpenSmallDialog] = useState(false);
  const [newAssignTo, setNewAssignTo] = useState("");
  const [newReason, setNewReason] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showReason, setShowReason] = useState(false);
  const [reason, setReason] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [changesAttachments, setChangesAttachments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: selectedTask?.title,
    description: selectedTask?.description,
    assignTo: selectedTask?.assignTo,
    priority: selectedTask?.priority,
    dueDate: selectedTask?.dueDate,
    category: selectedTask?.category,
    status: selectedTask?.status,
  });
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [errors, setErrors] = useState({});
  const [recording, setRecording] = useState(false);
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef(null);
  const [audioURL, setAudioURL] = useState(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [page, setPage] = useState(1);
  const tasksPerPage = 5; // Adjust this number as needed
  const pageCount = Math.ceil(filteredTasks.length / tasksPerPage);
  const audioRef = useRef(null);
  const validate = () => {
    let tempErrors = {};
    tempErrors.newAssignTo = newAssignTo ? "" : "Assign To is required";
    tempErrors.newReason = newReason ? "" : "Reason is required";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleStatusChangeClick = (changedStatus) => {
    setShowReason(true);
    setNewStatus(changedStatus);
  };

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getUsers());
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

  const handleSmallOpen = () => {
    setOpenSmallDialog(true);
  };

  const handleSmallClose = () => {
    setNewAssignTo("");
    setNewReason("");
    setOpenSmallDialog(false);
  };

  const handleSmallSubmit = (e, taskId) => {
    e.preventDefault();
    if (validate()) {
      const formData = {
        transfer: {
          reasonToTransfer: newReason,
        },
        assignTo: newAssignTo,
      };
      dispatch(updateTask(taskId, formData));
      handleSmallClose();
    }
  };

  const handleSave = async (e, task) => {
    e.preventDefault();

    const updatedTask = await dispatch(
      updateTaskStatus(task._id, newStatus, reason, attachments, user?.emailID)
    );

    // Update the local state with the updated task data
    setSelectedTask(updatedTask);

    setShowReason(false);
    setReason("");
    setNewStatus("");
    setAttachments([]);
    // handleDialogClose();
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
      case "In Progress":
        return "warning";
      case "Completed":
        return "error";
      default:
        return "default";
    }
  };
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const paginatedTasks = filteredTasks.slice(
    (page - 1) * tasksPerPage,
    page * tasksPerPage
  );
  const calculateTicketStats = () => {
    const total = allTasks?.length || 0;
    const pending =
      allTasks?.filter((task) => task.status === "In Progress").length || 0;
    const open = allTasks?.filter((task) => task.status === "Open").length || 0;
    const closed =
      allTasks?.filter((task) => task.status === "Completed").length || 0;

    return { total, pending, open, closed };
  };

  const { total, pending, open, closed } = calculateTicketStats();

  const handleViewClick = (task) => {
    setSelectedTask(task);
    setEditedTask(task);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setShowReason(false);
    setEditMode(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleEditSave = () => {
    dispatch(updateTask(editedTask._id, editedTask));
    setEditMode(false);
  };

  const handleDeleteClick = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmed) {
      dispatch(deleteTask(id));
    }
  };

  const handleIconClick = (type) => {
    if (type === "audio") {
      if (recording) {
        handleStopRecording();
      } else {
        handleStartRecording();
      }
    } else {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = type;
      input.multiple = true;
      input.onchange = handleStatusAttachmentChange;
      input.click();
    }
  };
  const renderAttachmentPreview = (attachment, index) => {
    switch (attachment.type) {
      case "image":
        return <ImageIcon />;
      case "application":
        if (attachment.name.endsWith(".pdf")) {
          return <PictureAsPdfIcon />;
        }
        break;
      case "audio":
        return (
          <Box display="flex" alignItems="center">
            <Tooltip>
              <IconButton>
                <MicIcon color="primary" />
              </IconButton>
            </Tooltip>

            <Typography ml={1}>{attachment.name}</Typography>
            {audioURL === attachment.path ? (
              <>
                <IconButton onClick={() => handlePlayAudio(attachment.path)}>
                  <PlayCircleOutlineIcon />
                </IconButton>
                <IconButton onClick={handlePauseAudio}>
                  <PauseCircleOutlineIcon />
                </IconButton>
                <Box display="flex" alignItems="center" ml={1}>
                  <progress value={currentTime} max={duration} />
                  <Typography ml={1}>
                    {Math.floor(currentTime)} / {Math.floor(duration)} sec
                  </Typography>
                </Box>
              </>
            ) : null}
          </Box>
        );

      default:
        return null;
    }
  };

  const handleStartRecording = () => {
    navigator.permissions
      .query({ name: "microphone" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          startRecording();
        } else if (permissionStatus.state === "prompt") {
          // Handle prompt state
        } else {
          alert("Microphone permission denied or unavailable");
          // Handle error gracefully
        }
      })
      .catch((error) => {
        alert("Error querying microphone permission:", error);
        // Handle error gracefully
      });
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        let chunks = [];
        recorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        recorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: "audio/wav" });
          const file = new File([audioBlob], "recorded_audio.wav", {
            type: "audio/wav",
          });

          try {
            const fileUrls = await uploadFiles([file]);
            setAttachments((prevAttachments) => [
              ...prevAttachments,
              {
                type: "audio",
                path: fileUrls[0], // Assuming the response is an array of URLs
                name: file.name,
              },
            ]);
          } catch (error) {
            console.error("Error uploading audio file:", error);
          }
        };

        // Clear previous interval if exists
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        recorder.start();
        setMediaRecorder(recorder);
        setRecording(true);

        // Start counter
        const timer = setInterval(() => {
          setCounter((prevCounter) => prevCounter + 1);
        }, 1000);

        // Save interval reference to clear later
        intervalRef.current = timer;

        // Stop recording after 30 seconds (or any desired duration)
        setTimeout(() => {
          handleStopRecording();
        }, 30000); // 30 seconds
      })
      .catch((error) => {
        alert("Error accessing microphone:", error);
        // Handle error gracefully, e.g., show a message to the user
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setCounter(0); // Reset counter
      clearInterval(intervalRef.current); // Clear interval
      intervalRef.current = null; // Clear interval reference
    }
  };

  const handlePlayAudio = (url) => {
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.play();
      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      };
    }
  };

  const handlePauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const handleStatusAttachmentChange = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);

    try {
      const fileUrls = await uploadFiles(files);

      setAttachments((prevAttachments) => [
        ...prevAttachments,
        ...fileUrls.map((url, index) => ({
          type: files[index].type.split("/")[0],
          path: url,
          name: files[index].name,
        })),
      ]);
    } catch (error) {
      // Handle the error if necessary
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAttachment = (index) => {
    const updatedAttachments = [...attachments];
    updatedAttachments.splice(index, 1);
    setAttachments(updatedAttachments);
  };

  return (
    <div style={{ width: "fit-content" }}>
      <DashboardCard title="All Tasks">
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
            </Grid>{" "}
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
                onClick={() => handleClickCard("In Progress")}
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
                onClick={() => handleClickCard("Completed")}
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
                    Completed Tasks
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
                    Due On
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontWeight={600}>
                    Updated Time
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="h6" fontWeight={600}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTasks
                .filter((task) =>
                  task.assignTo.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <Box
                          sx={{
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            fontWeight={600}
                            style={{ textOverflow: "ellipsis" }}
                          >
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
                          backgroundColor: getPriorityColor(
                            taskDetail.priority
                          ),
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
                        {moment(taskDetail.updatedAt).fromNow()}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <IconButton
                        aria-label="view"
                        color="primary"
                        onClick={() => handleViewClick(taskDetail)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton onClick={handleSmallOpen}>
                        <SyncAltIcon />
                      </IconButton>
                      {user.role !== "User" && (
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDeleteClick(taskDetail._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                      <Dialog open={openSmallDialog} onClose={handleSmallClose}>
                        <DialogTitle>Want To Transfer Task ?</DialogTitle>
                        <DialogContent>
                          <FormControl fullWidth margin="normal">
                            <TextField
                              labelId="select-label"
                              value={newAssignTo}
                              label="Assign To"
                              onChange={(e) => setNewAssignTo(e.target.value)}
                              fullWidth
                              required
                              select
                              error={!!errors.newAssignTo}
                              helperText={errors.newAssignTo}
                            >
                              {users.map((option) => (
                                <MenuItem
                                  key={option._id}
                                  value={option.emailID}
                                >
                                  {option.emailID}
                                </MenuItem>
                              ))}
                            </TextField>
                          </FormControl>
                          <TextField
                            label="Enter Reason to change..."
                            multiline
                            required
                            rows={4}
                            value={newReason}
                            onChange={(e) => setNewReason(e.target.value)}
                            fullWidth
                            margin="normal"
                            error={!!errors.newReason}
                            helperText={errors.newReason}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleSmallClose} color="error">
                            Cancel
                          </Button>
                          <Button
                            onClick={(e) =>
                              handleSmallSubmit(e, taskDetail._id)
                            }
                            color="primary"
                          >
                            Submit
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </Box>
      </DashboardCard>
      {selectedTask && (
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>About Task</DialogTitle>
          <DialogContent>
            <Card sx={{ mt: 2 }} variant="outlined">
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <u>
                    <Typography variant="h6">Task Details :</Typography>
                  </u>
                  {editMode ? (
                    <Box>
                      <Button
                        onClick={() => setEditMode(false)}
                        variant="outlined"
                        color="error"
                        sx={{ mr: 1 }}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleEditSave}
                        variant="outlined"
                        color="secondary"
                      >
                        Save
                      </Button>
                    </Box>
                  ) : (
                    user.role !== "User" && (
                      <IconButton
                        onClick={() => setEditMode(true)}
                        color="primary"
                        style={{ border: "1px solid #5D87FF" }}
                      >
                        <EditIcon />
                      </IconButton>
                    )
                  )}
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Title:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {editMode ? (
                      <TextField
                        fullWidth
                        name="title"
                        value={editedTask.title}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Typography variant="body1" gutterBottom>
                        {selectedTask.title}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Description:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {editMode ? (
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        name="description"
                        value={editedTask.description}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Typography variant="body1" gutterBottom>
                        {selectedTask.description}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Category:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {editMode ? (
                      <TextField
                        select
                        fullWidth
                        name="category"
                        value={editedTask.category}
                        onChange={handleInputChange}
                      >
                        {categories.map((cat, index) => (
                          <MenuItem key={index} value={cat}>
                            {cat}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      <Typography variant="body1" gutterBottom>
                        {selectedTask.category}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Assigned By:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" gutterBottom>
                      {selectedTask.createdBy}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Assigned To:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {editMode ? (
                      <TextField
                        select
                        fullWidth
                        name="assignTo"
                        value={editedTask.assignTo}
                        onChange={handleInputChange}
                      >
                        {users.map((option) => (
                          <MenuItem key={option._id} value={option.emailID}>
                            {option.emailID}
                          </MenuItem>
                        ))}
                      </TextField>
                    ) : (
                      <Typography variant="body1" gutterBottom>
                        {selectedTask.assignTo}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Priority:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {editMode ? (
                      <TextField
                        select
                        fullWidth
                        name="priority"
                        value={editedTask.priority}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="High">High</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Low">Low</MenuItem>
                      </TextField>
                    ) : (
                      <Chip
                        sx={{
                          px: "4px",
                          backgroundColor: getPriorityColor(
                            selectedTask.priority
                          ),
                          color: "#fff",
                        }}
                        style={{ fontWeight: "900" }}
                        size="small"
                        label={selectedTask.priority}
                      />
                    )}
                  </Grid>

                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Status:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {editMode ? (
                      <TextField
                        select
                        fullWidth
                        name="status"
                        value={editedTask.status}
                        onChange={handleInputChange}
                      >
                        <MenuItem value="Open">Open</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                      </TextField>
                    ) : (
                      <Chip
                        label={selectedTask.status}
                        color={getStatusColor(selectedTask.status)}
                        size="small"
                      />
                    )}
                  </Grid>

                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Due Date:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {editMode ? (
                      <TextField
                        type="datetime-local"
                        fullWidth
                        name="dueDate"
                        value={moment(editedTask.dueDate).format(
                          "YYYY-MM-DDTHH:mm"
                        )}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Typography variant="body1" gutterBottom color={"green"}>
                        {moment(selectedTask.dueDate).format(
                          "DD-MMMM-YYYY HH:mm A"
                        )}
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Created At:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" gutterBottom>
                      {moment(selectedTask.createdAt).format(
                        "DD-MMMM-YYYY HH:mm A"
                      )}
                    </Typography>
                  </Grid>

                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Updated At:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" gutterBottom>
                      {moment(selectedTask.updatedAt).format(
                        "DD-MMMM-YYYY HH:mm A"
                      )}
                    </Typography>
                  </Grid>

                  {selectedTask.closedAt && (
                    <>
                      {" "}
                      <Grid item xs={4}>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          gutterBottom
                        >
                          Completed At:
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography
                          variant="body1"
                          gutterBottom
                          color={"error"}
                        >
                          {moment(selectedTask.closedAt).format(
                            "DD-MMMM-YYYY HH:mm A"
                          )}
                        </Typography>
                      </Grid>
                    </>
                  )}

                  <Grid item xs={4}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Attachments:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    {selectedTask.attachments &&
                      selectedTask.attachments.map((attachment, index) => (
                        <Box key={index} sx={{ mb: 1 }}>
                          <Typography variant="body1" gutterBottom>
                            {attachment.type === "image" && (
                              <img
                                src={attachment.path}
                                alt={`Attachment ${index}`}
                                style={{
                                  maxWidth: "100px",
                                  maxHeight: "100px",
                                }}
                              />
                            )}
                            {attachment.type === "application" && (
                              <a
                                href={attachment?.path}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <img
                                  src={ImagePdf}
                                  alt={`Attachment ${index}`}
                                  style={{
                                    maxWidth: "100px",
                                    maxHeight: "100px",
                                  }}
                                />
                              </a>
                            )}
                            {attachment.type === "audio" && (
                              <audio controls>
                                <source
                                  src={attachment?.path}
                                  type="audio/wav"
                                />
                                Your browser does not support the audio element.
                              </audio>
                            )}
                          </Typography>
                        </Box>
                      ))}
                  </Grid>
                  {selectedTask.transfer?.reasonToTransfer && (
                    <Grid item xs={12}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        gutterBottom
                      >
                        <CustomAlert variant="outlined" severity="warning">
                          <span className="blinking-message">
                            Transferred Task!
                          </span>
                          <Grid container style={{ marginTop: "10px" }}>
                            <Grid item xs={12}>
                              <span>(Whom Transfered) : </span>
                              <Chip
                                label={selectedTask.transfer?.fromWhom}
                                color={"primary"}
                                size="small"
                              />
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: "5px" }}>
                              <Typography variant="body1" gutterBottom>
                                <span>(Reason For Transfer) : </span>{" "}
                                {selectedTask.transfer?.reasonToTransfer}
                              </Typography>
                            </Grid>
                          </Grid>
                        </CustomAlert>
                      </Typography>
                    </Grid>
                  )}

                  {selectedTask.statusChanges &&
                    selectedTask.statusChanges.length > 0 && (
                      <Grid item xs={12}>
                        {selectedTask.statusChanges.map((change, index) => (
                          <Card
                            style={{
                              marginTop: "10px",
                              backgroundColor: "#f2f6fa",
                            }}
                          >
                            <CardContent>
                              <Grid container spacing={2} key={index}>
                                <Grid item xs={4}>
                                  <Chip
                                    label={change.status}
                                    color={getStatusColor(change.status)}
                                    size="small"
                                  />
                                </Grid>
                                <Grid item xs={8}>
                                  <Typography
                                    variant="body1"
                                    gutterBottom
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Avatar
                                      src={ProfileImg}
                                      alt={ProfileImg}
                                      sx={{
                                        width: 35,
                                        height: 35,
                                      }}
                                    />{" "}
                                    <b style={{ marginLeft: "10px" }}>
                                      ({change.taskUpdatedBy})
                                    </b>
                                  </Typography>
                                  <Typography variant="body1" gutterBottom>
                                    {change.reason}
                                  </Typography>{" "}
                                  <span
                                    style={{
                                      color: "#539bff",
                                    }}
                                  >
                                    {moment(change.changedAt).fromNow()}{" "}
                                  </span>
                                </Grid>
                                {change.changesAttachments &&
                                  change.changesAttachments.length > 0 && (
                                    <Grid item xs={12}>
                                      <Grid container spacing={2}>
                                        {change.changesAttachments.map(
                                          (attachment, index) => {
                                            return (
                                              <Grid item key={index}>
                                                {attachment.type ===
                                                  "image" && (
                                                  <img
                                                    src={attachment.path}
                                                    alt={`Attachment ${index}`}
                                                    style={{
                                                      maxWidth: "100px",
                                                      maxHeight: "100px",
                                                    }}
                                                  />
                                                )}
                                                {attachment.type ===
                                                  "application" && (
                                                  <a
                                                    href={attachment?.path}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                  >
                                                    <img
                                                      src={ImagePdf}
                                                      alt={`Attachment ${index}`}
                                                      style={{
                                                        maxWidth: "100px",
                                                        maxHeight: "100px",
                                                      }}
                                                    />
                                                  </a>
                                                )}
                                                {attachment.type ===
                                                  "audio" && (
                                                  <audio controls>
                                                    <source
                                                      src={attachment?.path}
                                                      type="audio/wav"
                                                    />
                                                    Your browser does not
                                                    support the audio element.
                                                  </audio>
                                                )}
                                              </Grid>
                                            );
                                          }
                                        )}
                                      </Grid>
                                    </Grid>
                                  )}
                              </Grid>
                            </CardContent>
                          </Card>
                        ))}
                      </Grid>
                    )}
                </Grid>
              </CardContent>{" "}
            </Card>
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Change Status:
              </Typography>
              {selectedTask.status === "Completed" && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mr: 2 }}
                  onClick={() => handleStatusChangeClick("Open")}
                >
                  ReOpen
                </Button>
              )}
              {selectedTask.status !== "In Progress" && (
                <Button
                  variant="contained"
                  color="warning"
                  sx={{ mr: 2 }}
                  onClick={() => handleStatusChangeClick("In Progress")}
                >
                  In-Progress
                </Button>
              )}
              {selectedTask.status !== "Completed" && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleStatusChangeClick("Completed")}
                >
                  Completed
                </Button>
              )}
            </Box>
            {showReason && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Reason for Change:
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter reason for status change"
                />
                <Box display="flex" alignItems="center" sx={{ mt: 2 }} gap={2}>
                  <ImageIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleIconClick("image/*")}
                  />
                  <PictureAsPdfIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleIconClick("application/pdf")}
                  />
                  {recording === false ? (
                    <Tooltip title="Start Recording">
                      <MicIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleIconClick("audio")}
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Stop Recording">
                      <IconButton onClick={handleStopRecording}>
                        <StopCircleIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>

                <Box>
                  <Typography ml={1} mt={1}>
                    {recording && `Recording... ${counter} sec`}
                  </Typography>
                </Box>
                {loading && <CircularProgress sx={{ mt: 2 }} />}
                {!loading &&
                  attachments.map((attachment, index) => (
                    <Box key={index} display="flex" alignItems="center" mt={2}>
                      {renderAttachmentPreview(attachment, index)}
                      <IconButton onClick={() => handleDeleteAttachment(index)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Box>
                  ))}

                <Button
                  onClick={(e) => handleSave(e, selectedTask)}
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Update Task
                </Button>
              </Box>
            )}
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
