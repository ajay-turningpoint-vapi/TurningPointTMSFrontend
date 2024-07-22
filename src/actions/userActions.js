import axios from "axios";
import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  USER_ERROR,
  CREATE_USER,
} from "./types";
import { ip } from "../utils/ipconfig";
import showLottiePopup from "../views/utilities/LottiePopup";

// Get users
export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${ip}/api/users`);

    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { message: err.response?.data.message },
    });
  }
};

export const createUsers = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${ip}/api/users`, formData);

    dispatch({
      type: CREATE_USER,
      payload: res.data,
    });

    if (res.data) {
      await showLottiePopup("New User Created");
    }
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { message: err.response?.data.message },
    });
  }
};

export const userStatus = async () => {
  return await axios.get(`${ip}/api/dashboard/user`);
};

export const teamLeaderStatus = async () => {
  return await axios.get(`${ip}/api/dashboard/teamleader`);
};

// Get user by ID
export const getUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${ip}/api/users/${id}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add user
export const addUser = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${ip}/api/users`, formData);

    dispatch({
      type: ADD_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update user
export const updateUser = (id, formData) => async (dispatch) => {
  try {
    const res = await axios.put(`${ip}/api/users/${id}`, formData);
    if (res.data) {
      showLottiePopup("User Updated!!");
    }
    dispatch({
      type: UPDATE_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(`${ip}/api/users/${id}`);

    dispatch({
      type: DELETE_USER,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const updateUserProfile = async (formData) => {
  const res = await axios.put(`${ip}/api/users/profile`, formData);
  return res;
};
