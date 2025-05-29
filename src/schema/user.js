import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true,
        minLength:5
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minLength:5,
        validate:{
            validator: function(emailValue){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
            },
            message:"Invalid email format"
        }
    },
    picture:{
        type : String
    }
    // role:{
    //     type:String,
    //     default:"user",
    //     enum:["user","admin"],
    // },
},{timesStamps:true});

// something like trigger is happening to hash the password before storing the user to the database
// userSchema.pre('save',function modifyPassword(next){// it is recommended to user normal fn in this call back bacause this keyword will behave diffrently in case of arrow function
//     // incoming user object
//     const user = this;

//     const SALT = bcrypt.genSaltSync(9);// salt in here is like it is going to hash 9 times which will make stroger


//     // hash the password
//     const hasshedPassword = bcrypt.hashSync(user.password,SALT);
//     // now replace the original password 

//     user.password = hasshedPassword;

//     next();

    
// })
// creating a collection
const user = mongoose.model('User',userSchema);

export default user;