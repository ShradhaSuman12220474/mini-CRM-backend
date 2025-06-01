import { audienceRepository } from "../repository/audienceRepsitory.js";
import { createComapignRepository, getAllCompaignsRepository } from "../repository/compaignRespository.js";
import parseRuleString from "../utils/parseRuleString.js";

export async function createCampaignService(compaignDetails){


    try{
        // find all the customers that matches the rule
        // and insert it into the array of customersId in compaignDetails
        const query = parseRuleString(compaignDetails.rule);
        const audienceDetails = await audienceRepository(query);

        const updatedCompaignDetails = {
            ...compaignDetails,
            ...audienceDetails
        };
        

        const compaign = await createComapignRepository(updatedCompaignDetails);
        return compaign;


    }
    catch(error){
        console.log("compaign service error", error);
        throw error;
    }

}

export async function getAllCompaignService(){
    try{
        const compaign = await getAllCompaignsRepository();
        return compaign;
    }
    catch(error){
        console.log("error ocurred at the service layer of compaign", error);
        throw error;
    }
}