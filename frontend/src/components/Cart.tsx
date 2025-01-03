import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";
// import CheckoutConfirmPage from "./CheckoutConfirmPage";
import { useCartStore } from "@/store/useCartStore";
import { CartItem } from "@/types/cartType";

import Background1 from "@/assets/Background1.jpg";

const Cart = () => {
  const [open, setOpen] = useState<boolean>(false);
    const { cart, decrementQuantity, incrementQuantity,removeFromTheCart,clearCart } = useCartStore();

    let totalAmount = cart.reduce((acc, ele) => {
      return acc + ele.price * ele.quantity;
    }, 0);
  return (
    <div className="relative font-serif flex flex-col max-w-7xl mx-auto my-10 px-6 animate-fade-in-up">
    {/* Background Layer */}
    <div className="absolute inset-0 bg-cover bg-center z-0 animate-fade-in-left" style={{ backgroundImage: `url(${Background1})` }}>
      <div className="absolute inset-0 bg-gray-800 opacity-90 pointer-events-none"></div>
    </div>
  
    {/* Content Layer */}
    <div className="relative z-10 animate-fade-in-up">
      <div className="flex justify-end mb-4">
        <Button
          variant="link"
          onClick={() => clearCart()}
          className="text-sm text-green-100 hover:text-gray-800 transition duration-300"
        >
          Clear All
        </Button>
      </div>
  
      <Table className="min-w-full bg-white shadow-lg rounded-lg border border-gray-200 animate-fade-in-up">
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-700 text-sm font-medium">Items</TableHead>
            <TableHead className="text-gray-700 text-sm font-medium">Title</TableHead>
            <TableHead className="text-gray-700 text-sm font-medium">Price</TableHead>
            <TableHead className="text-gray-700 text-sm font-medium">Quantity</TableHead>
            <TableHead className="text-gray-700 text-sm font-medium">Total</TableHead>
            <TableHead className="text-gray-700 text-sm font-medium text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
  
        <TableBody>
          {cart.map((item: CartItem) => (
            <TableRow
              key={item._id}
              className="border-b border-gray-100 hover:bg-gray-50 transition duration-300 transform hover:scale-105"
            >
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={item.image}
                    alt={item.name}
                    className="object-cover rounded-lg"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="text-sm text-gray-700">{item.name}</TableCell>
              <TableCell className="text-sm text-gray-700">{item.price}</TableCell>
              <TableCell>
                <div className="w-fit flex items-center rounded-full border border-gray-300 dark:border-gray-800 shadow-md">
                  <Button
                    onClick={() => decrementQuantity(item._id)}
                    size="icon"
                    variant="outline"
                    className="rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
                  >
                    <Minus />
                  </Button>
                  <Button
                    size="icon"
                    className="font-bold border-none text-gray-700"
                    disabled
                    variant="outline"
                  >
                    {item.quantity}
                  </Button>
                  <Button
                    onClick={() => incrementQuantity(item._id)}
                    size="icon"
                    className="rounded-full bg-gray-600 hover:bg-orange-700 text-white transition duration-300"
                  >
                    <Plus />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-sm text-gray-700">{item.price * item.quantity}</TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => removeFromTheCart(item._id)}
                  size="sm"
                  className="bg-red-700 hover:bg-red-800 text-white transition duration-300"
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
  
        <TableFooter>
          <TableRow className="font-bold text-lg text-gray-800">
            <TableCell colSpan={5} className="text-left">Total</TableCell>
            <TableCell className="text-right text-lg text-gray-800">{totalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
  
      <div className="flex justify-end mt-6">
        <Button
          onClick={() => setOpen(true)}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-md shadow-md transition duration-300"
        >
          Proceed To Checkout
        </Button>
      </div>
  
      <CheckoutConfirmPage open={open} setOpen={setOpen} />
    </div>
  </div>
  

  );
};

export default Cart;
