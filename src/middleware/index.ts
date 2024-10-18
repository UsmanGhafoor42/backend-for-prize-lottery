import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization; // Get the Authorization header
    console.log("authHeader", authHeader);
    const token = authHeader 
    if (!token) {
        res.status(400).json({
            message: "Token is required!",
            success: false
        });
        return; // Ensure the function exits if no token is found
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string); // Verify the token
        console.log("decoded", decoded);
        next(); // Proceed to the next middleware
    } catch (err) {
        res.status(400).json({
            message: "Invalid token format!",
            success: false
        });
    }
}
