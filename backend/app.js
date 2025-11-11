import express from "express";
import cors from 'cors'
import userRouter from "./src/routes/user.routes.js";
import friendRouter from "./src/routes/friend.routes.js";
import groupRouter from "./src/routes/group.routes.js";
import expenseRouter from "./src/routes/expense.routes.js";

const app = express();

app.use(express.json()); // middleware to parse JSON

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

//user routes
app.use("/api", userRouter);

//friend routes
app.use("/api/friends", friendRouter)

//group routes
app.use("/api/groups", groupRouter)

//expense routes
app.use("/api/expense", expenseRouter);

export default app;