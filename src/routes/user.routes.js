import {Router} from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
  updateAccountDetails,
  changeCurrentPassword,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
  updateUserAvatar,
  updateUserCoverImage
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authLimiter,apiLimiter } from "../middlewares/ratelimiter.middleware.js";

import {upload} from "../middlewares/multer.middleware.js"
import  cache  from '../middlewares/redis.middleware.js';

import { registerValidator, loginValidator } from '../validators/user.validator.js';
import { validateimage,validatecoverimage } from '../middlewares/filevalidator.js';
import { validateRequest } from '../middlewares/validate.js';

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    validateimage,
    validatecoverimage,
    registerValidator,
    validateRequest,
    authLimiter,
    registerUser
)


router.route("/login").post(loginValidator, validateRequest, authLimiter, loginUser)

router.route("/verify-email").post(apiLimiter, verifyEmail)

router.route("/forgot-password").post(apiLimiter, forgotPassword)

router.route("/reset-password").post(apiLimiter, resetPassword)

//secure routes
router.route("/logout").post(verifyJWT,logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT,changeCurrentPassword)

router.route("/current-user").get(verifyJWT,getCurrentUser)

router.route("/update-account").patch(verifyJWT,updateAccountDetails)

router.route("/update-avatar").patch(verifyJWT,upload.single("avatar"),updateUserAvatar)

router.route("/update-cover-image").patch(verifyJWT,upload.single("coverImage"),updateUserCoverImage)

router.route("/getchannelprofile/:username").get(
    verifyJWT,
    cache((req)=>`channel:${req.params.username?.toLowerCase()}`,300),
    getUserChannelProfile
)

router.route("/getwatchhistory").get(
    verifyJWT,
    cache((req)=>`watchhistory:${req.user._id.toString()}`,300),
    getWatchHistory
)


export default router;