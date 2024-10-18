import prisma from "@/config/prisma";
import { Request, Response } from "express";
import { z } from "zod";
import { PrizeCategory } from "@prisma/client"; // Implied import for PrizeCategory enum

export const createPrize = async (req: Request, res: Response) => {
  const prizeSchema = z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    quantity: z.number(),
    price: z.number(),
    category: z.nativeEnum(PrizeCategory), // Adjusted to use the correct enum type
  });

  try {
    const parsedData = prizeSchema.parse(req.body);
    console.log("Parsed Data:", parsedData); // Log the parsed data

    const prize = await prisma.prize.create({
      data: parsedData,
    });
    res.status(201).json({
      message: "Prize created successfully",
      prize,
    });
  } catch (error) {
    console.error("Error creating prize:", error); // Log the error
    res.status(500).json({
      message: "Failed to create prize",
      error,
    });
  }
};
