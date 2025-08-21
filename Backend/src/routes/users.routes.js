import { Router } from 'express'
import { getProfile, googleAuth, loginUser, logoutUser, regeneratedTokens, registerUser, updatePassword, updateProfile } from '../controllers/users.controllers.js';
import {upload} from '../middleware/multer.middleware.js';
import verifyJWT from "../middleware/auth.middleware.js"


const userRouter = Router()


userRouter.route('/register').post(
   upload.fields([{ name: 'avatar', maxCount: 1 }]),
   registerUser
)
userRouter.route('/login').post(loginUser);
userRouter.route('/logout').post(verifyJWT,logoutUser);
userRouter.route('/refresh').post(verifyJWT,regeneratedTokens);
userRouter.route('/profile').get(verifyJWT,getProfile);
userRouter.route('/profile').put(verifyJWT,updateProfile);
userRouter.route('/change-password').put(verifyJWT,updatePassword)
userRouter.route('/google').post(googleAuth)


export default userRouter;