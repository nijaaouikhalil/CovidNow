import {
  PATIENT_REPORT_CONTACTED_FAIL,
  PATIENT_REPORT_CONTACTED_REQUEST,
  PATIENT_REPORT_CONTACTED_RESET,
  PATIENT_REPORT_CONTACTED_SUCCESS,
} from "../constants/patientConstants";

export const patientReportContacted = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_REPORT_CONTACTED_REQUEST:
      return { loading: true };

    case PATIENT_REPORT_CONTACTED_SUCCESS:
      return { loading: false, success: action.payload };

    case PATIENT_REPORT_CONTACTED_FAIL:
      return { loading: false, error: action.payload };

    case PATIENT_REPORT_CONTACTED_RESET:
      return {};

    default:
      return state;
  }
};
