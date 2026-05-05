import redisClient from "../utils/redis.js"

const cache=(keyGenerator,ttl=300) =>{
    return async (req,res,next)=>{
        try{
            const key=keyGenerator(req);
            const cachedData= await redisClient.get(key);
            if(cachedData){
                const parsedData=JSON.parse(cachedData);
                console.log("Found in cache");
                return res.status(parsedData.status || 200).json(parsedData);
            }
            const originalJson=res.json.bind(res);
            res.json = async (data) =>{
                await redisClient.set(key, JSON.stringify(data), {
                    EX: ttl
                });
                return originalJson(data);
            };
            next();
        }
        catch(error){
            console.log("Redis cache error : ",error);
            next();
        }
    }
}
export default cache