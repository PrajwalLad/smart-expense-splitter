import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js';
import { addFriend, getFriends } from '../controllers/friend.controller.js';

const friendRouter = express.Router();

friendRouter.post("/addFriend", verifyToken, addFriend);
friendRouter.get("/", verifyToken, getFriends)

export default friendRouter;