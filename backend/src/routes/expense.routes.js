import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';
import { createExpense, friendsSummary, getSummary, groupsSummary } from '../controllers/expense.controller.js';

const expenseRouter = express.Router();

expenseRouter.post("/", verifyToken, createExpense);
expenseRouter.get("/", verifyToken, getSummary);
expenseRouter.get("/friends", verifyToken, friendsSummary);
expenseRouter.get("/groups", verifyToken, groupsSummary);


export default expenseRouter;