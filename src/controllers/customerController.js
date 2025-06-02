import { getAllCustomers } from "../repository/customerRepository.js";


export async function getAllCustomersController(req,res){
    try{
        const data = await getAllCustomers(req._id);

        res.status(200).json({
            success : true,
            data,
        })



    }
    catch(error){
        res.status(400).json({
            success : false,
            error,
        })
    }
}
