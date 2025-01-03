import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import Background from "@/assets/Background.png"
import { useNavigate } from "react-router-dom";
import Background1 from "@/assets/Background1.jpg";

const HeroSection = () => {
  const [searchText, setSearchText] = useState<string>("");
  const navigate = useNavigate();
  return (
<div className="font-serif flex flex-col md:flex-row max-w-7xl mx-auto md:p-10 rounded-lg items-center justify-center m-4 gap-20 relative bg-cover bg-center" style={{ backgroundImage: `url(${Background1})` }}>
  <div className="absolute inset-0 bg-gray-800 opacity-90 pointer-events-none"></div> {/* Increased opacity */}

  {/* Text Section */}
  <div className="flex flex-col gap-10 md:w-[40%] relative z-10">
    {/* Heading and Subheading */}
    <div className="flex flex-col gap-5 animate-fade-in-down">
      <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl text-gray-100">
        Food is just a click away!
      </h1>
      <p className="text-gray-300">
        Relish the Best Bites, Delivered Fresh to Your Door!
      </p>
    </div>

    {/* Search Bar Section */}
    <div className="relative flex items-center gap-2 animate-fade-in-up">
      <Input
        type="text"
        value={searchText}
        placeholder="Search restaurant by name, city & country"
        onChange={(e) => setSearchText(e.target.value)}
        className="pl-10 shadow-lg rounded-lg text-gray-900 focus:ring-2 focus:ring-orange-500 transition-all"
      />
      <Search className="text-gray-500 absolute inset-y-2 left-2" />
      <Button
        onClick={() => navigate(`/search/${searchText}`)}
        className="bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg"
      >
        Search
      </Button>
    </div>
  </div>

  {/* Hero Image Section */}
  <div className="md:w-[50%] animate-fade-in-right delay-200 relative z-10">
    <img
      src={Background}
      alt="Delicious food"
      className="w-full h-auto rounded-lg shadow-lg animate-rotate"
    />
  </div>
</div>


  
  );
};

export default HeroSection;
