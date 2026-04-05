import Redis from "ioredis";    

const redis = new Redis(process.env.REDIS_URI_LOCAL, {
    maxRetriesPerRequest: null,
});

redis.on("connect", () => {
    console.log("Redis connected to local instance");
});

redis.on("error", (err) => {
    console.error("Redis error in local instance:", err);
});

export default redis;