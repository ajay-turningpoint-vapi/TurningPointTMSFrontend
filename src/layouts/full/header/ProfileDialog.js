import React, { useEffect, useState } from "react";
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
  TextField,
  MenuItem,
  ListItemIcon,
  Select,
} from "@mui/material";
import ProfileImg from "../../../assets/images/profile/user-1.jpg";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateUserProfile } from "../../../actions/userActions";
import { IconUser } from "@tabler/icons-react";
import showLottiePopup from "../../../views/utilities/LottiePopup";
const ProfileDialog = ({ open, onClose, profile, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editProfile, setEditProfile] = useState(profile);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEditProfile(profile);
  }, [profile]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleDepartmentChange = (e) => {
    setEditProfile((prevProfile) => ({
      ...prevProfile,
      department: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSave = () => {
    onUpdate({ ...editProfile, password });
    setEditMode(false);
  };

  const handleClose = () => {
    setEditMode(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
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
                {editMode ? (
                  <TextField
                    fullWidth
                    name="userName"
                    value={editProfile.userName}
                    onChange={handleEditChange}
                  />
                ) : (
                  <Typography variant="body1">{profile.userName}</Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="emailID"
                    value={editProfile.emailID}
                    onChange={handleEditChange}
                  />
                ) : (
                  <Typography variant="body1">{profile.emailID}</Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  Phone
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {editMode ? (
                  <TextField
                    fullWidth
                    name="phone"
                    value={editProfile.phone}
                    onChange={handleEditChange}
                  />
                ) : (
                  <Typography variant="body1">{profile.phone}</Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  Role
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{profile.role}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" gutterBottom>
                  Department
                </Typography>
              </Grid>
              <Grid item xs={6}>
                {editMode ? (
                  <Select
                    fullWidth
                    name="department"
                    value={editProfile.department}
                    onChange={handleDepartmentChange}
                  >
                    <MenuItem value="Sales">Sales</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="HR">HR</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="IT">IT</MenuItem>
                  </Select>
                ) : (
                  <Typography variant="body1">{profile.department}</Typography>
                )}
              </Grid>
              {editMode && (
                <>
                  <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                      Change Password
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        {editMode ? (
          <>
            <Button onClick={handleSave} color="primary">
              Save
            </Button>
            <Button onClick={() => setEditMode(false)} color="secondary">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button onClick={() => setEditMode(true)} color="primary">
              Edit
            </Button>
            <Button onClick={handleClose} color="secondary">
              Close
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [profile, setProfile] = useState({
    userName: "",
    emailID: "",
    phone: "",
    role: "",
    department: "",
  });
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setProfile({
      userName: user?.userName,
      emailID: user?.emailID,
      phone: user?.phone,
      role: user?.role,
      department: user?.department,
    });
  }, [user]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleUpdateProfile = async (updatedProfile) => {
    dispatch(updateUserProfile(updatedProfile));
  };

  return (
    <div>
      <span
        onClick={handleDialogOpen}
        style={{ display: "flex", alignItems: "center" }}
      >
        <ListItemIcon>
          <IconUser width={20} />
        </ListItemIcon>
        View Profile
      </span>
      <ProfileDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        profile={profile}
        onUpdate={handleUpdateProfile}
      />
    </div>
  );
};

export default ProfilePage;
