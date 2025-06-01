
import mongoose from "mongoose";


const communicationLogSchema = new mongoose.Schema({
  campaignId: mongoose.Types.ObjectId,
  customerId: mongoose.Types.ObjectId,
  message: String,
  status: { type: String, enum: ['SENT', 'FAILED','PENDING'], default: 'PENDING' },
});

export const CommunicationLog = mongoose.model('CommunicationLog', communicationLogSchema);
