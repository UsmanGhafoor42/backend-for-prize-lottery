import prisma from "@/config/prisma";
import { Request, Response } from "express";
import crypto from "crypto";



const createTicket = async( req: Request, res: Response)=>{
    const { prizeId, userId, quantity} = req.body;
    const codeLength= 6;
    // const randomCode = crypto.randomBytes(codeLength).toString("hex").substring(0, codeLength)

    try {
        // Create an array of ticket data
        const ticketsData = Array.from({ length: quantity }, () => ({
            prizeId,
            userId,
            ticketNumber: crypto.randomBytes(codeLength).toString("hex").substring(0, codeLength), // Generate a unique code for each ticket
        }));

        // Use prisma to create multiple tickets
        const tickets = await prisma.tickets.createMany({
            data: ticketsData,
        });

        res.status(201).json({
            message: `${quantity} tickets created successfully`,
            tickets,
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating tickets",
            error: (error as Error).message,
        });
    }
}

export { createTicket };
