import mongoose, { Schema } from "mongoose";

const dislikeSchema = new Schema({
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    dislikedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

export const Dislike = mongoose.model("Dislike", dislikeSchema);
