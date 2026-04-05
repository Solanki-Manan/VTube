import {Queue} from "bullmq";
// import redis from "./redis.connection.js";
import { connection } from "./queue.config.js";

const videoProcessingQueue = new Queue("video-processing", {
    connection
});

export default videoProcessingQueue;
