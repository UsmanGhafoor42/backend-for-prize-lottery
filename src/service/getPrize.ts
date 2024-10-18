import prisma from "@/config/prisma";
import { Request, Response } from "express";


export const getPrize = async (req: Request, res: Response) => {
    const prize = await prisma.prize.findMany();
    console.log("prize", prize);
    res.status(200).json({
        message: "Prize fetched successfully",
        prize,
    });
}


