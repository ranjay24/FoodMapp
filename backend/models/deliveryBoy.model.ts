import mongoose, { Document, Types } from "mongoose";

interface IDeliveryBoy extends Document {
    name: string;
    phone: string;
    vehicleType: string;
    isAvailable: boolean;
    assignedOrders: Types.ObjectId[]; // Use Types.ObjectId[]
}

const deliveryBoySchema = new mongoose.Schema<IDeliveryBoy>(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        vehicleType: { type: String, required: true },
        isAvailable: { type: Boolean, default: true },
        assignedOrders: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Order",
            },
        ],
    },
    { timestamps: true }
);

export const DeliveryBoy = mongoose.model<IDeliveryBoy>("DeliveryBoy", deliveryBoySchema);
