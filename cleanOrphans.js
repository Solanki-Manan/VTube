import 'dotenv/config';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { Video } from './src/models/video.model.js';
import { User } from './src/models/user.model.js';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

async function cleanOrphans() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    const videos = await Video.find({});
    let deletedCount = 0;

    for (const video of videos) {
      const userExists = await User.exists({ _id: video.owner });
      
      if (!userExists) {
        console.log(`Deleting orphaned video: "${video.title}" (${video._id})`);
        
        if (video.videofilepublicid) {
            await cloudinary.uploader.destroy(video.videofilepublicid, { resource_type: "video" }).catch(e => console.log("Cloudinary Video Error:", e.message));
        }
        if (video.thumbnailpublicid) {
            await cloudinary.uploader.destroy(video.thumbnailpublicid).catch(e => console.log("Cloudinary Thumbnail Error:", e.message));
        }
        
        await Video.findByIdAndDelete(video._id);
        deletedCount++;
      }
    }

    console.log(`\nSuccessfully deleted ${deletedCount} orphaned videos and their Cloudinary assets.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

cleanOrphans();
