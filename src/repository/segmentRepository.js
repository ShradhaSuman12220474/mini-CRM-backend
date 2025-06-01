import segementRule from "../schema/segmentRule.js";

export async function createSegmentRespository(segmentDetails) {
    try{
        const data = await segementRule.create(segmentDetails);
        return data;
    }
    catch(error){
        console.log(error);
        throw error;
    }

}


export async function getAllSegmentRepository(){
    try{
        const allSegment = await segementRule.find();
        return allSegment;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}
