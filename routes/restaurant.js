const express =
require("express");

const auth = require("../middleware/auth");

const router =
express.Router();

const RestaurantReservation =
require(
"../models/RestaurantReservation"
);

const sendEmail =
require("../utils/sendEmail");

router.post(
"/",
async(req,res)=>{

try{

const reservation =
await RestaurantReservation.create(
req.body
);

await sendEmail(

process.env.EMAIL_USER,

"New Restaurant Reservation",

`
<h2>New Restaurant Reservation</h2>

<p><strong>Name:</strong>
${reservation.fullName}</p>

<p><strong>Phone:</strong>
${reservation.phone}</p>

<p><strong>Email:</strong>
${reservation.email}</p>

<p><strong>Date:</strong>
${reservation.date}</p>

<p><strong>Time:</strong>
${reservation.time}</p>

<p><strong>Guests:</strong>
${reservation.guests}</p>
`
);

await sendEmail(

reservation.email,

"Restaurant Reservation Received",

`
<h2>Thank You For Choosing Lawson Grand Hotel</h2>

<p>
Dear ${reservation.fullName},
</p>

<p>
Your table reservation request has been received.
Our team  will contact you shortly to confirm your booking.
</p>

<p>
Date:
${reservation.date}
</p>

<p>
Time:
${reservation.time}
</p>

<p>
Guests:
${reservation.guests}
</p>

<p>
Status:
Pending Confirmation
</p>
`
);

res.status(201).json(
reservation
);

}catch(error){

res.status(500).json({
error:error.message
});

}

});

router.get("/", auth, async (req, res) => {

const reservations =
await RestaurantReservation.find()
.sort({createdAt:-1});

res.json(
reservations
);

});

router.patch(
"/:id", auth, async(req,res)=>{

try{
console.log("Updating ID:", req.params.id);
console.log("Status:", req.body.status);

const existingReservation =
await RestaurantReservation.findById(
req.params.id
);

if(!existingReservation){

return res.status(404).json({

success:false,

message:"Reservation not found."

});

}

if(

existingReservation.status === "Confirmed" ||

existingReservation.status === "Rejected"

){

return res.status(400).json({

success:false,

message:"Reservation has already been processed."

});

}

const status =
req.body.status;

const reservation =
await RestaurantReservation.findByIdAndUpdate(

req.params.id,

{

status

},

{

returnDocument:"after"

}

);

if(status === "Confirmed"){

await sendEmail(

reservation.email,

"Restaurant Reservation Confirmed",

`
<h2>Your Table Reservation Is Confirmed</h2>

<p>Dear ${reservation.fullName},</p>

<p>
Your reservation has been confirmed.
</p>

<p><strong>Date:</strong> ${reservation.date}</p>

<p><strong>Time:</strong> ${reservation.time}</p>

<p><strong>Guests:</strong> ${reservation.guests}</p>

<p>
We look forward to welcoming you to Lawson Grand Hotel.
</p>
`

);

}

if(status === "Rejected"){

await sendEmail(

reservation.email,

"Restaurant Reservation Update",

`
<h2>Reservation Update</h2>

<p>Dear ${reservation.fullName},</p>

<p>
Unfortunately, your reservation could not be confirmed.
</p>

<p>
Please contact us if you would like to make another reservation.
</p>
`

);

}

res.json({

success:true,

reservation

});

}catch(error){

console.error(error);

res.status(500).json({

success:false,

error:error.message

});

}

});

module.exports = router;