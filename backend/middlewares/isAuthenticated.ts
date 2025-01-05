import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            id: string;
        }
    }
}

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check for token in cookies
        const token = req.cookies?.token;
        if (!token) {
            res.status(401).json({
                success: false,
                message: "No authentication token found in cookies",
            });
            return 
        }

        // Verify and decode the token
        const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;
        if (!decode || !decode.userId) {
            res.status(401).json({
                success: false,
                message: "Invalid or malformed token",
            });
            return
        }

        // Check if token is expired
        if (decode.exp && decode.exp * 1000 < Date.now()) {
           res.status(401).json({
                success: false,
                message: "Token has expired",
            });
            return
        }

        // Attach userId to request object
        req.id = decode.userId;

        // Proceed to the next middleware
        next();
    } catch (error) {
        // Narrow down the type of error
        if (error instanceof Error) {
         res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message,
            });
            return
        } else {
            res.status(500).json({
                success: false,
                message: "An unknown error occurred",
            });
            return
        }
    }
};