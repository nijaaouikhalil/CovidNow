const { user } = require("../models");
const db = require("../models");
const User = db.user;
const Role = db.role;
const assignedDoctor = db.assignedDoctor;
const Report = db.report;
const communication = db.communication;

//sends a message to be save to the database
exports.messageRecipient = (req, res) => {
  roleName = req.roleName;
  if (roleName == "doctor") {
    doctorId = req.userId;
    userId = req.params.recipientId;
    sendersId = doctorId;
  } else {
    doctorId = req.params.recipientId;
    userId = req.userId;
    sendersId = userId;
  }

  message = req.body.message;
  //see if message is important
  if (req.body.emergency) {
    emergency = req.body.emergency;
  } else {
    c = false;
  }

  const newText = new communication({
    doctorId: doctorId,
    userId: userId,
    sendersId: sendersId,
    message: message,
    emergency: emergency,
  });
  newText.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "message sent to recipient" });
  });
};

//fetch all texts between sender and recipient
exports.getAllMessages = (req, res) => {
  roleName = req.roleName;
  if (roleName == "doctor") {
    doctorId = req.userId;
    userId = req.params.recipientId;
  } else {
    doctorId = req.params.recipientId;
    userId = req.userId;
  }
  communication
    .find(
      { doctorId: doctorId, userId: userId },
      "sendersId message date emergency"
    )
    .sort({ date: 1 })
    .exec((err, messages) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send(messages);
    });
};

//fetch all messages tagged as emergency between sender and recipient
exports.getImportantMessage = (req, res) => {
  roleName = req.roleName;
  if (roleName == "doctor") {
    doctorId = req.userId;
    userId = req.params.recipientId;
  } else {
    doctorId = req.params.recipientId;
    userId = req.userId;
  }
  communication
    .find(
      { doctorId: doctorId, userId: userId, emergency: true },
      "sendersId message date emergency"
    )
    .sort({ date: 1 })
    .exec((err, messages) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send(messages);
    });
};

//make message not important anymore
exports.setMessageToNormal = (req, res) => {
  communication.findOne({ _id: req.params.messageId }).exec((err, msg) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    msg.emergency = false;
    msg.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
      }
      res.send({ message: "Changed emergency status from true to false" });
    });
  });
};
