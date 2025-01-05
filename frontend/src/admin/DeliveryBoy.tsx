import React, { useState, useEffect } from "react";
import { useOrderStore } from "../store/useOrderStore";
import { Orders } from "@/types/orderType";
import { useDeliveryStore } from "@/store/useDeliveryStore";
import Background1 from "@/assets/Background1.jpg";

// Make sure to use the correct `DeliveryBoy` type from the store
interface DeliveryBoyType {
  _id: string;
  name: string;
  phone: string;
  vehicleType: string;
  isAvailable: boolean;
  assignedOrders: Orders[]; // Include assigned orders here
}

const DeliveryBoy = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { deliveryBoys, fetchDeliveryBoys, addDeliveryBoy } = useDeliveryStore();
  const { orders, assignDeliveryBoyToOrder } = useOrderStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        await fetchDeliveryBoys(); // Fetch delivery boys with their assigned orders
      } catch (err) {
        setError("Failed to fetch delivery boys");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchDeliveryBoys]);

  const handleAddDeliveryBoy = async () => {
    try {
      setError("");
      const deliveryBoyData = { name, phone, vehicleType };
      await addDeliveryBoy(deliveryBoyData);
      setName("");
      setPhone("");
      setVehicleType("");
    } catch (err) {
      setError("Failed to add delivery boy");
    }
  };

  const handleAssignDeliveryBoy = async (orderId: string) => {
    if (!selectedDeliveryBoy) {
      setError("Please select a delivery boy");
      return;
    }
    try {
      setError("");
      await assignDeliveryBoyToOrder(orderId, selectedDeliveryBoy);
      alert("Delivery boy assigned successfully!");
    } catch (err) {
      setError("Failed to assign delivery boy");
    }
  };

  return (
    <div
    className="relative font-serif flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20 bg-cover bg-center"
    style={{ backgroundImage: `url(${Background1})` }}
  >
    {/* Background Overlay */}
    <div className="absolute inset-0 bg-gray-900 opacity-70 pointer-events-none rounded-lg"></div>
  
    {/* Form Container */}
    <div className="z-10 p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Delivery Boy Management</h2>
  
      {/* Error Message */}
      {error && <p className="text-red-600 text-sm text-center mb-6">{error}</p>}
  
      {/* Loading State */}
      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : (
        <>
          {/* Add Delivery Boy Section */}
          <div className="p-6 border border-gray-300 rounded-lg bg-gray-50 shadow-md animate-fade-in-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Delivery Boy</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Vehicle Type"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
              <button
                onClick={handleAddDeliveryBoy}
                className="w-full py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Delivery Boy
              </button>
            </div>
          </div>
  
          {/* Delivery Boys List Section */}
          <div className="p-6 border border-gray-300 rounded-lg bg-gray-50 shadow-md animate-fade-in-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Delivery Boys List</h3>
            <ul className="space-y-4">
              {deliveryBoys.length > 0 ? (
                deliveryBoys.map((deliveryBoy: DeliveryBoyType) => {
                  if (!deliveryBoy) return null;
                  const { _id, name, phone, vehicleType, assignedOrders } = deliveryBoy;
                  return (
                    <li key={_id} className="p-4 border-b border-gray-200 hover:bg-gray-100 rounded-lg">
                      <p className="mb-2">
                        <strong>Name:</strong> {name || "No Name"} <br />
                        <strong>Phone:</strong> {phone || "No Phone"} <br />
                        <strong>Vehicle Type:</strong> {vehicleType || "No Vehicle Type"} <br />
                      </p>
                      <h4 className="font-semibold text-gray-800 mb-2">Assigned Orders:</h4>
                      {assignedOrders && assignedOrders.length > 0 ? (
                        <ul className="space-y-2">
                          {assignedOrders.map((order: Orders) => (
                            <li key={order._id} className="text-sm text-gray-600">
                              Order ID: {order._id} - Status: {order.status}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">No orders assigned</p>
                      )}
                    </li>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500">No delivery boys available</p>
              )}
            </ul>
          </div>
  
          {/* Assign Delivery Boy Section */}
          <div className="p-6 border border-gray-300 rounded-lg bg-gray-50 shadow-md animate-fade-in-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Assign Delivery Boy to Order</h3>
            <select
              value={selectedDeliveryBoy || ""}
              onChange={(e) => setSelectedDeliveryBoy(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            >
              <option value="">Select Delivery Boy</option>
              {deliveryBoys.map((deliveryBoy: DeliveryBoyType) => (
                <option key={deliveryBoy._id} value={deliveryBoy._id}>
                  {deliveryBoy.name || "No Name"}
                </option>
              ))}
            </select>
  
            <h4 className="font-semibold text-gray-800 mb-2">Orders</h4>
            {orders.length > 0 ? (
              orders.map((order: Orders) => (
                <div key={order._id} className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-gray-600">Order ID: {order._id}</p>
                  <button
                    onClick={() => handleAssignDeliveryBoy(order._id)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Assign
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No orders available to assign</p>
            )}
          </div>
        </>
      )}
    </div>
  </div>
  
  

  );
};

export default DeliveryBoy;
