import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FloatingLabel, Form } from "react-bootstrap";
import { BaseUrl } from "../utils/utils";
import axios from "axios";
import Loader from "./Loader";
import Message from "./Message";

export const CTestScreen_CreateNewAppointment = ({ patients }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;

  const [appointmentDate, setDateTime] = useState(
    new Date().setHours(new Date().getHours(), 0)
  );
  const [patient, setPatient] = useState(null);
  const [description, setDescription] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const minStartTime = new Date().setHours(8, 0);
  const maxEndTime = new Date().setHours(20, 1);

  const [updating, setUpdating] = useState(false);
  const [sucessReportRequest, setSucessReportRequest] = useState(false);
  const [message, setMessage] = useState("");

  const buildSearchResults = (e) => {
    setPatient(null);
    setNameInput(e.target.value);
    let userInput = e.target.value.toLowerCase();
    let results = [];
    if (userInput.length == 0) results = patients;
    else {
      for (let i in patients) {
        let patientFullName =
          `${patients[i].name} ${patients[i].lname}`.toLowerCase();
        if (userInput === patientFullName.substring(0, userInput.length)) {
          results.push(patients[i]);
        }
      }
    }
    setSearchResults(results);
  };
  const showDropdown = () => {
    document
      .getElementById("appointmentPatientDropdown")
      .childNodes[1].classList.add("stay-open");
  };

  const handleClick = (pat, e) => {
    setPatient(pat);
    console.log(pat);
    setSearchResults(null);
    document
      .getElementById("appointmentPatientDropdown")
      .childNodes[1].classList.remove("stay-open");
  };

  const clearValues = () => {
    setPatient(null);
    setSearchResults(patients);
    setNameInput("");
    setDateTime(new Date().setHours(new Date().getHours(), 0));
  };

  const SubmitHandler = async () => {
    setUpdating(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-access-token": `${user_info.accessToken}`,
        },
      };

      const { data } = await axios.post(
        BaseUrl + `/api/appointmentBooking`,
        {
          userId: patient._id,
          description,
          appointmentDate,
        },
        config
      );
      console.log(data);
      setMessage(data);
      setUpdating(false);
      setSucessReportRequest(true);
    } catch (error) {
      setUpdating(false);
      setMessage("An error has occured! Please try again later.");
      setSucessReportRequest(false);
    }
  };

  return (
    <>
      <h4 className="mt-4 ms-3">New Appointment</h4>

      <div className="row d-flex mt-2 flex-wrap justify-content-center">
        <div className="d-flex mt-2 col-md-4 col-8 flex-column justify-content-between align-items-center mx-4">
          <h5 className="my-3">Select Patient</h5>

          <div className="d-flex jusify-content-between align-items-center">
            <div id="appointmentPatientDropdown" className="dropdown mx-4">
              <input
                onFocus={showDropdown}
                onClick={buildSearchResults}
                onInput={buildSearchResults}
                placeholder={"Enter patient name"}
                className="btn btn-primary btn-sm p-2"
                type="text"
                value={patient ? `${patient.name} ${patient.lname}` : nameInput}
              />
              <ul className="dropdown-menu">
                {searchResults &&
                  searchResults.map((pat) => (
                    <li
                      key={
                        "li-" + pat.email + Math.floor(Math.random() * 10000)
                      }
                    >
                      <a
                        key={
                          pat.email + "-a" + Math.floor(Math.random() * 10000)
                        }
                        className="dropdown-item"
                        onClick={(e) => handleClick(pat, e)}
                      >
                        {pat.name} {pat.lname}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="d-flex mt-3 mx-4 col-md-4 col-8 flex-column justify-content-between align-items-center">
          <h5 className="my-2">Select Date &amp; time</h5>
          <div>
            <DatePicker
              showTimeSelect
              timeIntervals={15}
              minDate={new Date()}
              minTime={minStartTime}
              maxTime={maxEndTime}
              dateFormat="MMMM d, yyyy - h:mm aa"
              className="btn btn-primary btn-sm pointer text-center p-2"
              id="doctorDatePicker"
              selected={appointmentDate}
              onChange={(dt) => setDateTime(dt)}
            />
          </div>
        </div>
        <div className="mt-5 my-3">
          <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control
              as="textarea"
              placeholder="Description here"
              style={{ height: "100px" }}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FloatingLabel>
        </div>

        <div className="col-8 mt-5 d-flex justify-content-evenly">
          <div className="d-flex w-75 flex-column justify-content-center align-items-center">
            <button
              onClick={SubmitHandler}
              className="btn btn-success w-75 mx-2"
            >
              Schedule
            </button>
            <button onClick={clearValues} className="btn btn-danger w-50 m-4">
              Clear
            </button>
          </div>
        </div>
      </div>
      {updating ? (
        <Loader />
      ) : message ? (
        <Message variant={sucessReportRequest ? "success" : "danger"}>
          {message}
        </Message>
      ) : (
        ""
      )}
    </>
  );
};
