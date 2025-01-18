import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RestaurantFormSchema,
  restaurantFromSchema,
} from "@/schema/restaurantSchema";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

import Background1 from "@/assets/Background1.jpg";

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFormSchema>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    address: "", // Added address
    cuisines: [],
    imageFile: undefined,
  });
  const [errors, setErrors] = useState<Partial<RestaurantFormSchema>>({});
    const {
      loading,
      restaurant,
      updateRestaurant,
      createRestaurant
      ,
      getRestaurant,
    } = useRestaurantStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = restaurantFromSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<RestaurantFormSchema>);
      return;
    }
    // add restaurant api implementation start from here
    try {
      const formData = new FormData();
      formData.append("restaurantName", input.restaurantName);
      formData.append("city", input.city);
      formData.append("country", input.country);
      formData.append("deliveryTime", input.deliveryTime.toString());
      formData.append("address", input.address.toString());
      formData.append("cuisines", JSON.stringify(input.cuisines));

      if (input.imageFile) {
        formData.append("imageFile", input.imageFile);
      }

      if (restaurant) {
        // update
        await updateRestaurant(formData);
      } else {
        // create
        await createRestaurant(formData);
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      await getRestaurant();
      if(restaurant){
        setInput({
          restaurantName: restaurant.restaurantName || "",
          city: restaurant.city || "",
          country: restaurant.country || "",
          deliveryTime: restaurant.deliveryTime || 0,
          address: restaurant.address || "",
          cuisines: restaurant.cuisines
            ? restaurant.cuisines.map((cuisine: string) => cuisine)
            : [],
          imageFile: undefined,
        });
      };
      }
    fetchRestaurant();
    
  }, []);

  return (
<div className="font-serif flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20 relative bg-cover bg-center" style={{ backgroundImage: `url(${Background1})` }}>
  <div className="absolute inset-0 bg-gray-800 opacity-90 pointer-events-none z-0"></div> {/* Background with lower z-index */}

  <div className="font-serif max-w-6xl mx-auto my-10 p-8 rounded-xl shadow-xl bg-gradient-to-r from-gray-800 to-black z-10 animate-fade-in-up">
    <h1 className="text-white font-extrabold text-3xl text-gray-800 mb-8 text-center animate-fade-in-up">
      {restaurant ? "Update Restaurant" : "Add Your Restaurant"}
    </h1>
    <form onSubmit={submitHandler} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Restaurant Name */}
        <div className="animate-fade-in-left">
          <Label className="font-semibold text-gray-700 text-white">Restaurant Name</Label>
          <Input
            type="text"
            name="restaurantName"
            value={input.restaurantName}
            onChange={changeEventHandler}
            placeholder="Enter your restaurant name"
            className="mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-md transition-all duration-300"
          />
          {errors?.restaurantName && (
            <span className="text-sm text-red-600">{errors.restaurantName}</span>
          )}
        </div>

        {/* City */}
        <div className="animate-fade-in-left">
          <Label className="font-semibold text-gray-700 text-white">City</Label>
          <Input
            type="text"
            name="city"
            value={input.city}
            onChange={changeEventHandler}
            placeholder="Enter your city name"
            className="mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-md transition-all duration-300"
          />
          {errors?.city && (
            <span className="text-sm text-red-600">{errors.city}</span>
          )}
        </div>

        {/* Country */}
        <div className="animate-fade-in-left">
          <Label className="font-semibold text-gray-700 text-white">Country</Label>
          <Input
            type="text"
            name="country"
            value={input.country}
            onChange={changeEventHandler}
            placeholder="Enter your country name"
            className="mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-md transition-all duration-300"
          />
          {errors?.country && (
            <span className="text-sm text-red-600">{errors.country}</span>
          )}
        </div>

        {/* Delivery Time */}
        <div className="animate-fade-in-left">
          <Label className="font-semibold text-gray-700 text-white">Delivery Time (mins)</Label>
          <Input
            type="number"
            name="deliveryTime"
            value={input.deliveryTime}
            onChange={changeEventHandler}
            placeholder="Enter your delivery time"
            className="mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-md transition-all duration-300"
          />
          {errors?.deliveryTime && (
            <span className="text-sm text-red-600">{errors.deliveryTime}</span>
          )}
        </div>

        {/* Address */}
        <div className="animate-fade-in-left">
          <Label className="font-semibold text-gray-700 text-white">Address</Label>
          <Input
            type="text"
            name="address"
            value={input.address}
            onChange={changeEventHandler}
            placeholder="Enter your Address name"
            className="mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-md transition-all duration-300"
          />
          {errors?.address && (
            <span className="text-sm text-red-600">{errors.address}</span>
          )}
        </div>

        {/* Cuisines */}
        <div className="animate-fade-in-left">
          <Label className="font-semibold text-gray-700 text-white">Cuisines</Label>
          <Input
            type="text"
            name="cuisines"
            value={input.cuisines}
            onChange={(e) =>
              setInput({ ...input, cuisines: e.target.value.split(",") })
            }
            placeholder="e.g., Momos, Biryani"
            className="mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-md transition-all duration-300"
          />
          {errors?.cuisines && (
            <span className="text-sm text-red-600">{errors.cuisines}</span>
          )}
        </div>

        {/* Restaurant Banner */}
        <div className="animate-fade-in-left">
          <Label className="font-semibold text-gray-700 text-white">Upload Restaurant Banner</Label>
          <Input
            type="file"
            accept="image/*"
            name="imageFile"
            onChange={(e) =>
              setInput({
                ...input,
                imageFile: e.target.files?.[0] || undefined,
              })
            }
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-all duration-300"
          />
          {errors?.imageFile?.name && (
            <span className="text-sm text-red-600">{errors.imageFile.name}</span>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6 animate-fade-in-up">
        {loading ? (
          <Button
            disabled
            className="flex items-center px-6 py-3 bg-gray-500 text-white font-bold rounded-md transition-all duration-300"
          >
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="px-6 py-3 bg-gray-500 text-white font-bold rounded-md hover:bg-gray-600 transition-all duration-300">
            {restaurant ? "Update Restaurant" : "Add Restaurant"}
          </Button>
        )}
      </div>
    </form>
  </div>
</div>


  );
};

export default Restaurant;
