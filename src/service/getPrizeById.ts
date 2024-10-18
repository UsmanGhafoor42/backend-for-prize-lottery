import prisma from "@/config/prisma";
import { Request, Response } from "express";


 export const getPrizeById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const prize = await prisma.prize.findUnique({
        where: {
            id: id,
        },
    });
    res.status(200).json({
        message: "Prize fetched successfully",
        prize,
    });
}
