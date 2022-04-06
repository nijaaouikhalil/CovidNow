import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BaseUrl } from "../utils/utils";
import axios from "axios";
import { Message } from "../components/Message";
export const DoctorMessages = ({ patients }) => {
  return (
    <div id="dd-main-container">
      <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <Inbox patients={patients} />
      </div>
    </div>
  );
};

const Inbox = ({ patients }) => {
  const [currentChat, setCurrentChat] = useState(patients[0] || null);

  const setChat = (pid) => {
    for (let i in patients) {
      if (patients[i]._id === pid) {
        setCurrentChat(patients[i]);
        return;
      }
    }
  };

  return (
    <div id="doctor-inbox-cont" className="d-flex">
      <div className="col-3 mt-3">
        {patients &&
          patients.length > 0 &&
          patients.map((patient) => (
            <button
              onClick={(e) => {
                setChat(e.target.value);
              }}
              value={patient._id}
              key={patient._id}
              className="pointer btn btn-primary"
            >
              {patient.name + " " + patient.lname}
            </button>
          ))}
      </div>

      <div className="col-8">
        <InboxItem patient={currentChat} />
      </div>
    </div>
  );
};

const InboxItem = ({ patient }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user_info } = userLogin;

  useEffect(() => {
    getPreviousMessages();

    return () => {
      setMessages([]);
    }; // eslint-disable-next-line
  }, [patient, user_info]);

  const getPreviousMessages = async () => {
    if (user_info) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "x-access-token": `${user_info.accessToken}`,
          },
        };

        const { data } = await axios.get(
          BaseUrl + `/api/message/recipient/${patient._id}`,
          config
        );
        console.log(data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [newMessage, setNewMessage] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-access-token": `${user_info.accessToken}`,
        },
      };

      const { data } = await axios.post(
        BaseUrl + `/api/message/recipient/${patient._id}`,
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
    <>
      {patient && (
        <div className="row justify-content-center mt-3">
          <div className="col-9">
            <h5 className="ms-3">{patient.name}</h5>
            <div className="accordion-item acc-rounded-corners">
              <div className="accordion-body">
                <ul className="messageList">
                  {messages && messages.length > 0 ? (
                    messages.map((message, i) => (
                      <li
                        data-testid="doctor-message-item"
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
                          {message.sendersId === user_info.id
                            ? "Me"
                            : "Patient"}
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
                      name="Emergency"
                      onChange={(e) => setIsUrgent(!isUrgent)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
