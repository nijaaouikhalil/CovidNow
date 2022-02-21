import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DAILY_REPORTS_REQUEST,
  USER_DAILY_REPORTS_SUCCESS,
  USER_DAILY_REPORTS_FAIL,
  USER_DAILY_REPORTS_RESET,
} from "../constants/userConstants";
import axios from "axios";
import { BaseUrl } from "../utils/utils";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      BaseUrl + "/api/auth/signin",
      { username: email, password: password, email: email },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("user_info", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("user_info");
  dispatch({ type: USER_LOGOUT });
};

export const register = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      BaseUrl + "/api/auth/register",
      user,
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    });

    const {
      userLogin: { user_info },
    } = getState();
    user.userId = user_info.id;
    const config = {
      headers: {
        "Content-type": "application/json",
        "x-access-token": `${user_info.accessToken}`,
      },
    };

    const { data } = await axios.put(
      BaseUrl + `/api/verify/confirmDetails`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data.message,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.user,
    });

    localStorage.setItem("user_info", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { user_info },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        "x-access-token": `${user_info.accessToken}`,
      },
    };

    const { data } = await axios.get(BaseUrl + `/api/view/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDailyReports = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DAILY_REPORTS_REQUEST,
    });

    const {
      userLogin: { user_info },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        "x-access-token": `${user_info.accessToken}`,
      },
    };

    const { data } = await axios.get(
      BaseUrl + `/api/view/${id}/report`,
      config
    );
    dispatch({
      type: USER_DAILY_REPORTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DAILY_REPORTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
