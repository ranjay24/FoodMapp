import { create } from "zustand";
import axios from "axios";
import { Orders } from "@/types/orderType";

const API_END_POINT = "http://localhost:8000/api/v1/deliveryboy";
axios.defaults.withCredentials = true;

interface Order {
  _id: string;
  status: string;
}

interface DeliveryBoy {
  _id: string;
  name: string;
  phone: string;
  vehicleType: string;
  isAvailable: boolean;
  assignedOrders: Orders[];  // Include assigned orders here
}

interface DeliveryStore {
  deliveryBoys: DeliveryBoy[];
  fetchDeliveryBoys: () => Promise<void>;
  addDeliveryBoy: (deliveryBoy: Partial<DeliveryBoy>) => Promise<DeliveryBoy>;
  assignDeliveryBoyToOrder: (orderId: string, deliveryBoyId: string) => Promise<void>;
}

export const useDeliveryStore = create<DeliveryStore>((set) => ({
  deliveryBoys: [],

  // Fetch all delivery boys
  fetchDeliveryBoys: async () => {
    try {
      const { data } = await axios.get(`${API_END_POINT}`);

      // Adjust to match the API response structure
      if (data.success && Array.isArray(data.deliveryBoys)) {
        set({ deliveryBoys: data.deliveryBoys });
      } else if (data.success && Array.isArray(data.data)) {
        set({ deliveryBoys: data.data }); // Handle if delivery boys are in `data`
      } else {
        console.error("Unexpected response format:", data);
        set({ deliveryBoys: [] }); // Fallback to empty array
      }
    } catch (error) {
      console.error("Failed to fetch delivery boys:", error);
      throw new Error("Failed to fetch delivery boys");
    }
  },

  // Add a new delivery boy
  addDeliveryBoy: async (deliveryBoy) => {
    try {
      const { data } = await axios.post(`${API_END_POINT}/add`, deliveryBoy);

      if (data && data.data && data.data._id) {
        set((state) => ({
          deliveryBoys: [...state.deliveryBoys, data.data], // Add the new delivery boy to the list
        }));
        return data.data;
      } else {
        console.error("Invalid response from server:", data);
        throw new Error("Failed to add delivery boy");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Failed to add delivery boy:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Failed to add delivery boy");
      } else if (error instanceof Error) {
        console.error("Error:", error.message);
        throw new Error(error.message);
      } else {
        console.error("Unknown error:", error);
        throw new Error("An unknown error occurred");
      }
    }
  },

  // Assign a delivery boy to an order
  assignDeliveryBoyToOrder: async (orderId, deliveryBoyId) => {
    try {
      await axios.post(`${API_END_POINT}/assign/${orderId}`, { deliveryBoyId });
    } catch (error) {
      console.error("Failed to assign delivery boy to order:", error);
      throw new Error("Failed to assign delivery boy to order");
    }
  },
}));
