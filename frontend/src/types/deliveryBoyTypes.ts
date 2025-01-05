import { Orders } from "./orderType";

export interface DeliveryBoyType {
    _id: string;
    name: string;
    phone: string;
    vehicleType: string;
    isAvailable: boolean;
    assignedOrders: Orders[];
}
