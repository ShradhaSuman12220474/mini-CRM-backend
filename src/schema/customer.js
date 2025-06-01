import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    phone: String,

    location: String,

    customer_external_id: { 
        type: String, 
        index: true, 
        sparse: true 
    },
    spend: {
        type: Number,
        default: 0,
        min: 0
    },

    visits: {
        type: Number,
        default: 0,
        min: 0
    },

    lastActive: {
        type: Date,
        default: Date.now
    }
},{timestamps:true});

const customer = mongoose.model('Customer', customerSchema);

export default customer;