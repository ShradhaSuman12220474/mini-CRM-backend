import Customer from "../schema/customer.js";

export async function audienceRepository(query){
    try{
        console.log(query);
        const audienceSize = await Customer.countDocuments(query);
        const audience = await Customer.find(query).select('_id');

        // Extract just the IDs into an array
        const audienceIds = audience.map(c => c._id.toString());
        return {audienceSize,audienceIds};
    }
    catch(error){
        console.log("error in fetching the audience in repo layer", error);

        throw error;
    }
};




