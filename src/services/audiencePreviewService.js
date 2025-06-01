import { audienceRepository } from "../repository/audienceRepsitory.js";
import { parseRuleString } from "../utils/parseRuleString.js";

export async function audiencePreviewService(rule){
    try{
    const query = parseRuleString(rule);
    // console.log(rule);
    const audienceSize = await audienceRepository(query);
    return audienceSize;
    }
    catch(error){
        console.log("audience service");
        throw error;
    }

};

export default audiencePreviewService;
