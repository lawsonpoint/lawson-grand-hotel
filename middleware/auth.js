const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({

            success:false,

            message:"Access Denied"

        });

    }

    const token = authHeader.split(" ")[1];

    if (!token) {

        return res.status(401).json({

            success:false,

            message:"Token Missing"

        });

    }

    try{

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        req.admin = decoded;

        next();

    }catch(error){

        return res.status(401).json({

            success:false,

            message:"Invalid Token"

        });

    }

};