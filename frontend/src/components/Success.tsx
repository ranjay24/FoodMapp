import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useOrderStore } from "@/store/useOrderStore";
import { useEffect } from "react";
import { CartItem } from "@/types/cartType";
import aaaImage from "@/assets/aaa.png"

import Background1 from "@/assets/Background1.jpg";


const Success = () => {
  const { orders, getOrderDetails } = useOrderStore();

  useEffect(() => {
    getOrderDetails();
  }, []);

  if (orders.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">
          Order not found!
        </h1>
      </div>
    );

  return (
    <div className="font-serif flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20 relative">
    {/* Background Layer */}
    <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${Background1})` }}>
      <div className="absolute inset-0 bg-gray-800 opacity-90 pointer-events-none"></div>
    </div>
  
    {/* Content Layer */}
    <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-8 max-w-2xl w-full z-10 relative animate-fade-in-up">
      <div className="text-center mb-8 animate-fade-in-up">
        <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200">
          Order Status: <span className="text-[#FF5A5A]">CONFIRM</span>
        </h1>
      </div>
  
      <div className="mb-8 animate-fade-in-up">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-6 text-center">
          Order Summary
        </h2>
  
        {/* Ordered Items Display */}
        {orders.map((order: any, index: number) => (
          <div key={index} className="space-y-6">
            {order.cartItems.map((item: CartItem) => (
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 animate-fade-in-left" key={item._id}>
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt=""
                    className="w-20 h-20 rounded-md object-cover shadow-md"
                  />
                  <h3 className="text-gray-800 dark:text-gray-200 font-medium text-lg">
                    {item.name}
                  </h3>
                </div>
                <div className="text-right md:text-left">
                  <div className="text-gray-800 dark:text-gray-200 flex items-center justify-center md:justify-start">
                    <IndianRupee className="w-5 h-5 mr-1 text-orange-500" />
                    <span className="text-lg font-semibold">
                      {item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <Separator className="my-4" />
          </div>
        ))}
      </div>
  
      <Link to="/cart">
        <Button className="bg-gray-600 hover:bg-gray-700 text-white font-bold w-full py-3 rounded-md shadow-md animate-fade-in-up">
          Continue Shopping
        </Button>
      </Link>
  
      <Separator />
      <Separator />
      <Separator />
  
      <Link to="/track-order">
        <Button className="bg-gray-600 hover:bg-gray-700 text-white font-bold w-full py-3 rounded-md shadow-md animate-fade-in-up">
          Track your Order, Now !!
        </Button>
      </Link>
    </div>
  </div>
  

  );
};

export default Success;
