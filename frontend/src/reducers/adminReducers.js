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

export const adminUpdateReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_USER_REQUEST:
      return { loading: true };

    case ADMIN_UPDATE_USER_SUCCESS:
      return { loading: false, success: true, profile: action.payload };

    case ADMIN_UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };

    case ADMIN_UPDATE_USER_RESET:
      return { profile: {} };

    default:
      return state;
  }
};

export const AdminListUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_LIST_USERS_REQUEST:
      return {
        loading: true,
      };

    case ADMIN_LIST_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };

    case ADMIN_LIST_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ADMIN_LIST_USERS_RESET:
      return {
        users: [],
      };

    default:
      return state;
  }
};
