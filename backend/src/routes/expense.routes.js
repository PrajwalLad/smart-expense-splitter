import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createExpense, getSummary } from '../controllers/expense.controller.js';

const expenseRouter = express.Router();

expenseRouter.post("/", verifyToken, createExpense);
expenseRouter.get("/", verifyToken, getSummary);

export default expenseRouter;