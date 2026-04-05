import { createClient } from "redis";

const redis = createClient({
    url: process.env.REDIS_URI
});

// await redis.connect();

redis.on("connect", () => {
    console.log("Redis connected for queue");
});

redis.on("error", (err) => {
    console.error("Redis error connect for queue", err);
});



export default redis;
