import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useEffect } from "react";

import Background1 from "@/assets/Background1.jpg";

const Orders = () => {
  const { restaurantOrder, getRestaurantOrders, updateRestaurantOrder } =
    useRestaurantStore();

  const handleStatusChange = async (id: string, status: string) => {
    await updateRestaurantOrder(id, status);
  };

  useEffect(() => {
    getRestaurantOrders();
  }, []);

  return (
    <div className="font-serif max-w-6xl mx-auto py-10 px-6 relative min-h-screen">
  {/* Background Layer */}
  <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${Background1})` }}>
    <div className="absolute inset-0 bg-gray-800 opacity-90 pointer-events-none"></div>
  </div>

  {/* Content Layer */}
  <div className="relative z-10">
    {/* Orders Overview Header */}
    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10 text-center animate-fade-in-up">
      Orders Overview
    </h1>
    
    <div className="space-y-8">
      {restaurantOrder.map((order) => (
        <div
          key={order._id}
          className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300 ease-in-out animate-fade-in-up"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                {order.deliveryDetails.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-semibold text-orange-600">Address: </span>
                {order.deliveryDetails.address}
              </p>
            </div>
            <div className="w-full sm:w-1/3">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Order Status
              </Label>
              <Select
                onValueChange={(newStatus) =>
                  handleStatusChange(order._id, newStatus)
                }
                defaultValue={order.status}
              >
                <SelectTrigger className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {["Pending", "Confirmed", "Preparing", "OutForDelivery", "Delivered"].map((status: string, index: number) => (
                      <SelectItem
                        key={index}
                        value={status.toLowerCase()}
                        className="hover:bg-orange-100 dark:hover:bg-gray-600"
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product Section */}
          <div className="mt-6 animate-fade-in-up">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              Ordered Items
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {order.cartItems.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex flex-col items-start bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow space-y-2 animate-fade-in-up"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <h3 className="text-md font-semibold text-gray-800 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Price: ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  
  );
};

export default Orders;
