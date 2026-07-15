require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(cors({
    origin: [
        "https://lawson-grand-hotel.vercel.app"
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

app.get("/", (req, res) => {
    res.send("Welcome to Lawson Grand Hotel API");
});

app.listen(PORT, () => {
    console.log(
    `Server Running on ${PORT}`
    );

});

