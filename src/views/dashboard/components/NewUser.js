import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
} from "@mui/material";
import DashboardCard from "../../../components/shared/DashboardCard";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { makeStyles } from "@mui/styles";
import showLottiePopup from "../../utilities/LottiePopup";
import { createUsers } from "../../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      marginBottom: theme.spacing(2),
    },
  },
  card: {
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    margin: "auto",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const NewUser = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [formData, setFormData] = useState({
    userName: "",
    department: "",
    emailID: "",
    phone: "",
    role: "",
    password: "",
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createUsers(formData));
  };

  return (
    <DashboardCard title="Create User">
      <Card className={classes.card}>
        <CardContent>
          <Avatar className={classes.avatar}>
            <GroupAddIcon />
          </Avatar>
          <Typography variant="h5" align="center" gutterBottom>
            Create New User
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            className={classes.root}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="userName"
                  label="User Name"
                  value={formData.userName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="emailID"
                  label="Email ID"
                  type="email"
                  value={formData.emailID}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <MenuItem value="IT">IT</MenuItem>
                    <MenuItem value="Finance">Finance</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="HR">HR</MenuItem>
                    <MenuItem value="Sales">Sales</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="TeamLeader">TeamLeader</MenuItem>
                    <MenuItem value="User">User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
          
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Create User
            </Button>
          </Box>
        </CardContent>
      </Card>
    </DashboardCard>
  );
};

export default NewUser;
