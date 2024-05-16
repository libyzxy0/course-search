import { Icon } from "@iconify/react";
import toast, { Toaster } from "react-hot-toast";
import loginmockup from "@/assets/4957412_Mobile-login.svg";
import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
const Signup = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("loc");
  const navigate = useNavigate();
  const { signup, error, user } = useAuth();
  const [show, setShow] = useState(false);
  const [showc, setShowC] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    const cred = { firstName, lastName, email, password };
    console.log("Value:", cred);
    try {
      if (password != confirmPassword) {
        return toast.error("Please confirm your password!");
      }
      setLoading(true);
      await signup(cred.firstName, cred.lastName, cred.email, cred.password);
      if (!error) {
        toast.success("Account created successfully!");
        setPassword("");
        setEmail("");
        setTimeout(() => {
          window.location.href = "/" + search;
        }, 3000);
      } else {
        toast.error("Failed to create account [2721]");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create account [4538]");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="mx-8 pt-16">
        <h1 className="text-gray-700 text-3xl font-bold">
          Sign Up | <b className="text-emerald-400">Course</b>search
        </h1>
      </header>
      <div className="h-screen w-full bg-white flex flex-col md:flex-row md:justify-between">
        <div className="pt-10 md:pt-10 flex flex-col w-full md:w-[50%]">
          <div className="flex flex-col mx-8">
            <label className="font-medium text-gray-700">First Name</label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="outline-none py-2 rounded-lg hover:border-emerald-400 mt-2 border-[1.5px] border-gray-200 px-4"
              type="email"
              placeholder="John"
            />
          </div>
          <div className="flex flex-col mx-8 mt-4">
            <label className="font-medium text-gray-700">Last Name</label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="outline-none py-2 rounded-lg hover:border-emerald-400 mt-2 border-[1.5px] border-gray-200 px-4"
              type="email"
              placeholder="Doe"
            />
          </div>
          <div className="flex flex-col mx-8 mt-4">
            <label className="font-medium text-gray-700">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none py-2 rounded-lg hover:border-emerald-400 mt-2 border-[1.5px] border-gray-200 px-4"
              type="email"
              placeholder="john.doe@example.com"
            />
          </div>

          <div className="flex flex-col mx-8 mt-4 relative">
            <label className="font-medium text-gray-700">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="outline-none py-2 rounded-lg hover:border-emerald-400 mt-2 border-[1.5px] border-gray-200 px-4"
              type={show ? "text" : "password"}
              placeholder="Mypassword@123"
            />
            {password && (
              <button
                onClick={() => setShow(!show)}
                className="absolute top-[2.6rem] right-[0.8rem] text-gray-700"
              >
                {show ? <Eye /> : <EyeOff />}
              </button>
            )}
          </div>
          <div className="flex flex-col mx-8 mt-4 relative">
            <label className="font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              className="outline-none py-2 rounded-lg hover:border-emerald-400 mt-2 border-[1.5px] border-gray-200 px-4"
              type={showc ? "text" : "password"}
              placeholder="Mypassword@123"
            />
            {confirmPassword && (
              <button
                onClick={() => setShowC(!showc)}
                className="absolute top-[2.6rem] right-[0.8rem] text-gray-700"
              >
                {showc ? <Eye /> : <EyeOff />}
              </button>
            )}
          </div>

          <div className="flex flex-col mx-8 mt-5">
            <button
              onClick={handleSignUp}
              className="w-full border-none rounded-lg bg-emerald-400 py-2.5 text-white font-medium flex justify-center"
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <p>Create Account</p>
              )}
            </button>
          </div>
          <h1 className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              className="text-emerald-400 hover:underline"
              to="/login?loc=signup"
            >
              Sign In
            </Link>
          </h1>
        </div>

        <div className="pt-0 hidden md:inline-block md:w-[50%]">
          <img className="" src={loginmockup} alt="Mockup image from freepik" />
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Signup;
