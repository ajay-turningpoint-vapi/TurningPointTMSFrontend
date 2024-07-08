import React, { useEffect, useState } from "react";
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
  IconButton,
} from "@mui/material";
import DashboardCard from "../../../components/shared/DashboardCard";

import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../actions/userActions";
const ProductPerformance = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [reportingManagers, setReportingManagers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleEditClick = async (user) => {
    setEditingUserId(user._id);
    setEditedUser({ ...user });
    try {
      const response = await getUsers(); // Assuming getUsers fetches all users including potential reporting managers
      setReportingManagers(response.data);
    } catch (error) {
      console.error("Error fetching reporting managers:", error);
    }
  };

  const handleCancelClick = () => {
    setEditingUserId(null);
    setEditedUser({});
  };

  const handleSaveClick = async () => {
    // await dispatch(updateUser(editedUser._id, editedUser));
    setEditingUserId(null);
  };

  const handleDeleteClick = (userId) => {
    // Handle delete logic here, e.g., make an API call to delete the user
    const updatedUsers = users.filter((user) => user._id !== userId);
    // setUsers(updatedUsers);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.emailID.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardCard title="All Users">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          size="small"
          sx={{ minWidth: 300 }}
        />
      </Box>
      <Box sx={{ overflow: "auto", width: "100%" }}>
        <Table aria-label="simple table" sx={{ whiteSpace: "nowrap", mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Email Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Phone
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Department
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Role
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Reporting Manager
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Created At
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {index + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  {editingUserId === user._id ? (
                    <TextField
                      name="userName"
                      value={editedUser.userName}
                      onChange={handleInputChange}
                      size="small"
                    />
                  ) : (
                    <Typography variant="subtitle2" fontWeight={600}>
                      {user.userName}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {editingUserId === user._id ? (
                    <TextField
                      name="emailID"
                      value={editedUser.emailID}
                      onChange={handleInputChange}
                      size="small"
                    />
                  ) : (
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      fontWeight={400}
                    >
                      {user.emailID}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {editingUserId === user._id ? (
                    <TextField
                      name="phone"
                      value={editedUser.phone}
                      onChange={handleInputChange}
                      size="small"
                    />
                  ) : (
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                      {user.phone}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {editingUserId === user._id ? (
                    <Select
                      name="department"
                      value={editedUser.department}
                      onChange={handleInputChange}
                      size="small"
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value={"Admin"}>Admin</MenuItem>
                      <MenuItem value={"IT"}>IT</MenuItem>
                      <MenuItem value={"HR"}>HR</MenuItem>
                      <MenuItem value={"Finance"}>Finance</MenuItem>
                      <MenuItem value={"Sales"}>Sales</MenuItem>
                      <MenuItem value={"User"}>User</MenuItem>
                    </Select>
                  ) : (
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                      {user.department}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {editingUserId === user._id ? (
                    <Select
                      name="role"
                      value={editedUser.role}
                      onChange={handleInputChange}
                      size="small"
                      sx={{ minWidth: 120 }}
                    >
                      <MenuItem value={"Admin"}>Admin</MenuItem>
                      <MenuItem value={"User"}>User</MenuItem>
                      <MenuItem value={"TeamLeader"}>TeamLeader</MenuItem>
                    </Select>
                  ) : (
                    <Chip
                      sx={{
                        px: "4px",
                        backgroundColor: "green",
                        color: "#fff",
                      }}
                      size="small"
                      label={user.role}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {editingUserId === user._id ? (
                    <Select
                      name="reportingTo"
                      value={editedUser.reportingTo}
                      onChange={handleInputChange}
                      size="small"
                      sx={{ minWidth: 120 }}
                    >
                     
                        <MenuItem >
                         self
                        </MenuItem>
                    
                    </Select>
                  ) : (
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                      {user.reportingTo}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {moment(user.createdStamp).fromNow()}
                  </Typography>
                </TableCell>
                <TableCell>
                  {editingUserId === user._id ? (
                    <>
                      <IconButton onClick={handleSaveClick} color="primary">
                        <SaveIcon />
                      </IconButton>
                      <IconButton onClick={handleCancelClick} color="secondary">
                        <CancelIcon />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton
                        onClick={() => handleEditClick(user)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(user._id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default ProductPerformance;
