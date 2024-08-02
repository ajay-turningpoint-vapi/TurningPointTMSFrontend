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
  ADD_CATEGORY,
} from "./types";
import { ip } from "../utils/ipconfig";
import showLottiePopup from "../views/utilities/LottiePopup";

// Get tasks
export const getTasks =
  (isDelayed = false) =>
  async (dispatch) => {
    try {
      // Construct the URL based on whether isDelayed is true or false
      const url = isDelayed
        ? `${ip}/api/tasks?isDelayed=true`
        : `${ip}/api/tasks`;

      const res = await axios.get(url);

      dispatch({
        type: GET_TASKS,
        payload: res.data.tasks,
      });
    } catch (err) {
      dispatch({
        type: TASK_ERROR,
        payload: { message: err.response?.data.message },
      });
    }
  };
export const getMyTasks = () => async (dispatch) => {
  try {
    const res = await axios.get(`${ip}/api/tasks/mytasks`);

    dispatch({
      type: GET_TASKS,
      payload: res.data.tasks,
    });
  } catch (err) {
    dispatch({
      type: TASK_ERROR,
      payload: { message: err.response?.data.message },
    });
  }
};

export const getDelegatedTasks = () => async (dispatch) => {
  try {
    const res = await axios.get(`${ip}/api/tasks/delegatedtasks`);

    dispatch({
      type: GET_TASKS,
      payload: res.data.tasks,
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
export const addTask = (formData, navigate) => async (dispatch) => {
  try {
    const res = await axios.post(`${ip}/api/tasks`, formData);

    dispatch({
      type: ADD_TASK,
      payload: res.data,
    });
    console.log(res);
    if (res) await showLottiePopup("New Task Created");
    navigate("/all-tasks");
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
    const res = await axios.patch(`${ip}/api/tasks/${id}`, formData);
    if (res.data) {
      showLottiePopup("Task Updated");
    }

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

export const updateTaskStatus = (taskId, newStatus, reason, attachments) => {
  return async (dispatch) => {
    dispatch(updateTaskStatusRequest());
    try {
      const response = await axios.put(`${ip}/api/tasks/${taskId}/status`, {
        newStatus,
        reason,
        changesAttachments: attachments,
      });
      if (response.data) {
        showLottiePopup("Task Updated");
      }

      dispatch(updateTaskStatusSuccess(response.data.task));
      dispatch(getTasks());
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

//add category
export const addCategory = (category) => ({
  type: ADD_CATEGORY,
  payload: category,
});
export const addCategoryThunk = (category) => {
  return (dispatch, getState) => {
    // Simulate an async operation
    setTimeout(() => {
      dispatch(addCategory(category));
    }, 500);
  };
};
