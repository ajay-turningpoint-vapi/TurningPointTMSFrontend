import React, { useEffect, useRef, useState } from "react";
import PageContainer from "../../components/container/PageContainer";
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Tooltip,
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
import { addCategoryThunk, addTask } from "../../actions/taskActions";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DashboardCard from "../../components/shared/DashboardCard";
import { uploadFiles } from "../../actions/commonFileUpload";

const Icons = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { categories } = useSelector((state) => state.tasks);

  // State
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    category: "",
    assignTo: "",
    priority: "",
    dueDate: "",
    reminderFrequency: "",
    reminderStartDate: "",

    repeatFrequency: "",
    dailyDate: "",
    weeklyDays: [],
    monthlyDays: [],
  });

  const [errors, setErrors] = useState({});
  const [newCategory, setNewCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [counter, setCounter] = useState(0); // Counter state for recording duration
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const intervalRef = useRef(null);
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const audioRef = useRef(null);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleStartRecording = () => {
    navigator.permissions
      .query({ name: "microphone" })
      .then((permissionStatus) => {
        if (permissionStatus.state === "granted") {
          console.log("test");
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

        recorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: "audio/wav" });
          const url = URL.createObjectURL(audioBlob);
          setAttachments((prevAttachments) => [
            ...prevAttachments,
            {
              type: "audio",
              path: url,
              name: "recorded_audio.wav",
            },
          ]);
          setAudioURL(url);
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

  const handleAttachmentChange = async (e) => {
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

  const validate = () => {
    const {
      title,
      description,
      category,
      assignTo,
      priority,
      dueDate,
      reminderFrequency,
      reminderStartDate,
      repeatFrequency,
    } = formValues;

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
    if (repeatFrequency) {
      // Removed validation for repeatUntil
    }

    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      // Create the repeat object based on the form values
      const repeat = formValues.repeatFrequency
        ? {
            frequency: formValues.repeatFrequency,
            dailyDate:
              formValues.repeatFrequency === "Daily"
                ? formValues.dailyDate
                : null,
            weeklyDays:
              formValues.repeatFrequency === "Weekly"
                ? formValues.weeklyDays
                : [],
            monthlyDays:
              formValues.repeatFrequency === "Monthly"
                ? formValues.monthlyDays
                : [],
          }
        : undefined;

      // Create the reminder object based on the form values
      const reminder =
        formValues.reminderFrequency && formValues.reminderStartDate
          ? {
              frequency: formValues.reminderFrequency,
              startDate: formValues.reminderStartDate,
            }
          : undefined;

      // Create the new task object
      const newTask = {
        title: formValues.title,
        description: formValues.description,
        category: formValues.category,
        assignTo: formValues.assignTo,
        priority: formValues.priority,
        dueDate: formValues.dueDate,
        attachments,
        repeat: repeat || null,
        reminder: reminder || null,
      };

      // Dispatch action to add the task
      dispatch(addTask(newTask, navigate));

      // Clear form fields
      setFormValues({
        title: "",
        description: "",
        category: "",
        assignTo: "",
        priority: "",
        dueDate: "",
        reminderFrequency: "",
        reminderStartDate: "",
        repeatFrequency: "",
        dailyDate: "",
        weeklyDays: [],
        monthlyDays: [],
        attachments: [],
      });
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      dispatch(addCategoryThunk(newCategory));
      setNewCategory("");
      setOpen(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormValues((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((item) => item !== value),
      }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMonthlyDayClick = (day) => {
    setFormValues((prev) => {
      const isSelected = prev.monthlyDays.includes(day);
      return {
        ...prev,
        monthlyDays: isSelected
          ? prev.monthlyDays.filter((d) => d !== day)
          : [...prev.monthlyDays, day],
      };
    });
  };

  const renderRepeatOptions = () => {
    switch (formValues.repeatFrequency) {
      case "Daily":
        return (
          <TextField
            name="dailyDate"
            label="Start Date"
            type="date"
            value={formValues.dailyDate}
            onChange={handleInputChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            style={{ marginTop: "16px" }}
          />
        );
      case "Weekly":
        return (
          <FormGroup>
            {[
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ].map((day) => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    value={day}
                    checked={formValues.weeklyDays.includes(day)}
                    onChange={handleInputChange}
                    name="weeklyDays"
                  />
                }
                label={day}
              />
            ))}
          </FormGroup>
        );
      case "Monthly":
        return (
          <Box>
            <Typography variant="h6" style={{ marginTop: "16px" }}>
              Select Days of the Month
            </Typography>
            <Grid container spacing={1} style={{ marginTop: "8px" }}>
              {Array.from({ length: 31 }, (_, i) => (
                <Grid item xs={2} sm={1} key={i + 1}>
                  <Box
                    onClick={() => handleMonthlyDayClick(i + 1)}
                    sx={{
                      width: 30,
                      height: 30,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      backgroundColor: formValues.monthlyDays.includes(i + 1)
                        ? "primary.main"
                        : "grey.300",
                      color: formValues.monthlyDays.includes(i + 1)
                        ? "white"
                        : "black",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: formValues.monthlyDays.includes(i + 1)
                          ? "primary.dark"
                          : "grey.400",
                      },
                    }}
                  >
                    {i + 1}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        );
      default:
        return null;
    }
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
              </Avatar>
              <Typography
                variant="h5"
                gutterBottom
                align="center"
                sx={{ textDecoration: "underline", marginLeft: "8px" }}
              >
                ADD NEW TASK
              </Typography>
            </div>

            <Stack spacing={3}>
              {/* Title */}
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
                  name="title"
                  variant="outlined"
                  label="Enter Title..."
                  required
                  fullWidth
                  value={formValues.title}
                  onChange={handleInputChange}
                  error={!!errors.title}
                  helperText={errors.title}
                />
              </Box>

              {/* Description */}
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
                  name="description"
                  variant="outlined"
                  label="Enter description..."
                  required
                  fullWidth
                  multiline
                  minRows={4}
                  value={formValues.description}
                  onChange={handleInputChange}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Box>

              {/* Category */}
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
                    name="category"
                    fullWidth
                    value={formValues.category}
                    onChange={handleInputChange}
                    error={!!errors.category}
                    helperText={errors.category}
                    select
                  >
                    {categories.map((cat, index) => (
                      <MenuItem key={index} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                    <MenuItem>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpen(true)}
                      >
                        Add Category
                      </Button>
                    </MenuItem>
                  </TextField>
                </FormControl>
                <Dialog open={open} onClose={() => setOpen(false)}>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="New Category"
                      fullWidth
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleAddCategory} color="primary">
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>

              {/* Assign To */}
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
                    name="assignTo"
                    fullWidth
                    select
                    value={formValues.assignTo}
                    onChange={handleInputChange}
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

              {/* Priority */}
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
                    name="priority"
                    label="Select Priority"
                    required
                    select
                    value={formValues.priority}
                    onChange={handleInputChange}
                    error={!!errors.priority}
                    helperText={errors.priority}
                    fullWidth
                  >
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                  </TextField>
                </FormControl>
              </Box>

              {/* Due Date and Time */}
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
                  name="dueDate"
                  type="datetime-local"
                  variant="outlined"
                  required
                  fullWidth
                  value={formValues.dueDate}
                  onChange={handleInputChange}
                  error={!!errors.dueDate}
                  helperText={errors.dueDate}
                />
              </Box>

              {/* Reminder */}
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
                    name="reminderFrequency"
                    label="Reminder Frequency (Optional)"
                    value={formValues.reminderFrequency}
                    onChange={handleInputChange}
                    select
                    fullWidth
                  >
                    <MenuItem value="">Select Frequency</MenuItem>
                    <MenuItem value="Daily">Daily</MenuItem>
                    <MenuItem value="Weekly">Weekly</MenuItem>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                  </TextField>
                  {formValues.reminderFrequency && (
                    <TextField
                      name="reminderStartDate"
                      label="Reminder Start Date"
                      type="datetime-local"
                      value={formValues.reminderStartDate}
                      onChange={handleInputChange}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      style={{ marginTop: "16px" }}
                      error={!!errors.reminderStartDate}
                      helperText={errors.reminderStartDate}
                    />
                  )}
                </FormControl>
              </Box>

              {/* Repeat */}
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  component="label"
                  htmlFor="repeat"
                >
                  Repeat
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    name="repeatFrequency"
                    label="Repeat Frequency (Optional)"
                    value={formValues.repeatFrequency}
                    onChange={handleInputChange}
                    select
                    fullWidth
                  >
                    <MenuItem value="">Select Frequency</MenuItem>
                    <MenuItem value="Daily">Daily</MenuItem>
                    <MenuItem value="Weekly">Weekly</MenuItem>
                    <MenuItem value="Monthly">Monthly</MenuItem>
                  </TextField>

                  {formValues.repeatFrequency && <>{renderRepeatOptions()}</>}
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
                  <Tooltip title="Record Audio">
                    <IconButton onClick={() => handleIconClick("audio")}>
                      {recording ? <StopCircleIcon /> : <MicIcon />}
                    </IconButton>
                  </Tooltip>
                  {recording && (
                    <Grid item>
                      <Typography>Recording: {counter} seconds</Typography>
                    </Grid>
                  )}
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

              {/* Submit Button */}
              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleSubmit}
                >
                  Add Task
                </Button>
                <audio ref={audioRef}></audio>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </PageContainer>
    </DashboardCard>
  );
};

export default Icons;
