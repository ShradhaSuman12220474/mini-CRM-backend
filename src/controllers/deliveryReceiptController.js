import { CommunicationLog } from "../schema/communicationLogs.js";

export async function deliveryReceiptController(req, res) {
  try {
    const { campaignId, customerId, status } = req.body;
    await CommunicationLog.updateOne(
      { campaignId, customerId },
      { $set: { status } }
    );
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}