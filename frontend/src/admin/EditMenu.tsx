import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { MenuItem } from "@/types/restaurantType";
import { Loader2 } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: MenuItem;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [error, setError] = useState<Partial<MenuFormSchema>>({});
  const {loading, editMenu} = useMenuStore();

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
      await editMenu(selectedMenu._id, formData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { 
    setInput({
      name: selectedMenu?.name || "",
      description: selectedMenu?.description || "",
      price: selectedMenu?.price || 0,
      image: undefined,
    });
  }, [selectedMenu]);
  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
    <DialogContent className="max-w-lg p-6 bg-white shadow-lg rounded-lg transition-all duration-500 transform animate-dialog-fade">
      <DialogHeader>
        <DialogTitle className="text-xl font-bold text-gray-800">Edit Menu</DialogTitle>
        <DialogDescription className="text-sm text-gray-600">
          Update your menu to keep your offerings fresh and exciting!
        </DialogDescription>
      </DialogHeader>
  
      <form onSubmit={submitHandler} className="space-y-5">
        {/* Menu Name */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">Name</Label>
          <Input
            type="text"
            name="name"
            value={input.name}
            onChange={changeEventHandler}
            placeholder="Enter menu name"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {error && (
            <span className="text-xs font-medium text-red-600 mt-1">{error.name}</span>
          )}
        </div>
  
        {/* Menu Description */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">Description</Label>
          <Input
            type="text"
            name="description"
            value={input.description}
            onChange={changeEventHandler}
            placeholder="Enter menu description"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {error && (
            <span className="text-xs font-medium text-red-600 mt-1">{error.description}</span>
          )}
        </div>
  
        {/* Menu Price */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">Price in (Rupees)</Label>
          <Input
            type="number"
            name="price"
            value={input.price}
            onChange={changeEventHandler}
            placeholder="Enter menu price"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {error && (
            <span className="text-xs font-medium text-red-600 mt-1">{error.price}</span>
          )}
        </div>
  
        {/* Menu Image */}
        <div>
          <Label className="block text-sm font-medium text-gray-700">Upload Menu Image</Label>
          <Input
            type="file"
            name="image"
            onChange={(e) =>
              setInput({ ...input, image: e.target.files?.[0] || undefined })
            }
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {error && (
            <span className="text-xs font-medium text-red-600 mt-1">{error.image?.name}</span>
          )}
        </div>
  
        {/* Footer */}
        <DialogFooter className="mt-6 flex justify-end">
          {loading ? (
            <Button
              disabled
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700"
            >
              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="px-4 py-2 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700">
              Submit
            </Button>
          )}
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
  
  
  );
};

export default EditMenu;