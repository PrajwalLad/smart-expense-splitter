import express from 'express'
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createGroup, getGroupDetails, getGroups } from '../controllers/group.controller.js';

const groupRouter = express.Router();

groupRouter.post("/createGroup", verifyToken, createGroup);
groupRouter.get("/", verifyToken, getGroups);
groupRouter.get("/:id", verifyToken, getGroupDetails);

export default groupRouter;