import { Request, Response } from "express";
import { Order } from "../models/order.model";
import mongoose, { Types } from "mongoose";
import { DeliveryBoy } from "../models/deliveryBoy.model";

// Add a new delivery boy
export const addDeliveryBoy = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, phone, vehicleType } = req.body;

        if (!name || !phone || !vehicleType) {
            res.status(400).json({ success: false, message: "Missing required fields" });
            return;
        }

        const deliveryBoy = new DeliveryBoy(req.body);
        await deliveryBoy.save();
        res.status(201).json({ success: true, message: "Delivery boy added successfully", data: deliveryBoy });
    } catch (error) {
        console.error("Error adding delivery boy:", error instanceof Error ? error.message : error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};

// Get all delivery boys
export const getAllDeliveryBoys = async (req: Request, res: Response): Promise<void> => {
    try {
        const deliveryBoys = await DeliveryBoy.find().populate({
            path: "assignedOrders",
            select: "status deliveryBoy", // Include only required fields
        });
        res.status(200).json({ success: true, data: deliveryBoys });
    } catch (error) {
        console.error("Error fetching delivery boys:", error instanceof Error ? error.message : error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};

// Assign delivery boy to an order
export const assignDeliveryBoyToOrder = async (req: Request, res: Response): Promise<void> => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { deliveryBoyId } = req.body;
        const { orderId } = req.params;

        // Validate IDs
        if (!Types.ObjectId.isValid(deliveryBoyId) || !Types.ObjectId.isValid(orderId)) {
            res.status(400).json({ success: false, message: "Invalid deliveryBoyId or orderId" });
            return;
        }

        const deliveryBoy = await DeliveryBoy.findById(deliveryBoyId).session(session);
        const order = await Order.findById(orderId).session(session);

        if (!deliveryBoy || !deliveryBoy.isAvailable) {
            res.status(400).json({ success: false, message: "Delivery boy not available or does not exist" });
            return;
        }

        if (!order) {
            res.status(404).json({ success: false, message: "Order not found" });
            return;
        }

        // Assign delivery boy to the order and update their status
        deliveryBoy.isAvailable = false;
        deliveryBoy.assignedOrders.push(new Types.ObjectId(orderId));
        order.status = "outfordelivery";
        order.deliveryBoy = new Types.ObjectId(deliveryBoyId);

        await deliveryBoy.save({ session });
        await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ success: true, message: "Delivery boy assigned successfully", data: order });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        console.error("Error assigning delivery boy:", error instanceof Error ? error.message : error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error occurred",
        });
    }
};
