import axios from "axios";
import {
  GET_TASKS,
  GET_TASK,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  TASK_ERROR,
} from "./types";
import { ip } from "../utils/ipconfig";

// Get tasks
export const getTasks = () => async (dispatch) => {
  try {
    const res = await axios.get(`${ip}/api/tasks`);

    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get task by ID
export const getTask = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${ip}/api/tasks/${id}`);

    dispatch({
      type: GET_TASK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add task
export const addTask = (formData) => async (dispatch) => {
  try {
    const res = await axios.post(`${ip}/api/tasks`, formData);

    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.data.message },
    });
  }
};

// Update task
export const updateTask = (id, formData) => async (dispatch) => {
  try {
    const res = await axios.put(`${ip}/api/tasks/${id}`, formData);

    dispatch({
      type: UPDATE_TASK,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete task
export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`${ip}/api/tasks/${id}`);

    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
