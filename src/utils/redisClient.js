import { createClient } from 'redis';

// const redisClient = createClient({ url: process.env.REDIS_URL });

const redisClient = createClient({
    username: 'default',
    password: 'XrBpfHYTXiWJrjJh84ci1v5JW0WzCLyP',
    socket: {
        host: 'redis-17487.crce179.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 17487
    }
});

redisClient.on('error', (err) => console.error('Redis Error:', err));

await redisClient.connect();

export default redisClient;
