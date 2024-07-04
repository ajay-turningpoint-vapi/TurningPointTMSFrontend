import React, { useEffect, useState } from "react";
import PageContainer from "../../components/container/PageContainer";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
import { getUsers } from "../../actions/userActions";
import LinkIcon from "@mui/icons-material/Link";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import MicIcon from "@mui/icons-material/Mic";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../actions/taskActions";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DashboardCard from "../../components/shared/DashboardCard";

const Icons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDateTime] = useState("");
  const [reminderFrequency, setReminderFrequency] = useState("");
  const [reminderStartDate, setReminderStartDate] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.title = title ? "" : "Title is required";
    tempErrors.description = description ? "" : "Description is required";
    tempErrors.category = category ? "" : "Category is required";
    tempErrors.assignTo = assignTo ? "" : "Assign To is required";
    tempErrors.priority = priority ? "" : "Priority is required";
    tempErrors.dueDate = dueDate ? "" : "Due Date is required";
    if (reminderFrequency) {
      tempErrors.reminderStartDate = reminderStartDate
        ? ""
        : "Reminder Start Date is required if reminder is set";
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleStartRecording = () => {
    navigator.permissions
      .query({ name: "microphone" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
              const recorder = new MediaRecorder(stream);
              recorder.ondataavailable = (e) => {
                const audioBlob = new Blob([e.data], { type: "audio/wav" });
                const url = URL.createObjectURL(audioBlob);
                setAttachments((prevAttachments) => [
                  ...prevAttachments,
                  {
                    type: "audio",
                    path: url,
                    name: "recorded_audio.wav",
                  },
                ]);
              };
              recorder.start();
              setMediaRecorder(recorder);
              setRecording(true);
            })
            .catch((error) => {
              console.log("Error accessing microphone:", error);
              // Handle error gracefully, e.g., show a message to the user
            });
        } else if (permissionStatus.state === "prompt") {
          // Prompt user to grant permission
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(/* handle successful access */)
            .catch(/* handle error */);
        } else {
          // Permission denied or unavailable
          console.log("Microphone permission denied or unavailable");
          // Handle error gracefully, e.g., show a message to the user
        }
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
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
      input.onchange = handleAttachmentChange;
      input.click();
    }
  };

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    setTimeout(() => {
      setAttachments((prevAttachments) => [
        ...prevAttachments,
        ...files.map((file) => ({
          type: file.type.split("/")[0],
          path: URL.createObjectURL(file),
          name: file.name,
        })),
      ]);
      setLoading(false);
    }, 1000); // Simulate loading
  };

  const handlePlayAudio = (url) => {
    const audio = new Audio(url);
    audio.play();
  };

  const handlePauseAudio = (url) => {
    const audio = new Audio(url);
    audio.pause();
  };

  const handleDeleteAttachment = (index) => {
    const updatedAttachments = [...attachments];
    updatedAttachments.splice(index, 1);
    setAttachments(updatedAttachments);
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
            {recording ? (
              <IconButton onClick={handleStopRecording}>
                <StopCircleIcon color="error" />
              </IconButton>
            ) : (
              <IconButton onClick={handleStartRecording}>
                <MicIcon color="primary" />
              </IconButton>
            )}
            <Typography ml={1}>{attachment.name}</Typography>
            {audioURL === attachment.path ? (
              <>
                <IconButton onClick={() => handlePlayAudio(attachment.path)}>
                  <PlayCircleOutlineIcon />
                </IconButton>
                <IconButton onClick={() => handlePauseAudio(attachment.path)}>
                  <PauseCircleOutlineIcon />
                </IconButton>
              </>
            ) : null}
          </Box>
        );
      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newTask = {
        title,
        description,
        category,
        assignTo,
        priority,
        dueDate,
        attachments,
      };
      if (reminderFrequency && reminderStartDate) {
        newTask.reminder = {
          frequency: reminderFrequency,
          startDate: reminderStartDate,
        };
      }

      dispatch(addTask(newTask));
    }
    setTitle("");
    setDescription("");
    setCategory("");
    setAssignTo("");
    setPriority("");
    setDueDateTime("");
    setAttachments([]);
    setLoading(false);
    setRecording(false);
    setMediaRecorder(null);
    setAudioURL(null);
    setReminderFrequency("");
    setReminderStartDate("");
  };

  return (
    <DashboardCard title="Add New Task">
      <PageContainer title="Icons" name="this is Icons">
        <Grid item display="flex" justifyContent="center" alignItems="center">
          <Card
            elevation={9}
            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "800px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar>
                <TaskAltIcon />
              </Avatar>{" "}
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                sx={{ textDecoration: "underline", marginLeft: "8px" }}
              >
                ADD NEW TICKET
              </Typography>
            </div>

            <Stack spacing={3}>
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="title"
                >
                  Title
                </Typography>
                <CustomTextField
                  id="title"
                  variant="outlined"
                  required
                  label="Enter Title"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  error={!!errors.title}
                  helperText={errors.title}
                />
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="description"
                >
                  Description
                </Typography>
                <CustomTextField
                  id="description"
                  variant="outlined"
                  label="Enter description..."
                  required
                  fullWidth
                  multiline
                  minRows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="category"
                >
                  Category
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    required
                    label="Category"
                    fullWidth
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    error={!!errors.category}
                    helperText={errors.category}
                    select
                  >
                    <MenuItem value="IT">IT</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="HR">HR</MenuItem>
                    <MenuItem value="Sales">Sales</MenuItem>
                  </TextField>
                </FormControl>
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="assignTo"
                >
                  Assign To Users
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    required
                    label="Assign To"
                    fullWidth
                    select
                    value={assignTo}
                    onChange={(e) => setAssignTo(e.target.value)}
                    error={!!errors.assignTo}
                    helperText={errors.assignTo}
                  >
                    {users.map((option) => (
                      <MenuItem key={option._id} value={option.emailID}>
                        {option.emailID}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="priority"
                >
                  Priority
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    inputProps={{ "aria-label": "Without label" }}
                    label="Select Priority"
                    required
                    id="priority"
                    select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    error={!!errors.priority}
                    helperText={errors.priority}
                  >
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                  </TextField>
                </FormControl>
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="dueDate"
                >
                  Due Date and Time
                </Typography>
                <CustomTextField
                  id="dueDate"
                  type="datetime-local"
                  variant="outlined"
                  required
                  fullWidth
                  value={dueDate}
                  onChange={(e) => setDueDateTime(e.target.value)}
                  error={!!errors.dueDate}
                  helperText={errors.dueDate}
                />
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="reminder"
                >
                  Reminder
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    label="Reminder Frequency (Optional)"
                    value={reminderFrequency}
                    onChange={(e) => setReminderFrequency(e.target.value)}
                    select
                    fullWidth
                  >
                    <MenuItem value="">Select Frequency</MenuItem>
                    <MenuItem value="Daily">Daily</MenuItem>
                    <MenuItem value="Weekly">Weekly</MenuItem>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                  </TextField>
                  {reminderFrequency && (
                    <TextField
                      label="Reminder Start Date"
                      type="datetime-local"
                      value={reminderStartDate}
                      onChange={(e) => setReminderStartDate(e.target.value)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      style={{ marginTop: "16px" }}
                      error={!!errors.reminderStartDate}
                      helperText={errors.reminderStartDate}
                    />
                  )}
                </FormControl>
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="attachments"
                >
                  Attachments
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <LinkIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleIconClick(".pdf")}
                  />
                  <ImageIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleIconClick("image/*")}
                  />
                  <PictureAsPdfIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleIconClick("application/pdf")}
                  />
                  <MicIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleIconClick("audio")}
                  />
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
              </Box>

              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Add Ticket
                </Button>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </PageContainer>
    </DashboardCard>
  );
};

export default Icons;
