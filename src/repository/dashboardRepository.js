import Compaign from "../schema/compaign.js";
import Customer from "../schema/customer.js";
import Order from "../schema/order.js";

export const getAllOrders = async (userId)=>{
    try{
        const orders = await Order.countDocuments(userId);
        return orders;
        
    }catch(error){
        console.log("error in fetching the Orders: ", error);
    }
};

export const getAllCustomers = async (userId)=>{
    try{
        const data = await Customer.countDocuments(userId);
        return data;
        
    }catch(error){
        console.log("error in fetching the Orders: ", error);
    }
};

export const getAllCompaign = async (userId)=>{
    try{
        const compaign = await Compaign.countDocuments(userId);
        return compaign;
        
    }catch(error){
        console.log("error in fetching the Orders: ", error);
    }
};

export const getAllPendingCompaign = async (userId)=>{
    try{
        const compaign = await Compaign.countDocuments(userId);
        return compaign;
        
    }catch(error){
        console.log("error in fetching the Orders: ", error);
    }
};