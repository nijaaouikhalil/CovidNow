import {
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_RESET,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_LIST_USERS_REQUEST,
  ADMIN_LIST_USERS_SUCCESS,
  ADMIN_LIST_USERS_FAIL,
  ADMIN_LIST_USERS_RESET,
  ADMIN_LIST_ALL_USERS_REQUEST,
  ADMIN_LIST_ALL_USERS_SUCCESS,
  ADMIN_LIST_ALL_USERS_FAIL,
  FLAG_USER_COVID_REQUEST,
  FLAG_USER_COVID_SUCCESS,
  FLAG_USER_COVID_RESET,
  FLAG_USER_COVID_FAIL,
} from "../constants/adminConstants";
import axios from "axios";
import { BaseUrl } from "../utils/utils";

export const AdminUpdateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_USER_REQUEST,
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

    const { data } = await axios.put(
      BaseUrl + `/api/verify/admin`,
      user,
      config
    );

    dispatch({
      type: ADMIN_UPDATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const AdminlistUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_LIST_USERS_REQUEST,
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

    const { data } = await axios.get(BaseUrl + `/api/verify/admin`, config);

    dispatch({
      type: ADMIN_LIST_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LIST_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const ListAllUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_LIST_ALL_USERS_REQUEST,
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

    const { data } = await axios.get(BaseUrl + `/api/view/`, config);

    dispatch({
      type: ADMIN_LIST_ALL_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LIST_ALL_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const UpdateCovidStatus = (status) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FLAG_USER_COVID_REQUEST,
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

    const { data } = await axios.put(
      BaseUrl + `/api/view/${status.id}/flagcovid`,
      status,
      config
    );

    dispatch({
      type: FLAG_USER_COVID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FLAG_USER_COVID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
