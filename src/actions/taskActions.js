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
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
} from "./types";
import { ip } from "../utils/ipconfig";
import showLottiePopup from "../views/utilities/LottiePopup";

// Get tasks
export const getTasks = () => async (dispatch) => {
  try {
    const res = await axios.get(`${ip}/api/tasks`);

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

export const getDelayedTasks = () => async (dispatch) => {
  try {
    const res = await axios.get(`${ip}/api/tasks/delayed-tasks`);

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

export const getOverdueTasks = () => async (dispatch) => {
  try {
    const res = await axios.get(`${ip}/api/tasks/overdue-tasks`);

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

export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

export const addCategoryRequest = () => ({
  type: ADD_CATEGORY_REQUEST,
});

export const addCategorySuccess = (category) => ({
  type: ADD_CATEGORY_SUCCESS,
  payload: category,
});

export const addCategoryFailure = (error) => ({
  type: ADD_CATEGORY_FAILURE,
  payload: error,
});

export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesRequest());
  try {
    const response = await axios.get(`${ip}/api/category`);
    dispatch(fetchCategoriesSuccess(response.data.categories));
  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message));
  }
};

export const addCategory = (categoryName) => async (dispatch) => {
  dispatch(addCategoryRequest());
  try {
    const response = await axios.post(`${ip}/api/category`, {
      name: categoryName,
    });
 
    
    dispatch(addCategorySuccess(response.data.name));
  } catch (error) {
    dispatch(addCategoryFailure(error.message));
  }
};
