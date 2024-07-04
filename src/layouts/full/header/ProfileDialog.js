import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Box,
  Avatar,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import ProfileImg from "../../../assets/images/profile/user-1.jpg";

import { useSelector } from "react-redux";
const ProfileDialog = ({ open, onClose, profile }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Box display="flex" justifyContent="center" marginBottom={2}>
              <Avatar
                src={ProfileImg}
                alt="Profile Image"
                sx={{ width: 150, height: 150 }}
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  Name
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{profile.name}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{profile.email}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  Role
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  {profile.role }
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  Department
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{profile.department}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

// Usage example
const ProfilePage = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [profile, setProfile] = React.useState({
    name: "",
    email: "",
    role: "",
    department: "",
  });
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setProfile({
      name: user?.userName,
      email: user?.emailID,
      role: user?.role,
      department: user?.department,
    });
  }, []);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <span onClick={handleDialogOpen}>View Profile</span>
      <ProfileDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        profile={profile}
      />
    </div>
  );
};

export default ProfilePage;
