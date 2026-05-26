import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { togglevideolike, togglecommentlike, toggletweetlike, totallikesofvideo, totallikesofcomment, totallikesoftweet, getLikedVideos, toggleVideoDislike, getVideoDislikeStatus } from "../controllers/like.controller.js";
import cache from "../middlewares/redis.middleware.js";
const router = Router();


router.route("/togglevideolike/:videoid").post(verifyJWT,togglevideolike)

router.route("/totallikesofvideo/:videoid").get(totallikesofvideo)

router.route("/togglecommentlike/:commentid").post(verifyJWT,togglecommentlike)

router.route("/toggletweetlike/:tweetid").post(verifyJWT,toggletweetlike)

router.route("/totallikesofcomment/:commentid").get(
    cache((req)=>`totallikesofcomment:${req.params.commentid}`,300),
    totallikesofcomment)

router.route("/totallikesoftweet/:tweetid").get(
    cache((req)=>`totallikesoftweet:${req.params.tweetid}`,300),
    totallikesoftweet
)

router.route("/videos").get(verifyJWT, getLikedVideos)

// Dislike routes
router.route("/togglevideodislike/:videoid").post(verifyJWT, toggleVideoDislike)
router.route("/dislikestatus/:videoid").get(getVideoDislikeStatus)

export default router;