import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import {app} from "./app.js";
import { connectRedis } from "./utils/redis.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        import("./worker/video.worker.js").then(() => {
            console.log("Video processing worker initialized inline");
        });
    })
    .catch((err) => {
        console.log("DB Error:", err);
    });

connectRedis()
    .catch((err) => {
        console.log("Redis Error:", err);
    });
