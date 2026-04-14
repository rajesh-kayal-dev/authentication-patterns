import express, { json } from "express";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.json("Api is running")
})


export default app;