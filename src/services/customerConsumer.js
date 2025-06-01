import redisClient from '../utils/redisClient.js';
import mongoose from 'mongoose';
import Customer from '../schema/customer.js';
import { DB_URL } from '../config/serverConfig.js';

// Connect to MongoDB
await mongoose.connect(DB_URL);

console.log("⏳ Customer CSV Worker running...");
let lastId = '0';
async function startWorker() {
  while (true) {
    try {
      const result = await redisClient.xRead(
        [{ key: 'customer_stream', id: lastId }], // Use '0' for testing or '$' for new ones only
        { BLOCK: 5000, COUNT: 10 }
      );

      if (!result) continue;

      for (const stream of result) {
        for (const message of stream.messages) {
          const { userId, row } = message.message;
          const data = JSON.parse(row);
            lastId = message.id;
        //   console.log("📥 Processing customer:", data);

          const user = await Customer.findOneAndUpdate(
            { email: data.email, userId },
            { ...data, userId  },
          );
          
        //   lastSeenId = id;
          console.log(user);

        }
      }
    } catch (err) {
      console.error("❌ Worker error:", err);
      await new Promise(resolve => setTimeout(resolve, 3000)); // backoff on error
    }
  }
}

startWorker();
