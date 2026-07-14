const express =
require("express");


const router =
express.Router();

const Message =
require("../models/Message");

const sendEmail =
require("../utils/sendEmail");

router.post(
"/",
async(req,res)=>{

    try{
        const message = await Message.create(req.body);

res.status(201).json({

    success: true,

    message: "Message Sent Successfully"

});

setImmediate(async () => {

    try {

        await sendEmail(
            process.env.FROM_EMAIL,
            "New Contact Form Message",
            `
            <h2>New Contact Message</h2>

            <p><strong>Name:</strong> ${message.name}</p>

            <p><strong>Email:</strong> ${message.email}</p>

            <p><strong>Phone:</strong> ${message.phone}</p>

            <p><strong>Message:</strong> ${message.message}</p>
            `
        );

        await sendEmail(
            message.email,
            "We Received Your Message",
            `
            <h2>Thank You</h2>

            <p>Your message has been received.</p>

            <p>Our team will contact you shortly.</p>
            `
        );

        console.log("Contact emails sent.");

    } catch (err) {

        console.error("CONTACT EMAIL ERROR:", err);

    }

});


    }catch(error){

        

        res.status(500).json({
            error:error.message
        });

    }

});

router.get(
"/",
async(req,res)=>{

    const messages =
    await Message.find()
    .sort({
        createdAt:-1
    });

    res.json(messages);

});

module.exports = router;