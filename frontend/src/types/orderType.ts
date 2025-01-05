export type CheckoutSessionRequest = {
    cartItems:{
        menuId:string;
        name:string;
        image:string;
        price:string;
        quantity:string;
    }[];
    deliveryDetails:{
        name:string;
        email:string;
        contact:string;
        address:string;
        city:string;
        country:string
    },
    restaurantId:string;
}
export interface Orders extends CheckoutSessionRequest {
    _id: string;
    status: string;
    totalAmount: number;
    deliveryBoy?: string; // Add deliveryBoy here
}

export type OrderState = {
    loading:boolean;
    orders:Orders[];
    createCheckoutSession: (checkoutSessionRequest:CheckoutSessionRequest) => Promise<void>;
    getOrderDetails: () => Promise<void>;
    assignDeliveryBoyToOrder: (orderId: string, deliveryBoyId: string) => Promise<Orders>;
}