import { getAllOrders } from "../repository/orderRepository.js"

export async function getAllOrderController(req,res){
    try{
        const data = await getAllOrders(req._id);

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
