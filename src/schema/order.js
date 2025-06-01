import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer_external_id: {// id of the external customer  
        type: String, 
        ref: 'Customer', 
        required: true 
    },
    userId: {
         type: mongoose.Schema.Types.ObjectId,
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
    order_external_id: { // if of the external order 
        type: String, 
        index: true, 
        sparse: true 
    }
},{timestamps:true});


const order = mongoose.model('Order',orderSchema);

export default order;