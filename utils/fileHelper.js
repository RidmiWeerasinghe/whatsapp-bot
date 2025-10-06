const fs = require("fs");
const path = require("path");

/**
 * Read a JSON file safely. Returns an empty array/object if file doesn't exist.
 * @param {string} filePath - Relative or absolute path to JSON file
 * @param {any} defaultValue - Value to return if file doesn't exist
 */
function readJSON(filePath, defaultValue = []) {
  try {
    if (!fs.existsSync(filePath)) return defaultValue;
    const data = fs.readFileSync(filePath, "utf8").trim();
    if (!data) return defaultValue; // handle empty file
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading JSON file:", err);
    return defaultValue;
  }
}

/**
 * Write JSON data to a file safely
 * @param {string} filePath
 * @param {any} data
 */
function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing JSON file:", err);
  }
}

module.exports = { readJSON, writeJSON };
