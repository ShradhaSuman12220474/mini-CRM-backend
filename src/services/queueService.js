const Redis = require('ioredis');
const redis = new Redis();

const CUSTOMER_STREAM = 'customer_upload_stream';

exports.enqueueCustomerRow = async (row) => {
  await redis.xadd(CUSTOMER_STREAM, '*', 'data', JSON.stringify(row));
};
