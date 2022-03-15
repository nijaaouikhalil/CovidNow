import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
import {
  AdminListUsersReducer,
  adminUpdateReducer,
  AdminListAllUsersReducer,
  FlagCovidReducer,
} from "./reducers/adminReducers";
import {
  doctorListAppointmentsReducer,
  doctorListPatientsReducer,
  doctorScheduleAppointmentReducer,
} from "./reducers/doctorReducers";
import { patientReportContacted } from "./reducers/patientReducers";
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  AdminListUsers: AdminListUsersReducer,
  adminUpdate: adminUpdateReducer,
  doctorListPatients: doctorListPatientsReducer,
  AdminListAllUsers: AdminListAllUsersReducer,
  userDetails: userDetailsReducer,
  FlagCovid: FlagCovidReducer,
  patientReportContacted: patientReportContacted,
  doctorScheduleAppointment: doctorScheduleAppointmentReducer,
  doctorListAppointments: doctorListAppointmentsReducer,
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
