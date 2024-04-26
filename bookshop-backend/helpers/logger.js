const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "access.log");

function logRequests(req, res, next) {
  const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url}`;
  fs.appendFile(logFilePath, logEntry + "\n", (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
  next();
}

module.exports = logRequests;
