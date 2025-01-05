import mongoose, { Document, Schema, Types } from "mongoose";

type DeliveryDetails = {
    email: string;
    name: string;
    address: string;
    city: string;
};

type CartItems = {
    menuId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
};

export interface IOrder extends Document {
    user: Types.ObjectId; // Use Types.ObjectId
    restaurant: Types.ObjectId; // Use Types.ObjectId
    deliveryDetails: DeliveryDetails;
    cartItems: CartItems[];
    totalAmount: number;
    status: "pending" | "confirmed" | "preparing" | "outfordelivery" | "delivered";
    deliveryBoy?: Types.ObjectId; // Use Types.ObjectId
}

const orderSchema = new mongoose.Schema<IOrder>(
    {
        user: {
            type: Schema.Types.ObjectId, // Correct type
            ref: "User",
            required: true,
        },
        restaurant: {
            type: Schema.Types.ObjectId, // Correct type
            ref: "Restaurant",
            required: true,
        },
        deliveryDetails: {
            email: { type: String, required: true },
            name: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
        },
        cartItems: [
            {
                menuId: { type: String, required: true },
                name: { type: String, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true },
            },
        ],
        totalAmount: { type: Number }, // Added required field for consistency
        status: {
            type: String,
            enum: ["pending", "confirmed", "preparing", "outfordelivery", "delivered"],
            required: true,
        },
        deliveryBoy: {
            type: Schema.Types.ObjectId, // Correct type
            ref: "DeliveryBoy",
        },
    },
    { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", orderSchema);
