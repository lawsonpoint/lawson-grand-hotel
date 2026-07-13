const mongoose = require("mongoose");

const RestaurantReservationSchema =
new mongoose.Schema({

    fullName:String,
    phone:String,
    email:String,
    date:String,
    time:String,
    guests:Number,

    status:{
        type:String,
        default:"Pending"
    }

},{
    timestamps:true
});

module.exports =
mongoose.model(
"RestaurantReservation",
RestaurantReservationSchema
);