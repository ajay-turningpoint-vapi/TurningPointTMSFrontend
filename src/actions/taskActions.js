import axios from "axios";
import {
  GET_TASKS,
  GET_TASK,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  TASK_ERROR,
  UPDATE_TASK_STATUS_REQUEST,
  UPDATE_TASK_STATUS_SUCCESS,
  UPDATE_TASK_STATUS_FAILURE,
} from "./types";
import { ip } from "../utils/ipconfig";
import showLottiePopup from "../views/utilities/LottiePopup";

// Get tasks
export const getTasks = () => async (dispatch) => {
  try {
    const res = await axios.get(`${ip}/api/tasks`);
    console.log(res);
    dispatch({
      type: GET_TASKS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { message: err.response?.data.message },
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
    await showLottiePopup("New Task Created");
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
  console.log(id, formData);
  try {
    const res = await axios.patch(`${ip}/api/tasks/${id}`, formData);

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

//update status

const updateTaskStatusRequest = () => ({
  type: UPDATE_TASK_STATUS_REQUEST,
});

const updateTaskStatusSuccess = (task) => ({
  type: UPDATE_TASK_STATUS_SUCCESS,
  payload: task,
});

const updateTaskStatusFailure = (error) => ({
  type: UPDATE_TASK_STATUS_FAILURE,
  payload: error,
});

export const updateTaskStatus = (
  taskId,
  newStatus,
  reason,
  changesAttachments,
  updatedTaskBy
) => {
  return async (dispatch) => {
    dispatch(updateTaskStatusRequest());
    try {
      const response = await axios.put(`${ip}/api/tasks/${taskId}/status`, {
        newStatus,
        reason,
        changesAttachments,
       
      });
      showLottiePopup("Task Updated");
      dispatch(updateTaskStatusSuccess(response.data.task));
    } catch (error) {
      dispatch(updateTaskStatusFailure(error.message));
    }
  };
};

// Delete task
export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`${ip}/api/tasks/${id}`);

    dispatch({
      type: DELETE_TASK,
      payload: id,
    });
    showLottiePopup("Task Deleted Successfully!");
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
