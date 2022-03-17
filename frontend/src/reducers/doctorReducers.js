import {
  DOCTOR_LIST_PATIENTS_FAIL,
  DOCTOR_LIST_PATIENTS_REQUEST,
  DOCTOR_LIST_PATIENTS_RESET,
  DOCTOR_LIST_PATIENTS_SUCCESS,
  DOCTOR_VIEW_REPORT_FAIL,
  DOCTOR_VIEW_REPORT_RESET,
  DOCTOR_VIEW_REPORT_SUCCESS,
  DOCTOR_VIEW_REPORT_REQUEST,
  DOCTOR_LIST_APPOINTMENTS_REQUEST,
  DOCTOR_LIST_APPOINTMENTS_SUCCESS,
  DOCTOR_LIST_APPOINTMENTS_FAIL,
  DOCTOR_LIST_APPOINTMENTS_RESET,
} from "../constants/doctorConstants";

export const doctorListPatientsReducer = (state = { patients: [] }, action) => {
  switch (action.type) {
    case DOCTOR_LIST_PATIENTS_REQUEST:
      return {
        loading: true,
      };

    case DOCTOR_LIST_PATIENTS_SUCCESS:
      return {
        loading: false,
        patients: action.payload,
      };

    case DOCTOR_LIST_PATIENTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DOCTOR_LIST_PATIENTS_RESET:
      return {
        patients: [],
      };

    default:
      return state;
  }
};

export const doctorViewReportReducer = (state = { report: {} }, action) => {
  switch (action.type) {
    case DOCTOR_VIEW_REPORT_REQUEST:
      return {
        loading: true,
      };

    case DOCTOR_VIEW_REPORT_SUCCESS:
      return {
        loading: false,
        report: action.payload,
        success: true,
      };

    case DOCTOR_VIEW_REPORT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DOCTOR_VIEW_REPORT_RESET:
      return {};

    default:
      return state;
  }
};

export const doctorListAppointmentsReducer = (
  state = { appointments: [] },
  action
) => {
  switch (action.type) {
    case DOCTOR_LIST_APPOINTMENTS_REQUEST:
      return {
        loading: true,
      };

    case DOCTOR_LIST_APPOINTMENTS_SUCCESS:
      return {
        loading: false,
        appointments: action.payload,
      };

    case DOCTOR_LIST_APPOINTMENTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DOCTOR_LIST_APPOINTMENTS_RESET:
      return {
        appointments: [],
      };

    default:
      return state;
  }
};
