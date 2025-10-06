const express = require("express");
const router = express.Router();
const { saveStudent } = require("../controllers/studentController");
const { getGroupLink } = require("../controllers/groupLinks");
const twilio = require("twilio");

router.post("/", (req, res) => {
  const incomingMsg = req.body.Body?.trim() || "";
  const from = req.body.From;

  const MessagingResponse = twilio.twiml.MessagingResponse;
  const twiml = new MessagingResponse();

  const result = saveStudent(incomingMsg, from);

  if (result.success) {
    const { grade, medium } = result.student;
    const groupLink = getGroupLink(grade, medium);

    let reply = `✅ Got your details!\nName: ${result.student.name}\nGrade: ${grade}\nMedium: ${medium}\nLocation: ${result.student.location}\n`;

    if (groupLink) {
      reply += `\nClick here to join your group: ${groupLink}`;
    } else {
      reply += `\n⚠️ We couldn’t find a group for your grade/medium. Please contact the admin.`;
    }

    twiml.message(reply);
  } else {
    twiml.message(
      "⚠️ I couldn’t read your details. Please send in this format:\nName: <Your Name>\nGrade: <Your Grade>\nMedium: <Your Medium>\nLocation: <Your Location>"
    );
  }

  res.set("Content-Type", "text/xml");
  res.send(twiml.toString());
});

module.exports = router;
