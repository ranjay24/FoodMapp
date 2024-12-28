import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LoginInputState, userLoginSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginbg from "@/assets/loginbg2.png"
const Login = () => {
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Partial<LoginInputState>>({});
    const { loading, login } = useUserStore();
  const navigate = useNavigate();

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const loginSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const result = userLoginSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<LoginInputState>);
      return;
    }
    try {
      await login(input);
      navigate("/");
    } catch (error) {console.log(error);
    }
  };
  // const loading =false
  return (
    <div
  className="font-serif flex items-center justify-center min-h-screen"
  style={{
    backgroundImage: `url(${loginbg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <form
    onSubmit={loginSubmitHandler}
    className="md:p-8 w-full max-w-md rounded-lg border-2 border-blue-500 bg-white bg-opacity-90 shadow-xl mx-4"
  >
    <div className="mb-6 text-center">
      <h1 className="font-bold text-3xl text-grey-600">FoodMap.com</h1>
    </div>
    <div className="mb-6">
      <div className="relative">
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={input.email}
          onChange={changeEventHandler}
          className="pl-10 w-full py-2 text-gray-800 bg-gray-100 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-grey-500 focus:outline-none"
        />
        <Mail className="absolute inset-y-2 left-3 text-grey-500 pointer-events-none" />
        {errors && (
          <span className="text-xs text-red-500 mt-1 inline-block">
            {errors.email}
          </span>
        )}
      </div>
    </div>
    <div className="mb-6">
      <div className="relative">
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={input.password}
          onChange={changeEventHandler}
          className="pl-10 w-full py-2 text-gray-800 bg-gray-100 rounded-lg border-2 border-grey-300 focus:ring-2 focus:ring-grey-500 focus:outline-none"
        />
        <LockKeyhole className="absolute inset-y-2 left-3 text-grey-500 pointer-events-none" />
        {errors && (
          <span className="text-xs text-red-500 mt-1 inline-block">
            {errors.password}
          </span>
        )}
      </div>
    </div>
    <div className="mb-8">
      {loading ? (
        <Button
          disabled
          className="w-full py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-800 cursor-not-allowed"
        >
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full py-2 rounded-lg text-white bg-gray-700 hover:bg-gray-800 transition"
        >
          Login
        </Button>
      )}
      <div className="mt-4 text-center">
        <Link
          to="/forgot-password"
          className="text-sm text-grey-600 hover:text-grey-500 hover:underline transition"
        >
          Forgot Password
        </Link>
      </div>
    </div>
    <Separator />
    <p className="mt-6 text-center text-sm">
      Don't have an account?{" "}
      <Link to="/signup" className="text-blue-600 font-medium hover:underline">
        Signup
      </Link>
    </p>
  </form>
</div>

  );
};

export default Login;
