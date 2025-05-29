import { oatuh2Client } from "../config/googleConfig.js";

import { googleSignInService } from "../services/userService.js";
import { JWT_SECRET, JWT_TIMEOUT } from "../config/serverConfig.js";
import jwt from 'jsonwebtoken';


export async function googleLogin(req,res){
    try{
        const code = req.query.code;
        // call the service layer of google sing in
        
        const user = await googleSignInService(code);
        const {_id,email} = user;

        const token = jwt.sign({ _id, email},
        JWT_SECRET,
        {expiresIn: JWT_TIMEOUT},
        );

        return res.status(200).json({
            message: "success",
            user,
            token,

        });

    }catch(error){
        console.log(error);

        res.status(500).json({
            message: "Internal Server Error",

        })
    }
}
