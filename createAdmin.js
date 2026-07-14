require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI)
.then(async()=>{

    const hashedPassword =
    await bcrypt.hash(

        "lawson11",

        10

    );

    await Admin.updateOne(

        {

            username:"admin"

        },

        {

            password:hashedPassword

        }

    );

    console.log("✅ Password Updated");

    process.exit();

})
.catch(err=>{

    console.log(err);

});