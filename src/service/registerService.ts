import prisma from "@/config/prisma";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const registerService = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
  
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
    res.status(400).json({
        message: "User already exists",
      });
    }
  
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: passwordHash,
      },
    });
    
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  }
