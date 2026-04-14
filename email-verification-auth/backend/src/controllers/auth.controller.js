import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../services/email.service.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });

        if (exists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashed = await bcrypt.hash(password, 10);


        const token = jwt.sign(
            { name, email, password: hashed },
            process.env.JWT_SECRET,
            { expiresIn: "10m" }
        )

        await sendVerificationEmail(email, token);

        res.json({ message: "Check your email to verify account" })

    } catch (err) {
        console.log("REGISTER ERROR:", err.message);
        res.status(500).json({ error: err.message })
    }
}

export const verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const existingUser = await User.findOne({ email: decode.email });

        if (existingUser) {
            return res.send("User already exists");
        }

        const newUser = await User.create({
            name: decode.name,
            email: decode.email,
            password: decode.password,
            isVerified: true
        })

        const loginToken = jwt.sign(
            {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.send(`
             <h2>Verified ✅</h2>
            <p>You can login now</p>
            <p><b>Token:</b> ${loginToken}</p>
            `)
    } catch (error) {
        res.send("<h2>Invalid or expired link ❌</h2>");
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "user not found" });

        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            message: "Login success",
            token: token
        })

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}