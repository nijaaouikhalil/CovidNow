import {
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_RESET,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_LIST_USERS_REQUEST,
  ADMIN_LIST_USERS_SUCCESS,
  ADMIN_LIST_USERS_FAIL,
  ADMIN_LIST_USERS_RESET,
} from "../constants/adminConstants";
import axios from "axios";

export const AdminUpdateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_UPDATE_USER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/update/`, user, config);

    dispatch({
      type: ADMIN_UPDATE_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
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
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/admin/users`, config);

    dispatch({
      type: ADMIN_LIST_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LIST_USERS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
