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
  ADMIN_LIST_ALL_USERS_RESET,
} from "../constants/adminConstants";

export const adminUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_USER_REQUEST:
      return { loading: true };

    case ADMIN_UPDATE_USER_SUCCESS:
      return { loading: false, success: true, message: action.payload.message };

    case ADMIN_UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };

    case ADMIN_UPDATE_USER_RESET:
      return {};

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
export const AdminListAllUsersReducer = (
  state = { all_users: [], doctors: [] },
  action
) => {
  switch (action.type) {
    case ADMIN_LIST_ALL_USERS_REQUEST:
      return {
        loading: true,
      };

    case ADMIN_LIST_ALL_USERS_SUCCESS:
      return {
        loading: false,
        all_users: action.payload,
        doctors: action.payload.filter(
          (user) => user.roles && user.roles.name == "doctor"
        ),
      };

    case ADMIN_LIST_ALL_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ADMIN_LIST_ALL_USERS_RESET:
      return {
        all_users: [],
      };

    default:
      return state;
  }
};
