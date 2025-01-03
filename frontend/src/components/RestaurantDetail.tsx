// import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import AvailableMenu from "./AvailableMenu";
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RestaurantDetail = () => {
  const params = useParams();
    const { singleRestaurant, getSingleRestaurant } = useRestaurantStore();

    useEffect(() => {
      getSingleRestaurant(params.id!); 

    }, [params.id]);

  return (
    <div className="font-serif max-w-6xl mx-auto my-10 px-4">
  <div className="w-full bg-gray-50 rounded-lg shadow-lg p-6">
    {/* Restaurant Image */}
    <div className="relative w-full h-40 md:h-64 lg:h-80 animate-fade-in-up">
      <img
        src={singleRestaurant?.imageUrl || "Loading..."}
        alt="Restaurant"
        className="object-cover w-full h-full rounded-lg shadow-md border border-gray-200"
      />
    </div>

    {/* Restaurant Details */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-6 animate-fade-in-up">
      <div>
        <h1 className="font-bold text-2xl text-gray-800">
          {singleRestaurant?.restaurantName || "Loading..."}
        </h1>

        {/* Cuisines */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {singleRestaurant?.cuisines.map((cuisine: string, idx: number) => (
            <Badge
              key={idx}
              className="px-3 py-1 bg-yellow-100 text-yellow-600 font-medium rounded-md shadow-sm"
            >
              {cuisine}
            </Badge>
          ))}
        </div>
      </div>

      {/* Delivery Time */}
      <div className="flex items-center gap-2 mt-4 md:mt-0 animate-fade-in-up">
        <Timer className="w-6 h-6 text-gray-600" />
        <h1 className="text-lg font-medium text-gray-700">
          Delivery Time:{" "}
          <span className="text-orange-500 font-semibold">
            {singleRestaurant?.deliveryTime || "NA"} mins
          </span>
        </h1>
      </div>
    </div>

    {/* Available Menus */}
    {singleRestaurant?.menus && (
      <div className="mt-8 animate-fade-in-up">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Available Menus</h2>
        <AvailableMenu menus={singleRestaurant?.menus!} />
      </div>
    )}
  </div>
</div>


  );
};

export default RestaurantDetail;
