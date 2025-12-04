import React, { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sideImg from "../assets/SideImg.jpeg";
import "./buttonCss.css"
// Types
interface AuthRequest {
  requesterid: string;
  sessionid: string;
}

interface LoginPayload {
  auth: AuthRequest[];
  data: { username: string; password: string }[];
}

interface ApiResponse {
  auth: { msg: string; expire: string; code: string }[];
  data: { msg: string; data: string; code: string; token?: string }[];
}

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // toggle login/signup
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: LoginPayload = {
      auth: [{ requesterid: "123456", sessionid: "abcdef" }],
      data: [{ username, password }],
    };

    try {
      const res = await axios.post<ApiResponse>(
        "https://dummyjson.com/auth/login",
        payload
      );
      const token = res.data.data[0].token || "dummyToken";
      localStorage.setItem("authToken", token);
      alert("Login Successful!");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Invalid Details!");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // For dummy signup, just simulate API
    setTimeout(() => {
      alert("Signup Successful! Please login now.");
      setIsLogin(true); // back to login after signup
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex md:flex-row-reverse flex-col items-center justify-center bg-gray-100">
      {/* Form */}
      <div className="bg-white p-8 shadow-xl rounded-r-xl w-full max-w-md md:mr-4 z-10">
        <h1 className="text-3xl font-bold text-purple-600">
          {isLogin ? "Login" : "SignUp"}
        </h1>
        <h3 className="font-semibold text-gray-600 mt-2 mb-6">
          {isLogin
            ? "Welcome back! Please login to your account"
            : "Create your account below"}
        </h3>

        <form
          className="space-y-5"
          onSubmit={isLogin ? handleLogin : handleSignUp}
        >
          {/* Username */}
          <div>
            <label className="font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 focus:ring focus:ring-blue-300 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="font-semibold">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg mt-1 pr-12 focus:ring focus:ring-blue-300 outline-none"
                required
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className=" button" >
            {loading
              ? "Processing..."
              : isLogin
              ? "Login"
              : "SignUp"}
          </button>
        </form>

        {/* Toggle Login/Signup */}
        <h2 className="mt-4  text-gray-600">
          {isLogin ? (
            <>
              New user?{" "}
              <span
                className="text-purple-500 cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                SignUp
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-purple-500 cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Login
              </span>
            </>
          )}
        </h2>
      </div>

      {/* Side Image */}
      <div className="md:block hidden relative w-1/3 h-[63vh]">
        <img
          src={sideImg}
          alt="Side"
          className="object-cover w-full h-full rounded-l-xl shadow-xl"
        />
        <h1 className="absolute top-1/3 left-[18%] text-3xl font-bold text-white text-center">
          WELCOME BACK TO <br/> - ONEPORTAL
        </h1>
      </div>
    </div>
  );
};

export default Login;
