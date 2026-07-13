const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

const router = express.Router();

/* ===========================
   LOGIN
=========================== */

router.post("/login", async(req,res)=>{

    try{

        const { username,password } = req.body;

        const admin = await Admin.findOne({ username });

        if(!admin){

            return res.status(401).json({

                success:false,

                message:"Invalid Username or Password"

            });

        }

        const match = await bcrypt.compare(

            password,

            admin.password

        );

        if(!match){

            return res.status(401).json({

                success:false,

                message:"Invalid Username or Password"

            });

        }

        const token = jwt.sign(

            {

                id:admin._id,

                username:admin.username

            },

            process.env.JWT_SECRET,

            {

                expiresIn:"8h"

            }

        );

        res.json({

            success:true,

            token

        });

    }catch(error){

        res.status(500).json({

            success:false,

            error:error.message

        });

    }

});

/* ===========================
   VERIFY TOKEN
=========================== */

router.get("/verify",

require("../middleware/auth"),

(req,res)=>{

    res.json({

        success:true,

        admin:req.admin

    });

});

module.exports = router;