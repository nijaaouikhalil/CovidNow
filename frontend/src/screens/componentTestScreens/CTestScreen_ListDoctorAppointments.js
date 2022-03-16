import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDoctorAppointments } from "../actions/doctorActions";

export const CTestScreen_ListDoctorsAppoinments = ({ patients }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  const doctorListAppointments = useSelector(
    (state) => state.doctorListAppointments
  );
  const { loading, error, appointments } = doctorListAppointments;

  useEffect(() => {
    if (!user_info) {
      navigate("/login");
    }
    dispatch(getDoctorAppointments());
  }, [dispatch, navigate, user_info]);

  return (
    <div className="d-flex flex-column mt-3 justify-content-center">
      <h4 className="my-3 ms-3">Scheduled Appointments</h4>
      <Table className="px-5" striped bordered hover variant="light" size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th className="dd-patient-email">Email</th>
            <th>Date</th>
            <th>Time</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {appointments && appointments.length > 0
            ? appointments.map((appointment, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {appointment.patientId
                    ? patients.find(
                      (patient) => patient._id === appointment.patientId
                    ).name
                    : "John"}
                </td>
                <td>
                  {appointment.patientId
                    ? patients.find(
                      (patient) => patient._id === appointment.patientId
                    ).lname
                    : "Doe"}
                </td>
                <td className="dd-patient-email">
                  {appointment.patientId
                    ? patients.find(
                      (patient) => patient._id === appointment.patientId
                    ).email
                    : "Johndoe@test.com"}
                </td>
                <td>
                  {new Date(appointment.appointmentDate).toLocaleDateString(
                    "en-US"
                  )}
                </td>
                <td>
                  {new Date(appointment.appointmentDate).toLocaleTimeString(
                    [],
                    {
                      timeStyle: "short",
                    }
                  )}
                </td>
                <td>
                  {appointment.patientId ? (
                    <Link
                      to={"/doctor/patientdetails/" + appointment.patientId}
                    >
                      More
                    </Link>
                  ) : (
                    <Link to={"/doctor/patientdetails/" + index}>More</Link>
                  )}
                </td>
              </tr>
            ))
            : ""}
        </tbody>
      </Table>
    </div>
  );
};
