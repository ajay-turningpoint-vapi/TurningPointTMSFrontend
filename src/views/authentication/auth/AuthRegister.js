import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
} from "@mui/material";
import { connect, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { register, clearErrors } from "../../../actions/authActions";

import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import { Stack } from "@mui/system";

const departments = ["Admin", "IT", "HR", "Finance", "Sales", "Service"];

const AuthRegister = ({
  title,
  subtitle,
  subtext,
  register,
  clearErrors,
  isAuthenticated,
}) => {
  const { authError } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [userName, setUsername] = useState("");
  const [department, setDepartment] = useState("");
  const [emailID, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    clearErrors();
  }, [clearErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !department || !emailID || !password || !phone) {
      setError("All fields are required");
      return;
    }
    try {
      register({
        userName,
        department,
        emailID,
        phone,
        password,
        role: "TeamLeader",
      });
    } catch (error) {
      alert(error);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      {authError && (
        <Alert severity="error" onClose={() => setError("")} sx={{ mb: 2 }}>
          {authError}
        </Alert>
      )}
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <Box>
        <Stack spacing={3}>
          <CustomTextField
            id="userName"
            label="Username"
            variant="outlined"
            fullWidth
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />

          <CustomTextField
            id="emailID"
            label="Email Address"
            variant="outlined"
            fullWidth
            value={emailID}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomTextField
            id="phone"
            type="tel"
            label="Enter Phone"
            variant="outlined"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="department-label">Department</InputLabel>
            <Select
              labelId="department-label"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              label="Department"
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <CustomTextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>
        <Button
          color="primary"
          style={{
            marginTop: "10px",
          }}
          variant="contained"
          size="large"
          fullWidth
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
      {subtitle}
    </>
  );
};
AuthRegister.propTypes = {
  register: PropTypes.func.isRequired,
  authError: PropTypes.string,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  authError: state.auth.authError,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, clearErrors })(
  AuthRegister
);
