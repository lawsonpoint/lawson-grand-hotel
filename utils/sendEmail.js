const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 2525,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.error("SMTP Verify Error:", error);
    } else {
        console.log("SMTP server is ready.");
    }
}); 

const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
          from: `"Lawson Grand Hotel" <${process.env.FROM_EMAIL}>`,  
            to,
            subject,
            html
        });

        console.log("✅ Email Sent:", info.messageId);

    } catch (error) {
        console.error("❌ Email Error:", error);
        throw error;
    }
};

module.exports = sendEmail;
