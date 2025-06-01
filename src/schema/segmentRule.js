import mongoose from "mongoose";

const segmentRuleSchema = new mongoose.Schema({

    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    logicType: { 
        type: String, 
        enum: ['AND', 'OR'], 
        required: true 
    },
    conditions: [
        {
        field: { type: String, required: true },
        op: { type: String, required: true },
        value: { type: mongoose.Schema.Types.Mixed, required: true }
        }
    ],
}, {timestamps: true});

const segementRule = mongoose.model('SegmentRule', segmentRuleSchema);

export default segementRule;

