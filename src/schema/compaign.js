import mongoose from "mongoose";

const compaignSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    intent: { 
        type: String 
    },
    rule: { 
        type : String
    },
    audienceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }], 
    audienceSize : {
        type : Number,
    },
    
    status: { 
        type: String, 
        enum: ['draft', 'sent', 'error'], 
        default: 'draft' 
    },
    sentAt: Date,

},{timestamps:true});


const compaign = mongoose.model('Compaign',compaignSchema);

export default compaign;
