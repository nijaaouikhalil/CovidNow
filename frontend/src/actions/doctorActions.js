import axios from "axios";
import {
  DOCTOR_LIST_PATIENTS_FAIL,
  DOCTOR_LIST_PATIENTS_REQUEST,
  DOCTOR_LIST_PATIENTS_SUCCESS,
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
