const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: "gmail", // Can be replaced with other services like SMTP
    auth: {
        user: process.env.EMAIL_USER, // Sender email
        pass: process.env.EMAIL_PASS  // Sender email password or app password
    }
});

// Send Email Endpoint
app.post("/send-email", async (req, res) => {
    const { to, subject, text, html } = req.body;
    
    if (!to || !subject || (!text && !html)) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully", info });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email", details: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});