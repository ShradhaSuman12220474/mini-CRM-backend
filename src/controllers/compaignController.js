import { createCampaignService, getAllCompaignService } from "../services/compaignService.js";

export async function createCompaignController(req,res){
    console.log(req.body);

    try{
        // const compaignDetails = req.body.compaignDetails;
        
        // const user = JSON.parse(req.body.user);
        // const compaign = JSON.parse(req.body.compaignDetails);

        const { name, message, intent, rule, status } = req.body.compaignDetails;

        const compaignDetails = {
            userId: req.body.user.userId || req.body.user.id,  // whichever you store
            name,
            message,
            intent,
            rule,
            status
        };

        console.log("Final compaignDetails:", compaignDetails);

        const savedCompaign = await createCampaignService(compaignDetails);

        return res.status(200).json({
            success: true,
            savedCompaign,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message: "internal server error",
            error : error,
        })
    }

}

export async function getAllCompaignController(req,res){
    try{
        const data = await getAllCompaignService();
        res.status(200).json({
            success : true,
            data,
        })
    }
    catch(error){
        console.log("controller layer erorr in fectching the data");
        res.status(404).json({
            success : false,
            message : "Data not found",
        })

        
    }
}