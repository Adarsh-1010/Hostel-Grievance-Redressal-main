
const express = require("express");
const router = express.Router();
const { sendEmail } = require("../controller/mailController"); // Import the sendEmail function

// POST route to send an email
router.post("/send-email", sendEmail); 

module.exports = router;