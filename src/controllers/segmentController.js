import { createSegmentService, getAllSegmentService } from "../services/segmentService.js";

export async function createSegmentController(req,res){
    try{
        // we will be getting user and segment rule as a raw json
        const user = req.body.user;
        const rule = req.body.segment_rule;

        const newObj = {
            ...user,
            ...rule
        };

        const data = await createSegmentService(newObj);
        return res.status(200).json({
            success : true,
            message : "Segement Created Successfully",
            data,
        });

    }
    catch(error){
        console.log("Eror at the controler layer", error);
        res.status(500).json({
            succes : false,
            message : "Internal Sever error",
            errors : error,
        })
    }

}

export async function getAllSegmentController(req,res){
    try{
        const data = await getAllSegmentService();
        res.staus(200).json({
            success : true,
            message : "Fetched all the segment",
            data
        })
    }
    catch(error){
        console.log("error at the controelr ", error);
        res.status(400).json({

            success : false,
            message : "Bad request",
            error 
        })
    }
}