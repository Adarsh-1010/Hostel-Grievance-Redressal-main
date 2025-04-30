const transporter = require("./transporter");

const sendMail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"MyApp 👨‍💻" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};

module.exports = sendMail;