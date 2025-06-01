import redisClient from '../utils/redisClient.js';
import mongoose from 'mongoose';
import Order from '../schema/order.js';
import { DB_URL } from '../config/serverConfig.js';

// Connect to MongoDB
await mongoose.connect(DB_URL);

console.log("⏳ Orders CSV Worker running...");
let lastId = '0';
async function startWorker() {
  while (true) {
    try {
      const result = await redisClient.xRead(
        [{ key: 'order_stream', id: lastId }], // Use '0' for testing or '$' for new ones only
        { BLOCK: 5000, COUNT: 10 }
      );

      if (!result) continue;

      for (const stream of result) {
        for (const message of stream.messages) {
          const { userId, row } = message.message;
          const data = JSON.parse(row);
            lastId = message.id;
          console.log("📥 Processing Orders:", data);

          const order = await Order.findOneAndUpdate(
            { customer_external_id: data.customer_external_id , userId },
            { ...data, userId },
            { upsert: true, new: true }
          );
        //   lastSeenId = id;
        //   console.log(user);

        }
      }
    } catch (err) {
      console.error("❌ Worker error:", err);
      await new Promise(resolve => setTimeout(resolve, 3000)); // backoff on error
    }
  }
}

startWorker();
