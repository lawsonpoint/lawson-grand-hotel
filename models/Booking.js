const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({

    fullName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    phone:{
        type:String
    },

    roomType:{
        type:String,
        required:true
    },

    roomPrice:{
        type:Number,
        required:true
    },

    guests:{
        type:Number,
        default:1
    },

    checkIn:{
        type:Date,
        required:true
    },

    checkOut:{
        type:Date,
        required:true
    },

    nights:{
        type:Number,
        required:true
    },
    

    totalAmount:{
        type:Number,
        required:true
    },
   
   
bookingReference:{
    type:String
},

paymentStatus:{
    type:String,
    default:"Unpaid"
},


     
    status:{
        type:String,
        default:"Pending"
    }




     
  
},{
    timestamps:true
});
module.exports =
mongoose.model("Booking", bookingSchema);