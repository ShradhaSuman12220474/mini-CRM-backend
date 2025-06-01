import Customer from "../schema/customer.js";

export const getAllCustomers = async (userId)=>{
    try{
        const customers = await Customer.find(userId);
        return customers;
        
    }catch(error){
        console.log("error in fetching the customers: ", error);
    }
};

