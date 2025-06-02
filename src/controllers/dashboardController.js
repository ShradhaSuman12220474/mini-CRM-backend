import { getAllCompaign, getAllCustomers, getAllOrders } from "../repository/dashboardRepository.js";


export async function dashboardController(req,res){
    try{
        const totalCampaigns = await getAllCompaign(req.user._id);
        const totalOrders = await getAllOrders(req.user._id);
        const totalCustomers = await getAllCustomers(req.user._id);
        res.status(200).json({
            success : true,
            totalCampaigns,
            totalOrders,
            totalCustomers,
        })



    }
    catch(error){
        res.status(400).json({
            success : false,
            error,
        })
    }
}
