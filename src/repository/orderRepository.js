import Order from "../schema/order.js";

export const getAllOrders = async (userId)=>{
    try{
        const orders = await Order.find(userId);
        return orders;
        
    }catch(error){
        console.log("error in fetching the Orders: ", error);
    }
};
