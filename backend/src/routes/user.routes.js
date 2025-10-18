import express from 'express'
import { completeDetails, createUser, getUser, loginUser } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);

userRouter.post("/onboarding", verifyToken, completeDetails)

userRouter.get("/getUser", verifyToken, getUser)

export default userRouter;