import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";
import connectDB from "./db/index.js";
const app = express();
dotenv.config({
    path: "./.env"
});
// 🔥 REQUIRED MIDDLEWARE
app.use(express.json());

// 🔥 ROUTE CONNECTION (THIS WAS MISSING)
app.use("/api/v1/users", userRouter);
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running on port ${process.env.PORT || 8000}`)
    })
})
.catch((err)=>{
    console.log("Error in DB connection:",err);
     
})






















/*
import express from "express";
const app=express();

( async()=>{
    try{
        await moongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}}`)
        app.on("error",(err)=>{
            console.log("Error:",err);
            throw err;
        })
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    }
    catch(err){
        console.log("Error:",err);
        throw err;
    }
})()
    */