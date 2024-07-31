import {
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_ERRORS,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_ERROR,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  authError: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case UPDATE_USER_PROFILE_ERROR:
      return {
        ...state,
        authError: payload,
        loading: false,
      };
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        authError: payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        isAuthenticated: null,
        user: null,
        authError: null,
      };
    default:
      return state;
  }
}
