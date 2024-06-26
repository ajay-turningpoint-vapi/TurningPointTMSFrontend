import API from "./index.js";

export const login = (user) => {
  return API.post(`/users/login`, {
    emailID: user.emailID,
    password: user.password,
  });
};

export const register = (newUser) => {
  return API.post(`/users/register`, {
    userName: newUser.userName,
    department: newUser.department,
    emailID: newUser.emailID,
    password: newUser.password,
    role: newUser.role,
    reportingManager: newUser.reportingManager,
  });
};

export const getUsers = (user) => {
  return API.get(`/users/getReportingMangers`);
};

export const getProfile = () => {
  return API.get(`/users/profile`, {});
};

export const editedUserApi = (user) => {
  return API.put(`/users/profile`, user);
};

export const getTickets = () => {
  return API.get(`/tickets`);
};

export const getUsersTickets = () => {  
  return API.get(`/tickets/usersTickets`);
};
export const changeStatus = (id, status) => {
  return API.patch(`/tickets/${id}`, {
    status,
  });
};

export const changeAssigned = (id, assignToUsers) => {
  return API.put(`/tickets/${id}`, {
    assignToUsers,
  });
};

export const statusFilter = (status) => {
  return API.post(`/tickets/filterStatus`, {
    status,
  });
};

export const addNewTicket = (newTicket) => {
  return API.post(`/tickets`, newTicket);
};

export const deleteTicket = (id) => {
  return API.delete(`/tickets/${id}`);
};

export const addMessages = (formData) => {
  return API.post(`/tickets/addMessages`, formData);
};
