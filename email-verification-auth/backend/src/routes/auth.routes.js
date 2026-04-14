import express from "express";
import { login, register, verifyEmail } from "../controllers/auth.controller.js";
import { procted } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyEmail);

router.get("/dashboard", procted, (req, res) => {
    res.json({
        message: "Welcome to dashboard",
        user: req.user
    })
})

export default router;