import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, token) => {
    
    const transpoter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const verificationLink = `http://localhost:5000/api/auth/verify/${token}`;
    

    await transpoter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your email",
        html: `<h1>Click to verify</h1>
        <a href="${verificationLink}">${verificationLink}</a>`
    })
}
