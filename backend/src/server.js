import connectDB from "./db.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./route/authRoutes.js"
import taskRoutes from "./route/taskRoutes.js"

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/api', (req, res)=>{
    res.send("Hello World")
})

app.use('/api/auth', authRoutes)
app.use('/api/tasks', taskRoutes)

app.listen(PORT, ()=>{
    console.log(`Server is running on https://localhost:${PORT}`)
})
