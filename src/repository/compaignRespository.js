import Compaign from "../schema/compaign.js";

export async function createComapignRepository(compaignDetails){
    try{
        const compaign = await Compaign.create(compaignDetails);
        return compaign;
    }
    catch(error){
        console.log("repo layer problem");
        throw error;
    }
};
export async function getAllCompaignsRepository(){
    try{
        const allCompains = await Compaign.find();
        return allCompains;
    }
    catch(error){
        console.log("error at repo layer fo Compaign", error);
        throw error;
    }
}
