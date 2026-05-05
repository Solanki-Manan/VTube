import {Router} from 'express';
import{
    publishVideo,
    getallvideos,
    getvideobyid,
    updatevideo,
    deletevideo
} from "../controllers/video.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import  cache  from '../middlewares/redis.middleware.js';
import { authLimiter,apiLimiter } from "../middlewares/ratelimiter.middleware.js";

const router = Router();
router.route("/publish").post(verifyJWT,upload.fields([
    {
        name: "videofile",
        maxCount: 1
    },
    {
        name: "thumbnailfile",
        maxCount: 1
    }
]),apiLimiter, publishVideo )   

router.route("/all").get(
    cache((req)=>`videos:all:${req.originalUrl}`,300),
    getallvideos)

router.route("/get/:id").get(
    cache((req)=>`video:${req.params.id}`,600),
    getvideobyid)
router.route("/update/:id").put(verifyJWT,updatevideo)
router.route("/delete/:id").delete(verifyJWT,deletevideo)



export default router;