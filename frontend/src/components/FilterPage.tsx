// import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export type FilterOptionsState = {
  id: string;
  label: string;
};
// agar applied filter k andr ye item exixt krta hia toh iska mtlb checked hai
const filterOptions: FilterOptionsState[] = [
  { id: "burger", label: "Burger" },
  { id: "thali", label: "Thali" },
  { id: "biryani", label: "Biryani" },
  { id: "momos", label: "Momos" },
  { id: "idli", label: "Idli" },
  { id: "dosa", label: "Dosa" },
  { id: "samosa", label: "Samosa" },
  { id: "chaat", label: "Chaat" },
  { id: "paneer", label: "Paneer" },
  { id: "tandoori", label: "Tandoori" },
  { id: "dal", label: "Dal" },
  { id: "paratha", label: "Paratha" },
  { id: "poha", label: "Poha" },
  { id: "pulao", label: "Pulao" },
  { id: "kebab", label: "Kebab" },
  { id: "kachori", label: "Kachori" },
  { id: "halwa", label: "Halwa" },
  { id: "puri", label: "Puri" },
  { id: "chole-bhature", label: "Chole Bhature" },
  { id: "rasmalai", label: "Rasmalai" },
  { id: "gulab-jamun", label: "Gulab Jamun" },
  { id: "butter-chicken", label: "Butter Chicken" },
  { id: "fish-curry", label: "Fish Curry" },
  { id: "rogan-josh", label: "Rogan Josh" },
];


const FilterPage = () => {
    const { setAppliedFilter, appliedFilter, resetAppliedFilter } = useRestaurantStore();
  const appliedFilterHandler = (value: string) => {
    setAppliedFilter(value);
  };
  return (
   <div className="font-serif md:w-80 bg-gradient-to-b from-orange-100 to-orange-300 shadow-lg rounded-lg p-6 border border-gray-300 space-y-4">
  {/* Header */}
  <div className="flex items-center justify-between">
    <h1 className="font-bold text-lg text-gray-800">Filter by Cuisines</h1>
    <Button
      variant={"link"}
      onClick={resetAppliedFilter}
      className="text-gray-600 hover:text-gray-800 transition duration-300"
    >
      Reset
    </Button>
  </div>

  {/* Filter Options */}
  <div className="divide-y divide-gray-200">
    {filterOptions.map((option) => (
      <div
        key={option.id}
        className="flex items-center space-x-3 py-3 hover:bg-gray-50 rounded-md px-2 transition duration-300"
      >
        {/* Checkbox */}
        <Checkbox
          id={option.id}
          checked={appliedFilter.includes(option.label)}
          onClick={() => appliedFilterHandler(option.label)}
          className="h-5 w-5 text-gray-500 border-gray-300 focus:ring-gray-400"
        />

        {/* Cuisine Details */}
        <div className="flex items-center gap-2">
          {/* Icon for Cuisine */}
          <span className="text-xl">
            {"🍛"} {/* Add icons based on cuisine type if needed */}
          </span>

          {/* Label */}
          <Label className="text-sm font-medium text-gray-800 uppercase tracking-wide">
            {option.label}
          </Label>

          {/* Badge */}
          <span
            className="px-3 py-1 bg-gray-600 text-xs font-semibold text-white rounded-full shadow-sm"
          >
            Cuisine
          </span>
        </div>
      </div>
    ))}
  </div>
</div>


  );
};

export default FilterPage;
