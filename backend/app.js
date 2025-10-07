import express from "express";
import router from "./src/routes/user.routes.js";
import cors from 'cors'

const app = express();

app.use(express.json()); // middleware to parse JSON

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

//routes
app.use("/api", router);

export default app;