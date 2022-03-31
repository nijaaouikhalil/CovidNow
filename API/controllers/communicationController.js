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
    if(roleName == "doctor"){
      doctorId = req.userId
      userId = req.params.recipientId
      sendersId = doctorId
    }else{
      doctorId = req.params.recipientId
      userId = req.userId
      sendersId = userId
    }

    message = req.body.message;

    const newText = new communication({
      doctorId: doctorId,
      userId: userId,
      sendersId: sendersId,
      message: message
    })
    newText.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ message: "message sent to recipient" });
    })

  }

//sends a message to be save to the database
exports.getAllMessages = (req, res) => {
  roleName = req.roleName;
    if(roleName == "doctor"){
      doctorId = req.userId
      userId = req.params.recipientId
    }else{
      doctorId = req.params.recipientId
      userId = req.userId
    }
  communication.find({doctorId: doctorId, userId: userId}, "sendersId message date").sort({date: 1}).exec((err, messages) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send(messages)
  })

}  