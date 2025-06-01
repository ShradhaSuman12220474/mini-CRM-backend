import mongoose from "mongoose";

const segmentRuleSchema = new mongoose.Schema({

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    rule : {
        type : String,
        required : true,
    }
}, {timestamps: true});

const segementRule = mongoose.model('SegmentRule', segmentRuleSchema);

export default segementRule;

