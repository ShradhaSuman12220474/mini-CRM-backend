import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Customer', 
        required: true 
    },
    userId: {
         type: Schema.Types.ObjectId,
         ref: 'User', 
         required: true 
        }, 
    amount: {
        type: Number, 
        required: true 
    },
    items: [String],

    orderDate: { 
        type: Date, 
        required: true 
    },
    externalId: { 
        type: String, 
        index: true, 
        sparse: true 
    }
},{timestamps:true});


const order = mongoose.model('Order',orderSchema);

export default order;