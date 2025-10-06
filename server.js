// const express = require("express");
// const bodyParser = require("body-parser");
// const { MessagingResponse } = require("twilio").twiml;
// const fs = require("fs");
// const path = "./students.json";

// const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));

// // app.post("/whatsapp", (req, res) => {
// //   const incomingMsg = req.body.Body;
// //   const from = req.body.From;

// //   console.log(`Message from ${from}: ${incomingMsg}`);

// //   const twiml = new MessagingResponse();
// //   twiml.message("✅ Got your message! I’ll process your details soon.");

// //   res.type("text/xml").send(twiml.toString());
// // });

// // app.post("/whatsapp", (req, res) => {
// //   const incomingMsg = req.body.Body?.trim() || "";
// //   const from = req.body.From;

// //   console.log("Incoming message from", from, ":", incomingMsg);

// //   const twiml = new MessagingResponse(); // use the imported MessagingResponse directly

// //   // Use regex to extract details
// //   const nameMatch = incomingMsg.match(/name:\s*(.*)/i);
// //   const gradeMatch = incomingMsg.match(/grade:\s*(.*)/i);
// //   const locationMatch = incomingMsg.match(/location:\s*(.*)/i);

// //   if (nameMatch && gradeMatch && locationMatch) {
// //     const name = nameMatch[1].trim();
// //     const grade = gradeMatch[1].trim();
// //     const location = locationMatch[1].trim();

// //     console.log({ name, grade, location });

// //     twiml.message(
// //       `✅ Got your message!\nName: ${name}\nGrade: ${grade}\nLocation: ${location}\nI’ll process your details soon.`
// //     );
// //   } else {
// //     twiml.message(
// //       "⚠️ I couldn’t read your details. Please send in this format:\nName: <Your Name>\nGrade: <Your Grade>\nLocation: <Your Location>"
// //     );
// //   }

// //   res.set("Content-Type", "text/xml");
// //   res.send(twiml.toString());
// // });

// app.post("/whatsapp", (req, res) => {
//   const incomingMsg = req.body.Body?.trim() || "";
//   const from = req.body.From;

//   const MessagingResponse = twilio.twiml.MessagingResponse;
//   const twiml = new MessagingResponse();

//   const nameMatch = incomingMsg.match(/name:\s*(.*)/i);
//   const gradeMatch = incomingMsg.match(/grade:\s*(.*)/i);
//   const locationMatch = incomingMsg.match(/location:\s*(.*)/i);

//   if (nameMatch && gradeMatch && locationMatch) {
//     const student = {
//       name: nameMatch[1].trim(),
//       grade: gradeMatch[1].trim(),
//       location: locationMatch[1].trim(),
//       whatsapp: from,
//       receivedAt: new Date().toISOString(),
//     };

//     // Read existing students
//     let students = [];
//     if (fs.existsSync(path)) {
//       students = JSON.parse(fs.readFileSync(path));
//     }

//     // Add new student
//     students.push(student);
//     fs.writeFileSync(path, JSON.stringify(students, null, 2));

//     console.log("Student saved:", student);

//     twiml.message(
//       `✅ Got your message!\nName: ${student.name}\nGrade: ${student.grade}\nLocation: ${student.location}\nI’ll process your details soon.`
//     );
//   } else {
//     twiml.message(
//       "⚠️ I couldn’t read your details. Please send in this format:\nName: <Your Name>\nGrade: <Your Grade>\nLocation: <Your Location>"
//     );
//   }

//   res.set("Content-Type", "text/xml");
//   res.send(twiml.toString());
// });

// const PORT = 3000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const express = require("express");
const bodyParser = require("body-parser");
const whatsappRoute = require("./routes/whatsapp");

const app = express();
const PORT = 3000;

// Parse incoming form data from Twilio
app.use(bodyParser.urlencoded({ extended: false }));

// WhatsApp webhook
app.use("/whatsapp", whatsappRoute);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
