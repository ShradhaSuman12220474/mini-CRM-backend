import mongoose from "mongoose";

const segmentRuleSchema = new mongoose.Schema({

    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    rule : {
        string
    }
}, {timestamps: true});

const segementRule = mongoose.model('SegmentRule', segmentRuleSchema);

export default segementRule;

