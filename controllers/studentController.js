const path = require("path");
const { readJSON, writeJSON } = require("../utils/fileHelper");

const filePath = path.join(__dirname, "../students.json");

function saveStudent(message, from) {
  // Use regex to extract details (case-insensitive, optional spaces)
  const nameMatch = message.match(/name:\s*(.*)/i);
  const gradeMatch = message.match(/grade:\s*(.*)/i);
  const mediumMatch = message.match(/medium:\s*(.*)/i); // <-- new
  const locationMatch = message.match(/location:\s*(.*)/i);

  // Check if mandatory fields are present
  if (!nameMatch || !gradeMatch || !mediumMatch || !locationMatch) {
    return { success: false };
  }

  const student = {
    name: nameMatch[1].trim(),
    grade: gradeMatch[1].trim(),
    medium: mediumMatch[1].trim(), // <-- include medium
    location: locationMatch[1].trim(),
    whatsapp: from,
    receivedAt: new Date().toISOString(),
  };

  // Read existing students using helper
  const students = readJSON(filePath, []);

  // Add new student
  students.push(student);

  // Save using helper
  writeJSON(filePath, students);

  return { success: true, student };
}

module.exports = { saveStudent };
