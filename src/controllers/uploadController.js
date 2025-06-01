import csvParser from 'csv-parser';
import { Readable } from 'stream';
import redisClient from '../utils/redisClient.js';

export async function uploadCustomers(req, res) {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const stream = Readable.from(req.file.buffer.toString('utf-8'));
  const user = JSON.parse(req.body.user);

const rows = [];
let rowCount = 0;
stream
  .pipe(csvParser())
  .on('data', (row) => {
    rows.push(row);
    console.log(row);

  })
  .on('end', async () => {
    for (const row of rows) {
      await redisClient.xAdd('customer_stream', '*', {
        userId: user.id,
        row: JSON.stringify(row),
      });
      rowCount++;
    }
    res.status(202).json({ message: "File received and queued for processing", number: rowCount });
  })
  .on('error', (err) => {
    res.status(500).json({ error: "Error parsing CSV" });
  })

}




export async function uploadOrders(req, res) {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const stream = Readable.from(req.file.buffer.toString('utf-8'));
  const user = JSON.parse(req.body.user);

const rows = [];
let rowCount = 0;
stream
  .pipe(csvParser())
  .on('data', (row) => {
    rows.push(row);
    console.log(row);
    
  })
  .on('end', async () => {
    for (const row of rows) {
      await redisClient.xAdd('order_stream', '*', {
        userId: user.id,
        row: JSON.stringify(row),
      });
      rowCount++;
    }
    res.status(202).json({ message: "File received and queued for processing", number: rowCount });
  })
  .on('error', (err) => {
    res.status(500).json({ error: "Error parsing CSV" });
  })

}
