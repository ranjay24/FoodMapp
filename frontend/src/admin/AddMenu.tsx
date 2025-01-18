import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import React, { FormEvent, useState } from "react";
import EditMenu from "./EditMenu";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import Background1 from "@/assets/Background1.jpg";

const AddMenu = () => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<any>();
  const [error, setError] = useState<Partial<MenuFormSchema>>({});
    const { loading, createMenu } = useMenuStore();
    const {restaurant} = useRestaurantStore();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<MenuFormSchema>);
      return;
    }
    // api ka kaam start from here
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if(input.image){
        formData.append("image", input.image);
      }
      await createMenu(formData);
    } catch (error) {
    }
  };
  return (
    <div className="max-w-6xl mx-auto my-10 px-4 relative">
    {/* Background Layer */}
    <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${Background1})` }}>
      <div className="absolute inset-0 bg-gray-800 opacity-90 pointer-events-none"></div>
    </div>
  
    {/* Content Layer */}
    <div className="relative z-10">
      {/* Available Menus Header */}
      <div className="flex justify-between items-center mb-6 animate-fade-in-left">
        <h1 className="font-bold text-lg md:text-3xl text-green-100">Available Menus</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="bg-gray-600 hover:bg-gray-700 text-white flex items-center px-6 py-2 rounded-md shadow-md">
              <Plus className="mr-2" />
              Add Menus
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-semibold text-gray-800">Add A New Menu</DialogTitle>
              <DialogDescription className="text-sm text-gray-600">
                Create a menu that will make your restaurant stand out.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submitHandler} className="space-y-6 p-4 bg-gray-50 rounded-md shadow-md">
              <div className="animate-fade-in-left">
                <Label className="text-sm font-medium text-gray-700">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  placeholder="Enter menu name"
                  className="mt-1 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {error && <span className="text-xs font-medium text-red-600">{error.name}</span>}
              </div>
              <div className="animate-fade-in-right">
                <Label className="text-sm font-medium text-gray-700">Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  placeholder="Enter menu description"
                  className="mt-1 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {error && <span className="text-xs font-medium text-red-600">{error.description}</span>}
              </div>
              <div className="animate-fade-in-left">
                <Label className="text-sm font-medium text-gray-700">Price (in Rupees)</Label>
                <Input
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={changeEventHandler}
                  placeholder="Enter menu price"
                  className="mt-1 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {error && <span className="text-xs font-medium text-red-600">{error.price}</span>}
              </div>
              <div className="animate-fade-in-right">
                <Label className="text-sm font-medium text-gray-700">Upload Menu Image</Label>
                <Input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      image: e.target.files?.[0] || undefined,
                    })
                  }
                  className="mt-1 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {error && <span className="text-xs font-medium text-red-600">{error.image?.name}</span>}
              </div>
              <DialogFooter className="mt-5 flex justify-center animate-fade-in-up">
                {loading ? (
                  <Button disabled className="bg-gray-600 text-white flex items-center px-6 py-2 rounded-md shadow-md">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button className="bg-gray-600 hover:bg-gray-500 text-white flex items-center px-6 py-2 rounded-md shadow-md">
                    Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
  
      {/* Menus List */}
      {restaurant?.menus.map((menu, idx) => (
        <div key={idx} className="mt-6 space-y-4 animate-fade-in-up">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
            <img
              src={menu.image}
              alt={menu.name}
              className="md:h-32 md:w-32 h-20 w-20 object-cover rounded-lg border-2 border-gray-200"
            />
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-800">{menu.name}</h1>
              <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
              <h2 className="text-md font-semibold mt-3">
                Price: <span className="text-orange-600">{menu.price}</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                setSelectedMenu(menu);
                setEditOpen(true);
              }}
              size="sm"
              className="bg-gray-600 hover:bg-gray-500 text-white mt-4 md:mt-0"
            >
              Edit
            </Button>
          </div>
        </div>
      ))}
  
      {/* Edit Menu Modal */}
      <EditMenu
        selectedMenu={selectedMenu}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
    </div>
  </div>
  
  
  );
};

export default AddMenu;
