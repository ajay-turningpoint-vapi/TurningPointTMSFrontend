import { Category } from "@mui/icons-material";
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
} from "../actions/types";

const initialState = {
  tasks: [],
  task: null,
  loading: true,
  error: {},
  categories: [],
  categoryError: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: payload,
        loading: false,
      };
    case GET_TASK:
      return {
        ...state,
        task: payload,
        loading: false,
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [payload, ...state.tasks],
        loading: false,
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === payload._id ? payload : task
        ),
        loading: false,
      };

    case UPDATE_TASK_STATUS_REQUEST:
      return { ...state, loading: true };
    case UPDATE_TASK_STATUS_SUCCESS:
      return { ...state, loading: false, task: action.payload };
    case UPDATE_TASK_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== payload),
        loading: false,
      };
    case TASK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case FETCH_CATEGORIES_FAILURE:
      return { ...state, loading: false, categoryError: action.payload };
    case ADD_CATEGORY_REQUEST:
      return { ...state, loading: true };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [...state.categories, action.payload],
      };
    case ADD_CATEGORY_FAILURE:
      return { ...state, loading: false, categoryError: action.payload };
    default:
      return state;
  }
}
