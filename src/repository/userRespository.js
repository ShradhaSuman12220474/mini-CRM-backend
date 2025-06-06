import User from "../schema/user.js";

export const findUserByEmail = async(email)=>{
    try{
        const user = await User.findOne({email});
        return user;
    }
    catch(error){
        console.log(error);
    }
}

export const findAllUsers = async()=>{
    try{
        const users = await User.find();
        return users;
    }
    catch(error){
        console.log(error);
    }
}

export const createUser = async(user)=>{
    try{
        const newUser = await User.create(user);
        return newUser;
    }
    catch(error){
        console.log("failed to register user to the db");
        // console.log(error);
        // console.log("Error occured in creating the user");
        throw error;

    }
}