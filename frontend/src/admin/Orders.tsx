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
<div className="font-serif max-w-6xl mx-auto py-10 px-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
  <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10 text-center">
    Orders Overview
  </h1>
  <div className="space-y-8">
    {restaurantOrder.map((order) => (
      <div
        key={order._id}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start sm:items-center">
          <div className="flex-1 mb-6 sm:mb-0">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {order.deliveryDetails.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              <span className="font-semibold text-orange-600">Address: </span>
              {order.deliveryDetails.address}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              <span className="font-semibold text-green-500">Total Amount: </span>₹
              {order.totalAmount*100}
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
                  {[
                    "Pending",
                    "Confirmed",
                    "Preparing",
                    "OutForDelivery",
                    "Delivered",
                  ].map((status: string, index: number) => (
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
        <div className="mt-6">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            Ordered Items
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {order.cartItems.map((item: any, index: number) => (
              <div
                key={index}
                className="flex items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="text-md font-semibold text-gray-800 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Price: ₹{item.price*item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Orders;
