import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import forgotbg from "@/assets/forgotbg.png"
const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const loading = false;
  return (
    <div
  className="font-serif flex items-center justify-center min-h-screen w-full"
  style={{
    backgroundImage: `url(${forgotbg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <form
    className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg border-2 border-gray-400 bg-white bg-opacity-90 shadow-lg mx-4"
  >
    <div className="text-center">
      <h1 className="font-bold text-2xl text-gray-800 mb-2">Forgot Password</h1>
      <p className="text-sm text-gray-600">
        Enter your email address to reset your password
      </p>
    </div>
    <div className="relative w-full">
      <Input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="pl-10 w-full py-2 text-gray-800 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-600 focus:outline-none"
      />
      <Mail className="absolute inset-y-2 left-3 text-gray-500 pointer-events-none" />
    </div>
    {loading ? (
      <Button
        disabled
        className="w-full py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-800 cursor-not-allowed"
      >
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
      </Button>
    ) : (
      <Button
        className="w-full py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-800 transition"
      >
        Send Reset Link
      </Button>
    )}
    <span className="text-center text-sm">
      Back to{" "}
      <Link
        to="/login"
        className="text-blue-800 font-medium hover:underline hover:text-gray-700"
      >
        Login
      </Link>
    </span>
  </form>
</div>


  );
};

export default ForgotPassword;
