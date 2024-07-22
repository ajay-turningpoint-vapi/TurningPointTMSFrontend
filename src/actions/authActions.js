import axios from "axios";
import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  USER_LOADED,
  CLEAR_ERRORS,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { ip } from "../utils/ipconfig";

// Register User
export const register =
  ({ userName, department, emailID, phone, password, role }) =>
  async (dispatch) => {
    try {
      const res = await axios.post(`${ip}/api/auth/register`, {
        userName,
        department,
        emailID,
        phone,
        password,
        role,
      });

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      console.log(err);
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.message,
      });
    }
  };

// Login User
export const login =
  ({ emailID, password }) =>
  async (dispatch) => {
    try {
      const res = await axios.post(`${ip}/api/auth/login`, {
        emailID,
        password,
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (err) {
      console.log("err", err);
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.message,
      });
    }
  };

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(`${ip}/api/users`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log("err", err);
    // dispatch({
    //   type: AUTH_ERROR,
    // });
  }
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
