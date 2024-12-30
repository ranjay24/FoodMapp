import {
  Loader2,
  LocateIcon,
  Mail,
  MapPin ,
  MapPinnedIcon,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FormEvent, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";

const Profile = () => {
  const {user, updateProfile} = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || " ",
    email: user?.email || " ", 
    address: user?.address || " ",
    city: user?.city || " ",
    country: user?.country || " ",
    profilePicture: user?.profilePicture || " ",
  });
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<string>( profileData.profilePicture || "");
 
  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await updateProfile(profileData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <form
  onSubmit={updateProfileHandler}
  className="font-serif max-w-4xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg bg-gradient-to-r from-black via-gray-800 to-gray-700 "
>
  {/* Profile Header */}
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-4">
      {/* Avatar */}
      <div className="relative w-24 h-24 md:w-32 md:h-32">
        <Avatar className="w-full h-full rounded-full overflow-hidden">
          <AvatarImage src={selectedProfilePicture} alt="Profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={fileChangeHandler}
        />
        <div
          onClick={() => imageRef.current?.click()}
          className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
        >
          <Plus className="text-white w-8 h-8" />
        </div>
      </div>
      {/* Name Input */}
      <Input
        type="text"
        name="fullname"
        value={profileData.fullname}
        onChange={changeHandler}
        placeholder="Full Name"
        className="text-2xl font-semibold border-b-2 border-gray-300 focus:border-orange focus:outline-none"
      />
    </div>
  </div>

  {/* Profile Details */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Email */}
    <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-md">
      <Mail className="text-gray-500 w-6 h-6" />
      <div className="w-full">
        <Label className="block text-sm text-gray-500">Email</Label>
        <input
          disabled
          name="email"
          value={profileData.email}
          onChange={changeHandler}
          className="w-full text-gray-700 bg-transparent focus:outline-none focus:ring-0 focus:border-0"
        />
      </div>
    </div>

    {/* Address */}
    <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-md">
      <LocateIcon className="text-gray-500 w-6 h-6" />
      <div className="w-full">
        <Label className="block text-sm text-gray-500">Address</Label>
        <input
          name="address"
          value={profileData.address}
          onChange={changeHandler}
          placeholder="Enter your address"
          className="w-full text-gray-700 bg-transparent focus:outline-none focus:ring-0 focus:border-0"
        />
      </div>
    </div>

    {/* City */}
    <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-md">
      <MapPin className="text-gray-500 w-6 h-6" />
      <div className="w-full">
        <Label className="block text-sm text-gray-500">City</Label>
        <input
          name="city"
          value={profileData.city}
          onChange={changeHandler}
          placeholder="Enter your city"
          className="w-full text-gray-700 bg-transparent focus:outline-none focus:ring-0 focus:border-0"
        />
      </div>
    </div>

    {/* Country */}
    <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-md">
      <MapPinnedIcon className="text-gray-500 w-6 h-6" />
      <div className="w-full">
        <Label className="block text-sm text-gray-500">Country</Label>
        <input
          name="country"
          value={profileData.country}
          onChange={changeHandler}
          placeholder="Enter your country"
          className="w-full text-gray-700 bg-transparent focus:outline-none focus:ring-0 focus:border-0"
        />
      </div>
    </div>
  </div>

  {/* Submit Button */}
  <div className="text-center mt-8">
    {isLoading ? (
      <Button
        disabled
        className="px-6 py-2 bg-gray-700 text-white font-semibold rounded-md flex items-center justify-center"
      >
        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
        Please wait
      </Button>
    ) : (
      <Button
        type="submit"
        className="px-6 py-2 bg-gray-800 hover:bg-gray text-white font-semibold rounded-md"
      >
        Update Profile
      </Button>
    )}
  </div>
</form>

  );
};

export default Profile;