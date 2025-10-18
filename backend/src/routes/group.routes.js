import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createGroup, getGroups } from '../controllers/group.controller.js';

const groupRouter = express.Router();

groupRouter.post("/createGroup", verifyToken, createGroup);
groupRouter.get("/", verifyToken, getGroups)

export default groupRouter;