import { Icon } from "@iconify/react";
import toast, { Toaster } from "react-hot-toast";
import loginmockup from "@/assets/4957412_Mobile-login.svg";
import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const { googleSignIn, login, user, error } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("loc")
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const u = await login(email, password);
      if (!error) {
        toast.success("Successfully logged in as " + u.providerUid);
        setPassword("");
        setEmail("");
        setTimeout(() => {
          window.location.href = search;
        }, 1000)
      } else {
        toast.error("Login failed check your credentials [2771]");
      }
    } catch (error) {
      toast.error("Error something went wrong [2838]");
    }
    setLoading(false);
  };

  const handleSignInWithGoogle = async () => {
    await googleSignIn();
  };

  return (
    <>
      <header className="mx-8 pt-20">
        <h1 className="text-gray-700 text-3xl font-bold">
          Sign In | <b className="text-emerald-400">Course</b>search</h1>
      </header>
      <div className="h-screen w-full bg-white flex flex-col md:flex-row md:justify-between">
        <div className="pt-16 md:pt-24 flex flex-col w-full md:w-[50%]">
          <div className="flex flex-col mx-8">
            <label className="font-medium text-gray-700">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none py-2 rounded-lg hover:border-emerald-400 mt-2 border-[1.5px] border-gray-200 px-4"
              type="email"
              placeholder="john.doe@example.com"
            />
          </div>
          <div className="flex flex-col mx-8 mt-5 relative">
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

          <div className="flex flex-col mx-8 mt-5">
            <button
              onClick={handleSignIn}
              className="w-full border-none rounded-lg bg-emerald-400 py-2.5 text-white font-medium flex justify-center"
            >
              {loading ? <Loader className="animate-spin" /> : <p>Sign In</p>}
            </button>
          </div>
          <h1 className="text-center mt-6 text-gray-600">
            Don't have an account?{" "}
            <Link className="text-emerald-400 hover:underline" to={`/signup?loc=${search}`}>
              Sign up
            </Link>
          </h1>

          <h1 className="text-center my-4">OR</h1>

          <div className="flex flex-col mx-8 mt-">
            <button
              onClick={handleSignInWithGoogle}
              className="flex flex-row justify-center items-center w-full border-none rounded-lg bg-white py-2.5 text-gray-700 font-medium shadow hover:opacity-80"
            >
              <Icon className="mx-2 text-2xl" icon="flat-color-icons:google" />
              Sign In with Google
            </button>
          </div>
        </div>

        <div className="pt-0 hidden md:inline-block md:w-[50%]">
          <img className="" src={loginmockup} alt="Mockup image from freepik" />
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Login;
