import {
  DOCTOR_LIST_PATIENTS_FAIL,
  DOCTOR_LIST_PATIENTS_REQUEST,
  DOCTOR_LIST_PATIENTS_RESET,
  DOCTOR_LIST_PATIENTS_SUCCESS,
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
