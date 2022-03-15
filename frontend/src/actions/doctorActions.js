import axios from "axios";
import {
  DOCTOR_LIST_APPOINTMENTS_FAIL,
  DOCTOR_LIST_APPOINTMENTS_REQUEST,
  DOCTOR_LIST_APPOINTMENTS_SUCCESS,
  DOCTOR_LIST_PATIENTS_FAIL,
  DOCTOR_LIST_PATIENTS_REQUEST,
  DOCTOR_LIST_PATIENTS_SUCCESS,
  DOCTOR_VIEW_REPORT_FAIL,
  DOCTOR_VIEW_REPORT_REQUEST,
  DOCTOR_VIEW_REPORT_SUCCESS,
} from "../constants/doctorConstants";
import { BaseUrl } from "../utils/utils";

export const DoctorlistPatients = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_LIST_PATIENTS_REQUEST,
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

    const { data } = await axios.get(BaseUrl + `/api/view/`, config);

    dispatch({
      type: DOCTOR_LIST_PATIENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_LIST_PATIENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getDoctorAppointments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_LIST_APPOINTMENTS_REQUEST,
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

    const { data } = await axios.get(
      BaseUrl + `/api/appointmentsWithPatients`,
      config
    );

    dispatch({
      type: DOCTOR_LIST_APPOINTMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_LIST_APPOINTMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const MarkReportViewed = (reportId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DOCTOR_VIEW_REPORT_REQUEST,
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
    console.log(reportId);
    const { data } = await axios.put(
      BaseUrl + `/api/view/${user_info.id}/report/viewed/${reportId.id}`,
      {},
      config
    );

    dispatch({
      type: DOCTOR_VIEW_REPORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DOCTOR_VIEW_REPORT_FAIL,
      payload:
        error.response && error.response.data
          ? error.response.data
          : error.message,
    });
  }
};
