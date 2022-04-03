import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BaseUrl } from "../utils/utils";
import axios from "axios";

import { Message } from "../components/Message";

export const PatientMessages = () => {
  const [doctors, setDoctors] = useState([]);
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  useEffect(() => {
    getDoctors();

    return () => {
      setDoctors([]);
    };
  }, [user_info]);
  const getDoctors = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-access-token": `${user_info.accessToken}`,
        },
      };

      const { data } = await axios.get(
        BaseUrl + `/api/message/myDoctor`,
        config
      );
      console.log(data);
      setDoctors([data]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div id="dd-main-container">
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <Inbox doctors={doctors} />
      </div>
    </div>
  );
};
const Inbox = ({ doctors }) => {
  const [currentChat, setCurrentChat] = useState(doctors[0] || null);

  const setChat = (pid) => {
    for (let i in doctors) {
      console.log(doctors[i]);
      if (doctors[i].doctorId == pid) {
        setCurrentChat(doctors[i]);
        return;
      }
    }
  };

  return (
    <div id="doctor-inbox-cont" className="d-flex">
      <div className="col-3 mt-3">
        {doctors &&
          doctors.length > 0 &&
          doctors.map((doctor) => (
            <button
              onClick={(e) => {
                setChat(e.target.value);
              }}
              value={doctor.doctorId}
              key={doctor.doctorId}
              className="pointer btn btn-primary"
            >
              {doctor.name + " " + doctor.lname}
            </button>
          ))}
      </div>

      <div className="col-8">
        <InboxItem doctor={currentChat} />
      </div>
    </div>
  );
};

const InboxItem = ({ doctor }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;
  useEffect(() => {
    getPerviousMessages();

    return () => {
      setMessages([]);
    };
  }, [doctor, user_info]);

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  const getPerviousMessages = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-access-token": `${user_info.accessToken}`,
        },
      };

      const { data } = await axios.get(
        BaseUrl + `/api/message/recipient/${doctor.doctorId}`,
        config
      );
      console.log(data);
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-access-token": `${user_info.accessToken}`,
        },
      };

      const { data } = await axios.post(
        BaseUrl + `/api/message/recipient/${doctor.doctorId}`,
        { message: newMessage, emergency: isUrgent },
        config
      );
      console.log(data);

      setMessages([
        ...messages,
        {
          date: new Date(),
          emergency: isUrgent,
          sendersId: user_info.id,
          message: newMessage,
        },
      ]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-9">
        <div className="accordion">
          <div className="accordion-item acc-rounded-corners">
            <div className="show">
              <div className="accordion-body">
                <ul className="messageList overflow-auto">
                  {messages && messages.length ? (
                    messages.map((message, i) => (
                      <li
                        data-testid={"patient-message-row"}
                        key={`msg${i}`}
                        className={
                          message.sendersId === user_info.id
                            ? "sentMessage"
                            : "recievedMessage"
                        }
                      >
                        <small>
                          {message.emergency ? (
                            <i className="fas fa-exclamation-circle text-danger"></i>
                          ) : null}{" "}
                          {message.sendersId === user_info.id ? "Me" : "Doctor"}
                        </small>

                        {message.message}
                      </li>
                    ))
                  ) : (
                    <Message variant="warning">No messages yet</Message>
                  )}
                </ul>

                <div className="d-flex">
                  <input
                    className="form-control mx-2"
                    placeholder="Enter message"
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button className="btn btn-success" onClick={sendMessage}>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>

                <div className="d-flex flex-wrap mt-3 align-items-center">
                  <h5 className="w-100 ms-3">Set message as: </h5>
                  <div className="col-6 text-center">
                    <label className="mx-3">Emergency</label>
                    <input
                      type="checkbox"
                      name="Urgent"
                      onChange={(e) => setIsUrgent(!isUrgent)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
