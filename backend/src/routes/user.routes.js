import express from 'express'
import { completeDetails, createUser, loginUser } from '../controllers/user.controllers.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);

router.post("/onboarding", verifyToken, completeDetails)

export default router;