import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) setAuthToken(token);

  try {
    const res = await axios.get("/api/v1/auth");
    dispatch({ type: USER_LOADED, payload: res.data.user });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/v1/users", body, config);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, "danger"));
      });
    }
    dispatch({ type: REGISTER_FAIL });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/v1/auth/login", body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors)
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });

    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout user
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};
