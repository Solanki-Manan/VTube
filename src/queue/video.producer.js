import videoProcessingQueue from "./video.queue.js";

export const addVideoToQueue = async (videodata) => {
    try{
        const job=await videoProcessingQueue.add("process-video", videodata,
            {
                attempts: 3, // Retry up to 3 times on failure
                backoff: {
                    type: "fixed",
                    delay: 5000 // Wait 5 seconds before retrying
                },
                removeOnComplete: true, // Remove job from queue on success
                removeOnFail: false // Keep failed jobs in the queue for debugging
            }
        );
        console.log(`Added video ${videodata.videoId} to processing queue with job ID ${job.id}`);
    }
    catch(err){
        console.error("Error adding video to queue:", err);
    }
}

export default addVideoToQueue;
