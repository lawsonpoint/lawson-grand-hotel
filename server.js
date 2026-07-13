require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URI)
.then(()=>{

    console.log("MongoDB Connected");

})
.catch(err=>{

    console.log(err);

});

app.use(
"/api/bookings",
require("./routes/bookings")
);

app.use(
"/api/messages",
require("./routes/messages")
);

app.use(
"/api/restaurant",
require("./routes/restaurant")
);

app.use(
"/api/admin",
require("./routes/admin")
);

const PORT = process.env.PORT || 5200;

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({

        success: false,

        error: err.message

    });

});

app.listen(PORT, () => {
    console.log(
    `Server Running on ${PORT}`
    );

});

