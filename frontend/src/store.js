import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  AdminListUsersReducer,
  adminUpdateReducer,
} from "./reducers/adminReducers";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  AdminListUsers: AdminListUsersReducer,
  adminUpdate: adminUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem("user_info")
  ? JSON.parse(localStorage.getItem("user_info"))
  : null;

const initialState = { userLogin: { user_info: userInfoFromStorage } };
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
