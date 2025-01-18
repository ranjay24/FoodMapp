import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signupbg from "@/assets/signupbg.png"
// typescript me type define krne ka 2 trika hota hai

const Signup = () => {
    const [input, setInput] = useState<SignupInputState>({
        fullname:"",
        email:"",
        password:"", 
        contact:"", 
    });

    const [errors, setErrors] = useState<Partial<SignupInputState>>({});
    const {signup,loading} = useUserStore();
const navigate = useNavigate();
    const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInput({...input, [name]:value});
    }
    const loginSubmitHandler = async (e:FormEvent) => {
        e.preventDefault();
        // form validation check start
        const result = userSignupSchema.safeParse(input);
        if(!result.success){
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<SignupInputState>);
            return;
        }
        // login api implementation start here
        try {
          await signup(input);
          navigate("/verify-email");
        } catch (error) {
        }
    }
    // const loading = false;
    return (
      <div
  className="font-serif flex items-center justify-center min-h-screen animate-fade-in-up"
  style={{
    backgroundImage: `url(${signupbg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <form
    onSubmit={loginSubmitHandler}
    className="md:p-8 w-full max-w-md rounded-lg border-2 border-grey-500 shadow-lg mx-4 animate-fade-in-up"
    style={{
      backgroundColor: "rgba(255, 255, 255, 0.9)", // Optional transparency
    }}
  >
    <div className="mb-4">
      <h1 className="font-bold text-2xl text-grey-600">FoodMap.com</h1>
    </div>
    <div className="mb-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Full Name"
          name="fullname"
          onChange={changeEventHandler}
          className="pl-10 focus-visible:ring-2 focus-visible:ring-grey-500"
        />
        <User className="absolute inset-y-2 left-2 text-grey-500 pointer-events-none" />
        {errors && (
          <span className="text-xs text-red-500">{errors.fullname}</span>
        )}
      </div>
    </div>
    <div className="mb-4">
      <div className="relative">
        <Input
          type="email"
          placeholder="Email"
          name="email"
          onChange={changeEventHandler}
          className="pl-10 focus-visible:ring-2 focus-visible:ring-grey-500"
        />
        <Mail className="absolute inset-y-2 left-2 text-grey-500 pointer-events-none" />
        {errors && (
          <span className="text-xs text-red-500">{errors.email}</span>
        )}
      </div>
    </div>
    <div className="mb-4">
      <div className="relative">
        <Input
          type="password"
          placeholder="Password"
          name="password"
          onChange={changeEventHandler}
          className="pl-10 focus-visible:ring-2 focus-visible:ring-grey-500"
        />
        <LockKeyhole className="absolute inset-y-2 left-2 text-grey-500 pointer-events-none" />
        {errors && (
          <span className="text-xs text-red-500">{errors.password}</span>
        )}
      </div>
    </div>
    <div className="mb-4">
      <div className="relative">
        <Input
          type="text"
          placeholder="Contact"
          name="contact"
          onChange={changeEventHandler}
          className="pl-10 focus-visible:ring-2 focus-visible:ring-grey-500"
        />
        <PhoneOutgoing className="absolute inset-y-2 left-2 text-grey-500 pointer-events-none" />
        {errors && (
          <span className="text-xs text-red-500">{errors.contact}</span>
        )}
      </div>
    </div>
    <div className="mb-10">
      {loading ? (
        <Button disabled className="w-full bg-gray-700 hover:bg-gray-800">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-800"
        >
          Signup
        </Button>
      )}
    </div>
    <Separator />
    <p className="mt-2">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-600 hover:underline">
        Login
      </Link>
    </p>
  </form>
</div>

    );
};

export default Signup;