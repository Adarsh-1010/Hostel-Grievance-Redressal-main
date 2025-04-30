

const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res) => {
  const { toEmail, subject, message } = req.body;

  try {
    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use any email service provider
      auth: {
        user: process.env.EMAIL_USER, // Your email address from .env
        pass: process.env.EMAIL_PASS, // Your email app password or regular password
      },
    });

    // Email message options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email (from .env)
      to: toEmail, // Receiver's email
      subject: subject, // Subject
      text: message, // Email body (plain text)
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Success response
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};