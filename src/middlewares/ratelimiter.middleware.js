import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import Redis from "ioredis";

const redisclient=new Redis({
    host:"127.0.0.1",
    port:6379
})

//for normal apis
export const apiLimiter=rateLimit({
    store:new RedisStore({
        sendCommand: (...args) => redisclient.call(...args)
    }),
    windowMs: 15*60*1000, //15 minutes
    max: 100, //limit each IP to 100 requests per windowMs
    message:"Too many requests from this IP, please try again after 15 minutes"
})  


//for auth related apis
export const authLimiter=rateLimit({
    store:new RedisStore({
        sendCommand: (...args) => redisclient.call(...args)
    }),
    windowMs: 15*60*10, //15 minutes
    max:5,
    message:"Too many login attempts from this IP"
})
