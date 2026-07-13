require("dotenv").config();

const sendEmail = require("./utils/sendEmail");

(async () => {

    try {

        await sendEmail(

            process.env.EMAIL_USER,

            "Test Email",

            "<h2>Email Test Successful</h2>"

        );

        console.log("SUCCESS");

    } catch (err) {

        console.error(err);

    }

})(); 



