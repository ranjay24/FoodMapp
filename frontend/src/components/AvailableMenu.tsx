import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";
import { MenuItem } from "@/types/restaurantType";
const AvailableMenu = ({ menus }: { menus: MenuItem[] }) =>
  
  {
      const { addToCart } = useCartStore();
    const navigate = useNavigate();
    return (
      <div className="font-serif md:p-8 px-4 py-6 bg-gradient-to-r from-black via-gray-800 to-gray-700 rounded-lg shadow-lg">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-8 text-center text-gray-800 dark:text-white text-white">
        Available Menus
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menus.map((menu: MenuItem) => (
          <div className="max-w-xs mx-auto">
            <Card className="shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out bg-white">
              <div className="relative">
                <img
                  src={menu?.image}
                  alt={menu?.name}
                  className="w-full h-40 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-25 hover:opacity-50 transition-opacity duration-300 ease-in-out"></div>
              </div>
              <CardContent className="p-4 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {menu.name}
                </h2>
                <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
                <h3 className="text-lg font-semibold mt-4 text-gray-900">
                  Price:{" "}
                  <span className="text-[#D19254]">{menu.price}</span>
                </h3>
              </CardContent>
              <CardFooter className="p-4 bg-gray-100">
                <Button
                  onClick={() => {
                    addToCart(menu);
                    navigate("/cart");
                  }}
                  className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded-lg transition-all duration-300 ease-in-out"
                >
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
    
    );
  };

export default AvailableMenu;
