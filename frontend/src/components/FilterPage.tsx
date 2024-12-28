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
];

const FilterPage = () => {
    const { setAppliedFilter, appliedFilter, resetAppliedFilter } = useRestaurantStore();
  const appliedFilterHandler = (value: string) => {
    setAppliedFilter(value);
  };
  return (
   <div className="font-serif md:w-72 bg-gradient-to-b from-orange-100 to-orange-200 shadow-lg rounded-lg p-6 border border-gray-300">
  {/* Header */}
  <div className="flex items-center justify-between mb-4">
    <h1 className="font-bold text-lg text-gray-800">Filter by Cuisines</h1>
    <Button
      variant={"link"}
      onClick={resetAppliedFilter}
      className="text-orange-600 hover:text-orange-700 transition"
    >
      Reset
    </Button>
  </div>

  {/* Filter Options */}
  {filterOptions.map((option) => (
    <div
      key={option.id}
      className="flex items-center space-x-3 my-3 hover:bg-orange-50 p-2 rounded-md transition"
    >
      {/* Checkbox */}
      <Checkbox
        id={option.id}
        checked={appliedFilter.includes(option.label)}
        onClick={() => appliedFilterHandler(option.label)}
        className="h-5 w-5 text-orange-500 border-gray-300 focus:ring-orange-500 focus:ring-offset-orange-200"
      />

      {/* Cuisine Details */}
      <div className="flex items-center gap-2">
        {/* Icon for Cuisine */}
        <span className="text-lg">
          {"🍽️"} {/* Default icon if no specific icon is provided */}
        </span>

        {/* Label */}
        <Label className="text-sm font-medium uppercase tracking-wide text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {option.label}
        </Label>

        {/* Badge */}
        <span
          style={{ backgroundColor: "#4A4A4A" }} // Default fallback color
          className="px-2 py-1 text-xs font-semibold text-white rounded-full shadow-md"
        >
          Cuisine
        </span>
      </div>
    </div>
  ))}
</div>

  );
};

export default FilterPage;
