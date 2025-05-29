import { oatuh2Client } from "../config/googleConfig.js";

import { createUser, findUserByEmail } from "../repository/userRespository.js";
import axios from "axios";


export const googleSignInService = async (code)=>{
    try{
    const googleResponse = await oatuh2Client.getToken(code);
    oatuh2Client.setCredentials(googleResponse.tokens);
    const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`);
    const {email, name , picture} = userRes.data;
    
    // if the user is present in dp of not
    let user = await findUserByEmail(email);

    if(user == null){
        user = await createUser({email, name , picture});

    }
    
    

    return user;
}
catch(error){
    console.log("googleSignInsSrvice layer Error");

    console.log(error);
    throw error;

}


       
        
}