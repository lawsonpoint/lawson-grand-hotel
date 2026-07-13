const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    host: "smtp.gmail.com",

    port: 465,

    secure: true,

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    },

    connectionTimeout: 30000,

    greetingTimeout: 30000,

    socketTimeout: 30000

});
transporter.verify((err, success) => {
    if (err) {
        console.error("SMTP Error:", err);
    } else {
        console.log("SMTP Ready");
    }
});

module.exports = async (to, subject, html) => {

    return transporter.sendMail({

        from: `"Lawson Grand Hotel" <${process.env.EMAIL_USER}>`,

        to,

        subject,

        html

    });

};