import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {    
    //get user details from frontend
    
     const {fullName,username, email, password} = req.body;
     console.log("Email:-",email)
     //console.log("password:-",password)
    //validate user input
    if(
        [fullName,username, email, password].some((field) => 
        field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required");
    }
    //check if user already exists
    const existedUser=User.findOne({
        $or: [{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with given username or email already exists");
    }
    //handle file upload paths
    const avtarLocalPath=req.files?.avatar[0]?.path
    const coverImageLocalPath=req.files?.coverImage[0]?.path

    if(!avtarLocalPath){
        throw new ApiError(400,"Avatar is required");
    }

    //upload to cloudinary
    const avtar=await uploadOnCloudinary(avtarLocalPath);
    const coverImage=await uploadOnCloudinary(coverImageLocalPath);
    
    if(!avtar){
        throw new ApiError(400,"Avtar file if required");

    }

    //create entry in db

    const user=await User.create({
        fullName,
        avtar:avtar.url,
        coverImage:coverImage?.url || "",
        username:username.toLowerCase(),
        email,
        password,
    })

    //check if user created successfully

    const createdUser=await User.findById(user._id).select("-password -refreshToken");


    if(!createdUser){
        throw new ApiError(500,"Something went wrong while creating user");
    }

    //return response
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully")
    )
    
})

export {
    registerUser
};