import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  HandPlatter,
  Loader2,
  Menu,
  Moon,
  PackageCheck,
  ShoppingCart,
  SquareMenu,
  Sun,
  User,
  UtensilsCrossed,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useUserStore } from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
// import { useThemeStore } from "@/store/useThemeStore";
import Foodlogo from "@/assets/Foodlogo.png";
const Navbar = () => {
  const { user,loading, logout } = useUserStore();
  const { cart } = useCartStore();
  //   const { setTheme } = useThemeStore();
// const  = false;
  return (
<div className="font-serif max-w-7xl mx-auto py-1">
  <div className="flex items-center justify-between h-16 px-4 md:px-0">
    {/* Logo Section */}
   
    <Link to="/" className="flex items-center gap-1">
    <Link to="/" className="flex items-center gap-2"/>
    <img
      src={Foodlogo} // Replace with your logo path
      alt="FoodMap Logo"
      className="w-7 h-10 object-cover"/>
      <h1 className="font-bold md:font-extrabold text-2xl text-gray-800 hover:text-gray-600 transition">
        FoodMap
      </h1>
    </Link>

    {/* Desktop Menu */}
    <div className="hidden md:flex items-center gap-10">
      <div className="hidden md:flex items-center gap-6 text-gray-700">
        <Link
          to="/"
          className="hover:text-gray-600 transition duration-300 font-medium"
        >
          Home
        </Link>
        <Link
          to="/profile"
          className="hover:text-gray-600 transition duration-300 font-medium"
        >
          Profile
        </Link>
        <Link
          to="/order/status"
          className="hover:text-gray-600 transition duration-300 font-medium"
        >
          Order
        </Link>
        <Link
          to="/track-order"
          className="hover:text-gray-600 transition duration-300 font-medium"
        >
          Track
        </Link>

        {/* Admin Dashboard Menu */}
        {user?.admin && (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="hover:text-gray-600 font-medium transition">
                Dashboard
              </MenubarTrigger>
              <MenubarContent className="bg-white shadow-md rounded-md border border-gray-200">
                <Link to="/admin/restaurant">
                  <MenubarItem className="hover:bg-gray-100">
                    Restaurant
                  </MenubarItem>
                </Link>
                <Link to="/admin/menu">
                  <MenubarItem className="hover:bg-gray-100">Menu</MenubarItem>
                </Link>
                <Link to="/admin/orders">
                  <MenubarItem className="hover:bg-gray-100">
                    Orders
                  </MenubarItem>
                </Link>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="hover:border-gray-400"
              >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-lg">
              <DropdownMenuItem className="hover:bg-gray-100">Light</DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-100">Dark</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative cursor-pointer hover:text-gray-600">
          <ShoppingCart className="text-gray-800" />
          {cart.length > 0 && (
            <Button
              size={"icon"}
              className="absolute -inset-y-3 left-2 text-xs rounded-full w-4 h-4 bg-red-500 text-white flex items-center justify-center"
            >
              {cart.length}
            </Button>
          )}
        </Link>

        {/* User Avatar */}
        <div>
          <Avatar>
            <AvatarImage
              src={user?.profilePicture}
              alt="profilephoto"
              className="rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* Logout Button */}
        <div>
          {loading ? (
            <Button
              className="bg-gray-700 text-white hover:bg-gray-800 flex items-center gap-2 px-4 py-2 rounded-lg transition"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={logout}
              className="bg-gray-700 text-white hover:bg-gray-800 px-4 py-2 rounded-lg transition"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>

    {/* Mobile Navbar */}
    <div className="md:hidden">
      {/* Mobile responsive  */}
      <MobileNavbar />
    </div>
  </div>

  {/* Divider Section */}
  <div className="border-t border-gray-700 my-4"></div>
</div>

  );
};

export default Navbar;

const MobileNavbar = () => {
  const { user, logout, loading } = useUserStore();
  //   const { setTheme } = useThemeStore();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200 text-black hover:bg-gray-300"
          variant="outline"
        >
          <Menu size={"18"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="font-serif flex flex-col bg-white min-h-screen">
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle className="text-lg font-bold text-gray-800">FoodMap</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
              //   onClick={() => setTheme("light")}
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
              //   onClick={() => setTheme("dark")}
              >
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>

        <Separator className="my-2" />

        {/* Links Section */}
        <SheetDescription className="flex-1 overflow-y-auto">
          <Link
            to="/profile"
            className="flex items-center gap-4 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium transition"
          >
            <User />
            <span>Profile</span>
          </Link>
          <Link
            to="/order/status"
            className="flex items-center gap-4 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium transition"
          >
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-4 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium transition"
          >
            <ShoppingCart />
            <span>Cart (0)</span>
          </Link>
          {user?.admin && (
            <>
              <Link
                to="/admin/menu"
                className="flex items-center gap-4 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium transition"
              >
                <SquareMenu />
                <span>Menu</span>
              </Link>
              <Link
                to="/admin/restaurant"
                className="flex items-center gap-4 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium transition"
              >
                <UtensilsCrossed />
                <span>Restaurant</span>
              </Link>
              <Link
                to="/admin/orders"
                className="flex items-center gap-4 hover:bg-gray-100 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900 font-medium transition"
              >
                <PackageCheck />
                <span>Restaurant Orders</span>
              </Link>
            </>
          )}
        </SheetDescription>

        {/* Footer Section */}
        <SheetFooter className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-bold text-gray-800">FoodMap.com</h1>
          </div>
          <SheetClose asChild>
            {loading ? (
              <Button className="bg-orange hover:bg-hoverOrange">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                onClick={logout}
                className="bg-orange hover:bg-hoverOrange"
              >
                Logout
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
