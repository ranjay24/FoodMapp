import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";
import menuRoute from "./routes/menu.route";
import orderRoute from "./routes/order.route";
import deliveryBoyRoute from "./routes/deliveryboy.route";
import path from "path";

// Load environment variables
dotenv.config();

// Validate Environment Variables
if (!process.env.PORT || !process.env.MONGO_URI) {
    throw new Error("Missing required environment variables. Check your .env file.");
}

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;
const DIRNAME = path.resolve();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = ["https://foodmapp-8dt4.onrender.com"];
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/deliveryboy", deliveryBoyRoute);

// Serve Static Files for Frontend
app.use(express.static(path.join(DIRNAME, "/frontend/dist")));
app.use("*", (_, res) => {
    res.sendFile(path.resolve(DIRNAME, "frontend", "dist", "index.html"));
});

// Error Handling Middleware
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        console.error("Error:", err.message);
        res.status(500).json({ message: "An unexpected error occurred.", error: err.message });
    } else {
        console.error("Unknown error:", err);
        res.status(500).json({ message: "An unexpected error occurred." });
    }
});

// Start the Server
app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error("Failed to connect to the database:", (error as Error).message);
        process.exit(1); // Exit the process if the database connection fails
    }
});
