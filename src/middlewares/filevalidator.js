import { ApiError } from "../utils/ApiError.js";

export const validateimage=(req,res,next)=>{
    const file=req.files?.avatar?.[0]
    if(!file){
        throw new ApiError(400,"Avatar image is required")
    }
    const allowedTypes=["image/jpeg","image/png","image/gif"];
    if(!allowedTypes.includes(file.mimetype)){
        throw new ApiError(400,"Only JPEG, PNG and GIF images are allowed")
    }
    //check file size
    const maxSize=2*1024*1024; //2MB
    if(file.size>maxSize){
        throw new ApiError(400,"File size should not exceed 2MB")
    }
    next();
}

export const validatecoverimage=(req,res,next)=>{
    const file=req.files?.coverImage?.[0]
    if(!file){
        throw new ApiError(400,"Cover image is required")
    }
    const allowedTypes=["image/jpeg","image/png","image/gif"];
    if(!allowedTypes.includes(file.mimetype)){
        throw new ApiError(400,"Only JPEG, PNG and GIF images are allowed")
    }
    next();
}