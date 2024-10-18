import prisma from "@/config/prisma";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginService = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    const user = await prisma.user.findUnique({
        where: {
            email,
    
        },
    });
    if (!user) {
        res.status(400).json({
            message: "User Not Found!",
        });
    }
    const passwordMatch = await bcrypt.compare(
        password,
        user?.password as string
    );

    if (!passwordMatch) {
        res.status(400).json({
            message: "Password not match!",
        });
    }
    const token = jwt.sign({id: user?.id}, process.env.JWT_SECRET as string, {expiresIn: "30d"})
    res.status(200).json({
        message: "Login Success!",
        success: true,
        token
    })

};
