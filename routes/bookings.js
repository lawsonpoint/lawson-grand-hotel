
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Booking = require("../models/Booking");
const sendEmail = require("../utils/sendEmail");


/* ======================================
   CREATE BOOKING
====================================== */
router.post("/", async (req, res) => {

    try {

        // Create booking
       const booking = new Booking({
    ...req.body,
    bookingReference: `LAW-${Date.now()}`
});

await booking.save();

        // Respond immediately
        
setImmediate(async () => {

    try {

        await sendEmail(
            process.env.EMAIL_USER,
            "New Booking Reservation",

            `
            <h2>New Booking Received</h2>

            <p><strong>Name:</strong> ${booking.fullName}</p>

            <p><strong>Booking Reference:</strong> ${booking.bookingReference}</p>

            <p><strong>Transaction Reference:</strong> ${booking.transactionReference}</p>

            <hr>

            <p><strong>Email:</strong> ${booking.email}</p>

            <p><strong>Phone:</strong> ${booking.phone}</p>

            <p><strong>Room:</strong> ${booking.roomType}</p>

            <p><strong>Price Per Night:</strong>
            ₦${booking.roomPrice.toLocaleString()}</p>

            <p><strong>Nights:</strong>
            ${booking.nights}</p>

            <h3>Total:
            ₦${booking.totalAmount.toLocaleString()}</h3>

            <p><strong>Check-In:</strong>
            ${new Date(booking.checkIn).toDateString()}</p>

            <p><strong>Check-Out:</strong>
            ${new Date(booking.checkOut).toDateString()}</p>

            `
        );

        await sendEmail(
            booking.email,
            "Booking Request Received",
            `
            <h2>Thank You For Choosing Lawson Grand Hotel</h2>

            <p>Dear ${booking.fullName},</p>

            <p>
            Your reservation has been received successfully.
            </p>

            <hr>

            <p><strong>Booking Reference:</strong>
            ${booking.bookingReference}</p>

            <p><strong>Transaction Reference:</strong>
            ${booking.transactionReference}</p>

            <p><strong>Room:</strong>
            ${booking.roomType}</p>

            <p><strong>Total Amount:</strong>
            ₦${booking.totalAmount.toLocaleString()}</p>

            <p><strong>Check-In:</strong>
            ${new Date(booking.checkIn).toDateString()}</p>

            <p><strong>Check-Out:</strong>
            ${new Date(booking.checkOut).toDateString()}</p>

            <p><strong>Status:</strong>
            Pending Confirmation</p>

            <br>

            <p>
            We appreciate your patronage and look forward to welcoming you.
            </p>
            `
        );

        console.log("Booking emails sent.");

    } catch (err) {

        console.error("BOOKING EMAIL ERROR:", err);

    }

    return res.status(201).json({

        success: true,

        booking


    });  

});
    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            error: error.message

        });

    }

});


/* ======================================
   GET BOOKINGS
====================================== */

router.get("/", auth, async (req, res) => {

    try {

        const bookings = await Booking.find()

        .sort({

            createdAt: -1

        });

        res.json(bookings);

    } catch (error) {

        res.status(500).json({

            success: false,

            error: error.message

        });

    }

});

router.post("/track", async (req, res) => {

    try{

        const booking =
        await Booking.findOne({

            bookingReference:req.body.bookingReference,

            email:req.body.email

        });

        if(!booking){

            return res.status(404).json({

                success:false,

                message:"Booking not found."

            });

        }

        res.json({

            success:true,

            booking

        });

    }catch(error){

        res.status(500).json({

            success:false,

            error:error.message

        });

    }

});



/* ======================================
   CONFIRM OR REJECT BOOKING
====================================== */

router.patch("/:id", auth, async (req, res) => {

    try {

        const booking = await Booking.findByIdAndUpdate(

            req.params.id,

            {

                status: req.body.status

            },

            {

               returnDocument:"after"

            }

        );

        if (!booking) {

            return res.status(404).json({

                success: false,

                error: "Booking not found"

            });

        }



        if (booking.status === "Confirmed") {

            await sendEmail(

                booking.email,

                "Booking Confirmed",

                `
                <h2>Your Booking Has Been Confirmed</h2>

                <p>Hello ${booking.fullName},</p>

                <p>Your reservation has been confirmed.</p>

                <p><strong>Booking Reference:</strong>
                ${booking.bookingReference}</p>

                <p><strong>Room:</strong>
                ${booking.roomType}</p>

                <p><strong>Total:</strong>
                ₦${booking.totalAmount.toLocaleString()}</p>

                <p>We look forward to welcoming you.</p>
                `
            );

        }



        if (booking.status === "Rejected") {

            await sendEmail(

                booking.email,

                "Booking Rejected",

                `
                <h2>Reservation Update</h2>

                <p>Hello ${booking.fullName},</p>

                <p>

                Unfortunately your reservation could not be approved.

                </p>

                <p>

                Booking Reference:

                ${booking.bookingReference}

                </p>

                <p>

                Please contact Lawson Grand Hotel for assistance.

                </p>
                `
            );

        }

        res.json({

            success: true,

            booking

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            error: error.message

        });

    }

});



/* ======================================
   UPDATE PAYMENT STATUS
====================================== */

router.patch("/:id/payment", auth, async (req, res) => {

    try {

        const booking = await Booking.findByIdAndUpdate(

            req.params.id,

            {

                paymentStatus: "Paid"

            },

            {

                returnDocument:"after"

            }

        );

        res.json({

            success: true,

            booking

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            error: error.message

        });

    }

});



module.exports = router;

