import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";

const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const mediaRecorderRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioPlayer, setAudioPlayer] = useState(null);

  useEffect(() => {
    if (audioUrl && audioPlayer) {
      audioPlayer.src = audioUrl;
      audioPlayer.play();
    }
  }, [audioUrl, audioPlayer]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        const url = URL.createObjectURL(event.data);
        setRecordings((prevRecordings) => [
          ...prevRecordings,
          { url, name: `Recording ${prevRecordings.length + 1}` },
        ]);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playRecording = (url) => {
    if (audioPlayer) {
      audioPlayer.pause();
      audioPlayer.src = "";
    }
    setAudioUrl(url);
    setAudioPlayer(new Audio(url));
  };

  const deleteRecording = (index) => {
    setRecordings((prevRecordings) =>
      prevRecordings.filter((_, i) => i !== index)
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Voice Recorder
      </Typography>
      <Button
        variant="contained"
        color={isRecording ? "secondary" : "primary"}
        startIcon={isRecording ? <StopIcon /> : <MicIcon />}
        onClick={isRecording ? stopRecording : startRecording}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
      <List>
        {recordings.map((recording, index) => (
          <ListItem key={index}>
            <ListItemText primary={recording.name} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="play"
                onClick={() => playRecording(recording.url)}
              >
                <PlayArrowIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteRecording(index)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default VoiceRecorder;
