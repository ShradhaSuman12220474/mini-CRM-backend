import { createSegmentRespository, getAllSegmentRepository } from "../repository/segmentRepository.js";

export async function createSegmentService(segmentDetails){
    try{
        const data = await createSegmentRespository(segmentDetails);
        return data;

    }catch(error){
        console.log(error);
        throw error;
    }
}
export async function getAllSegmentService(){
    try{
        const data = await getAllSegmentRepository();
        return data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}