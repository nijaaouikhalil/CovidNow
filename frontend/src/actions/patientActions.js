import axios from "axios";
import {
  PATIENT_REPORT_CONTACTED_FAIL,
  PATIENT_REPORT_CONTACTED_REQUEST,
  PATIENT_REPORT_CONTACTED_RESET,
  PATIENT_REPORT_CONTACTED_SUCCESS,
} from "../constants/patientConstants";

import { BaseUrl } from "../utils/utils";

export const reportContactedPatients =
  (person) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PATIENT_REPORT_CONTACTED_REQUEST,
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

      const { data } = await axios.post(
        BaseUrl + `/api/contactedPeople`,
        person,
        config
      );

      dispatch({
        type: PATIENT_REPORT_CONTACTED_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PATIENT_REPORT_CONTACTED_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
