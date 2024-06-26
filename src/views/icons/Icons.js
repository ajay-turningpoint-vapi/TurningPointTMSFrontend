import React, { useEffect, useState } from "react";
import PageContainer from "../../components/container/PageContainer";

import AuthLogin from "../authentication/auth/AuthLogin";
import {
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
  const [reminder, setReminder] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

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

  const handleSubmit = () => {
    // Handle form submission logic
    const newTicket = {
      title,
      description,
      category,
      assignTo,
      priority,
      dueDate,
      reminder,
      attachments,
    };

    console.log("New Ticket: ", newTicket);

    dispatch(addTask(newTicket));

    // Navigate to another page or reset the form as needed
  };

  return (
    <PageContainer title="Icons" name="this is Icons">
      <Grid item display="flex" justifyContent="center" alignItems="center">
        <Card
          elevation={9}
          sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "800px" }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ textDecoration: "underline" }}
          >
            ADD NEW TICKET
          </Typography>

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
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                fullWidth
                multiline
                minRows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  input={<OutlinedInput label="Category" />}
                >
                  <MenuItem value="IT">IT</MenuItem>
                  <MenuItem value="Finance">Finance</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Sales">Sales</MenuItem>
                </Select>
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
                <InputLabel id="assign-to-users-label">
                  Assign To Users
                </InputLabel>
                <Select
                  labelId="assign-to-users-label"
                  id="assign-to-users"
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                  input={<OutlinedInput label="Assign To Users" />}
                >
                  {users.map((option) => (
                    <MenuItem key={option._id} value={option.emailID}>
                      {option.emailID}
                    </MenuItem>
                  ))}
                </Select>
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
                  label="Priority"
                  id="priority"
                  select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
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
                fullWidth
                value={dueDate}
                onChange={(e) => setDueDateTime(e.target.value)}
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
                  inputProps={{ "aria-label": "Without label" }}
                  label="Reminder (optional)"
                  id="reminder"
                  select
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                >
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                </TextField>
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
  );
};

export default Icons;
