import {
  DOCTOR_LIST_PATIENTS_FAIL,
  DOCTOR_LIST_PATIENTS_REQUEST,
  DOCTOR_LIST_PATIENTS_RESET,
  DOCTOR_LIST_PATIENTS_SUCCESS,
  DOCTOR_SCHEDULE_APPOINTMENT_FAIL,
  DOCTOR_SCHEDULE_APPOINTMENT_RESET,
  DOCTOR_SCHEDULE_APPOINTMENT_SUCCESS,
  DOCTOR_SCHEDULE_APPOINTMENT_REQUEST,
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

export const doctorScheduleAppointmentReducer = (
  state = { patients: [] },
  action
) => {
  switch (action.type) {
    case DOCTOR_SCHEDULE_APPOINTMENT_REQUEST:
      return {
        loading: true,
      };

    case DOCTOR_SCHEDULE_APPOINTMENT_SUCCESS:
      return {
        loading: false,
        appointment: action.payload,
        success: true,
      };

    case DOCTOR_SCHEDULE_APPOINTMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DOCTOR_SCHEDULE_APPOINTMENT_RESET:
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
