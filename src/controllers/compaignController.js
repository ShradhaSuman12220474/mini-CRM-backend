import { CommunicationLog } from "../schema/communicationLogs.js";
import { createCampaignService, getAllCompaignService } from "../services/compaignService.js";
import { sendMessage } from "../utils/vendorAPI.js";

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

        // insert the logs to the communication_table for maintianing a record;

        const logs = savedCompaign.audienceIds.map(cid => ({
        campaignId: savedCompaign._id,
        customerId: cid,
        message : "Hello ",
        status: 'PENDING',
        }));
        await CommunicationLog.insertMany(logs);

        console.log(logs);

        savedCompaign.audienceIds.forEach(async(cid) => {
            const personalizedMsg = `Hi User${cid.toString().slice(-4)}, ${message}`;
            await sendMessage(`User${cid.toString().slice(-4)}`, cid, personalizedMsg, savedCompaign._id);
        });

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